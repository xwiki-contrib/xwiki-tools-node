define([
  'archiver',
  'buffered-writer',
  'xmhell',
  './Pom',
  './Tools',
  'fs',
  'mkdirp',
  'temp',
  'form-data',
  'querystring'
], function(
  Archiver,
  BufferedWriter,
  XMHell,
  Pom,
  Tools,
  Fs,
  Mkdirp,
  Temp,
  FormData,
  QueryString
) { return function(callback) {

    var json = this.json = {
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
        })(this);
    }

    var workers = 1;
    var start = function() { workers++; }
    var stop = function(callback) {
        if (!workers) { return; }
        if (!--workers) {
            if (docs.length) { throw new Error("docs.length == " + docs.length); }
            if (!zip) { throw new Error("Job already completed"); }
            console.log('done');
            zip.finalize(callback);
            done = true;
        }
    };

    this.addDocument = function(xwikiDoc) {
        var tag = 'file language="" defaultAction="0"';
        for (var j = 2; pack.files[tag]; j++) { tag = tag.replace(/ [0-9]*$/, '') + " " + j; }
        pack.files[tag] = xwikiDoc.getWeb() + "." + xwikiDoc.getName();
        docs.push(xwikiDoc);
    };

    this.genMvn = function (dirName) {
        var resources = dirName + "/src/main/resources/";
        var documentLoop = function(pom) {
            var doc = docs.pop();
            if (!doc) { return false; }
            if (done) { throw new Error(); }
            var dir = resources + doc.getWeb();
            var name = dir + "/" + doc.getName() + '.xml';
            console.log(name + " Generating");
            doc.getAttachments().forEach(function(att) {
                doc.removeAttachment(att);
                pom.addAttachment(doc, att);
                var attDest = resources + "/attachments/" + att;
                Mkdirp(attDest.replace(/\/[^\/]*$/, ''), function (err) {
                    Fs.createReadStream(att).pipe(Fs.createWriteStream(attDest));
                });
            });
            Mkdirp(dir, function (err) {
                if (err) { throw err; }
                var stream = BufferedWriter.open(name);
                XMHell.write(doc.json, stream, function() {
                    stream.close();
                    stop();
                });
            });
            start();
            return true;
        };

        var pom = new Pom();
        pom.setName(this.getName());
        pom.setDescription(this.getDescription());
        var id = this.getExtensionId().split(':');
        pom.setGroupId(id[0]);
        pom.setArtifactId(id[1]);

        while (documentLoop(pom));
        Mkdirp(resources, function (err) {
            var stream = BufferedWriter.open(dirName + "/pom.xml");
            XMHell.write(pom.json, stream, function() {
                stream.close();
                stop();
            });
        });
        start();
    };

    var genXarWithWorkspace = function(fileName, workSpace, callback) {
        docs.unshift({json:json});
        zip = new Archiver.createZip({ level: 1 });
        zip.pipe(Fs.createWriteStream(fileName));
        workers--;
        while((function() {
            if (!zip) { return; }
            var doc = docs.pop();
            if (!doc) { return false; }
            if (done) { throw new Error(); }
            var json = doc.json;
            var name = "package.xml";
            if (typeof(doc.getWeb) !== "undefined") {
                name = doc.getWeb() + "/" + doc.getName() + '.xml';
            }
            var tempName = workSpace + '/' + name;
            Mkdirp.sync(tempName.replace(/\/[^\/]*$/, ''));
            var stream = BufferedWriter.open(tempName);
            console.log(tempName + " Generating");
            XMHell.write(doc.json, stream, function() {
                stream.close();
                console.log(name + " Compressing");
                zip.addFile(Fs.createReadStream(tempName), { name: name }, function() {
                    console.log(name + " Complete");
                    stop(callback);
                });
            });
            start();
            return true;
        })());
    };

    this.genXar = function(fileName, callback) {
        Temp.mkdir('xwiki-tools-genxar', function(err, dirPath) {
            if (err) { throw err; }
            genXarWithWorkspace(fileName, dirPath, callback);
        });
    };

    // Post to a wiki?
    // must post to a /preview/ page, for example:
    // syntax  ./do --post Admin:admin@192.168.1.1:8080/xwiki/bin/preview//
    this.postToWiki = function(postCmd) {

      var script = [
        "{{groovy}}",
        "f = xcontext.getContext().getForm().getMultipartRequestHandler().getFileElements().get('fileupload');",
        "pack = xwiki.package;",
        "pack.Import(f.getInputStream());",
        "for (Object d : pack.getFiles()) { println('Installed ' + d.getFullName()); }",
        "pack.install();",
        "println('done');",
        "{{/groovy}}"
      ].join('\n');

      var userPass = postCmd.split('@')[0];
      var url = postCmd.split('@')[1];
      var host = url.replace(/:[^:]*$/, '');
      var port = url.replace(host+':', '').split('/')[0] || '80';
      var path = url.replace(url.split('/')[0], '');
      host = host.replace(/[\[\]]/g, '');

      Temp.mkdir('xwiki-tools-genxar', function(err, dirPath) {
        if (err) { throw err; }
        var fileName = dirPath + '/output.xar';
        genXarWithWorkspace(fileName, dirPath, function() {
          console.log('Posting to [' + host + "]:" + port + path);
          var form = new FormData();
          form.append('fileupload', Fs.createReadStream(fileName));
          form.submit({
            host: host,
            port: port,
            path: path + '?' + QueryString.stringify({content:script, xpage:'plain'}),
            auth: userPass
          }, function(err, res) {
            if (err) { throw err; }
            res.on('data', function(dat) { console.log(dat.toString('utf8').replace(/<[^>]*>/g, '\n')); });
            //console.log(res);
          });
        });
      });
    };
}});
