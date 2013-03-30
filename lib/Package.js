define([
    'archiver',
    'buffered-writer',
    './XML',
    'fs'
], function(
    Archiver,
    BufferedWriter,
    XMLWriter,
    Fs
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

    var flush = this.flush = function() {
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

    this.addDocument = function(xwikiDoc) {
        var tag = 'file language="" defaultAction="0"';
        for (var j = 2; pack.files[tag]; j++) { tag = tag.split(' ')[0] + " " + j; }
        pack.files[tag] = xwikiDoc.getWeb() + "." + xwikiDoc.getName();

        docs.push(xwikiDoc);
        flush();
    };

    this.beginZip = function(fileName) {
        zip = new Archiver.createZip({ level: 1 });
        zip.pipe(Fs.createWriteStream(fileName));
    };

    this.finalize = function() {
        docs.push(this);
        workers--;
        flush();
    };
}});
