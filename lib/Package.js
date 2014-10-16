var Pom = require('./Pom');
var DirTree = require('./DirTree');

var Archiver = require('archiver');
var BufferedWriter = require('buffered-writer');
var XMHell = require('xmhell');
var Fs = require('fs');
var Mkdirp = require('mkdirp');
var Temp = require('temp');
var Http = require('http');
var nThen = require('nthen');

var create = module.exports.create = function() {

  var self = {};
  var json = self.json = {
      "package": {
          "infos":{
              "name": function() { throw new Error("name missing") },
              "description": function() { throw new Error("description missing") },
              "licence": "",
              "author": "XWiki.Admin",
              "extensionId": function() { throw new Error("extensionId missing") },
              "version": "1.0",
              "backupPack": "true"
          },
          "files": { }
      }
  };
  var pack = json["package"];
  var info = pack.infos;
  var docs = [];
  var zip;
  var done = false;

  // setters and getters.
  for (var key in info) {
      (function(that) {
          var k = key;
          var upperFirst = k[0].toUpperCase()+k.substring(1);
          that['set'+upperFirst] = function(val) { info[k] = val; };
          that['get'+upperFirst] = function(val) { return info[k]; };
      })(self);
  }

  self.addDocument = function(xwikiDoc) {
      var tag = 'file language="" defaultAction="0"';
      for (var j = 2; pack.files[tag]; j++) { tag = tag.replace(/ [0-9]*$/, '') + " " + j; }
      pack.files[tag] = xwikiDoc.getWeb() + "." + xwikiDoc.getName();
      docs.push(xwikiDoc);
  };

  self.genMvn = function (dirName) {
      var resources = dirName + "/src/main/resources/";
      var nt = nThen;
      docs.forEach(function (doc) {
          var dir = resources + doc.getWeb();
          var name = dir + "/" + doc.getName() + '.xml';
          console.log(name + " Generating");
          nt = nt(function (waitFor) {
              Mkdirp(dir, waitFor(function (err) {
                  if (err) { throw err; }
              }));
          }).nThen(function (waitFor) {
              var stream = BufferedWriter.open(name);
              XMHell.write(doc.json, stream, waitFor(function() {
                  stream.close(waitFor());
              }));
          }).nThen;
      });
      var pomExists = false;
      nt(function (waitFor) {
          Fs.exists(dirName + '/pom.xml', waitFor(function (exists) {
              pomExists = exists;
          }));
      }).nThen(function (waitFor) {
          if (pomExists) { return; }

          var pom = Pom.create();
          pom.setName(self.getName());
          pom.setDescription(self.getDescription());
          var id = self.getExtensionId().split(':');
          pom.setGroupId(id[0]);
          pom.setArtifactId(id[1]);

          var stream = BufferedWriter.open(dirName + "/pom.xml");
          XMHell.write(pom.json, stream, waitFor(function() {
              stream.close(waitFor());
          }));
      }).nThen(function (waitFor) {
          console.log('done!');
      });
  };

  var genXarWithWorkspace = function(fileName, workSpace, callback) {
      docs.unshift({json:json});
      zip = new Archiver.createZip({ level: 1 });
      var writeStream = Fs.createWriteStream(fileName);
      zip.pipe(writeStream);

      var nt = nThen;
      docs.forEach(function (doc) {
          var json = doc.json;
          var name = "package.xml";
          if (typeof(doc.getWeb) !== "undefined") {
              name = doc.getWeb() + "/" + doc.getName() + '.xml';
          }
          var tempName = workSpace + '/' + name;
          var stream;
          nt = nt(function (waitFor) {
              Mkdirp(tempName.replace(/\/[^\/]*$/, ''), waitFor(function (err) {
                  if (err) { throw err; }
              }));
          }).nThen(function (waitFor) {
              stream = BufferedWriter.open(tempName);
              console.log(tempName + " Generating");
              XMHell.write(doc.json, stream, waitFor(function() {
                  stream.close(waitFor());
              }));
          }).nThen(function (waitFor) {
              console.log(name + " Compressing");
              zip.addFile(Fs.createReadStream(tempName), { name: name }, waitFor(function() {
                  console.log(name + " Complete");
              }));
          }).nThen;
      });
      nt(function (waitFor) {
          writeStream.on('finish', waitFor());
          zip.finalize(waitFor());
      }).nThen(callback);
  };

  self.setXarName = function (name) {
      self.xarName = name;
  };

  self.getXarName = function () {
      return self.xarName;
  };

  self.genXar = function(fileName, callback) {
      if (typeof(fileName) === 'undefined') { fileName = self.getXarName(); }
      if (typeof(fileName) === 'undefined') {
          throw new Error("package XAR name unspecified, see package.setXarName()");
      }
      var dirPath;
      nThen(function (waitFor) {
          Temp.mkdir('xwiki-tools-genxar', waitFor(function(err, dp) {
              if (err) { throw err; }
              dirPath = dp;
          }));
      }).nThen(function (waitFor) {
          genXarWithWorkspace(fileName, dirPath, callback);
      });
  };

  // Post to a wiki?
  // must post to a /preview/ page, for example:
  // syntax  ./do --post Admin:admin@192.168.1.1:8080/xwiki
  self.postToWiki = function(postCmd) {

    var userPass = postCmd.split('@')[0];
    var url = postCmd.split('@')[1];
    var host = url.replace(/:[^:]*$/, '');
    var port = url.replace(host+':', '').split('/')[0] || '80';
    var path = url.replace(url.split('/')[0], '');
    host = host.replace(/[\[\]]/g, '');

    if (path.indexOf('/rest/wikis/') === -1) { path = path + '/rest/wikis/xwiki'; }
    path = path + '?backup=true&history=RESET';

    Temp.mkdir('xwiki-tools-genxar', function(err, dirPath) {
      if (err) { throw err; }
      var fileName = self.getXarName();
      genXarWithWorkspace(fileName, dirPath, function() {
        console.log('Posting to [' + host + "]:" + port + path);
        var req = Http.request({
          hostname: host,
          port: port,
          path: path,
          auth: userPass,
          method: 'POST'
        }, function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
          });
        });
        req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });
        Fs.createReadStream(fileName).pipe(req);
      });
    });
  };

  return self;
};

var fromDirTree = module.exports.fromDirTree = function (wikiDir, callback) {
    var pkg = create();
    DirTree.mkPackage(wikiDir, pkg, function () {
        callback(pkg);
    });
};
