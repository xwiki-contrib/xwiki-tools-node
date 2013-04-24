define([
    'archiver',
    'buffered-writer',
    './XML',
    './Pom',
    'fs',
    'mkdirp'
], function(
    Archiver,
    BufferedWriter,
    XMLWriter,
    Pom,
    Fs,
    Mkdirp
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
    var stop = function() {
        if (!--workers && !docs.length && zip) {
            console.log('done');
            zip.finalize(callback);
            done = true;
        }
    };

    this.addDocument = function(xwikiDoc) {
        var tag = 'file language="" defaultAction="0"';
        for (var j = 2; pack.files[tag]; j++) { tag = tag.split(' ')[0] + " " + j; }
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
                XMLWriter.write(doc.json, stream, function() {
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
            XMLWriter.write(pom.json, stream, function() {
                stream.close();
                stop();
            });
        });
        start();
    };

    this.genXar = function(fileName) {
        zip = new Archiver.createZip({ level: 1 });
        zip.pipe(Fs.createWriteStream(fileName));
        docs.push(this);
        workers--;
        while((function() {
            if (!zip) { return; }
            var doc = docs.pop();
            if (!doc) { return false; }
            if (done) { throw new Error(); }
            var json = doc.json;
            var tempName = ("" + Math.random()).replace('.', '') + ".temp.xml";
            var name = "package.xml";
            if (typeof(doc.getWeb) !== "undefined") {
                tempName = doc.getWeb() + "_" + doc.getName() + "_" + tempName;
                name = doc.getWeb() + "/" + doc.getName() + '.xml';
            }
            var stream = BufferedWriter.open(tempName);
            console.log(name + " Generating");
            XMLWriter.write(doc.json, stream, function() {
                stream.close();
                console.log(name + " Compressing");
                zip.addFile(Fs.createReadStream(tempName), { name: name }, function() {
                    console.log(name + " Complete");
                    Fs.unlink(tempName);
                    stop();
                });
            });
            start();
            return true;
        })());
    };

    // Post to a wiki?
    // must post to a /preview/ page, for example:
    // syntax  ./do --post Admin:admin@192.168.1.1:8080/xwiki/bin/preview//
    this.postToWiki = function(postCmd) {
        var userUrl = postCmd.split('@').reverse();
        while((function() {
            var doc = docs.pop();
            if (!doc) { return false; }
            console.log(name + " Posting");
            XWiki.Tools.postDocToWiki(userUrl[1], userUrl[0], doc, function() {
                console.log(name + " Complete");
                stop();
            });
            start();
        })());
    };
}});
