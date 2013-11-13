define(['fs', 'path', 'node.extend'], function(fs, Path, Extend) { return function(name) {
    if (!name || !Array.isArray(name)) {
        throw new Error("name must be specified as an array such as ['Main','WebHome']");
    }
    this.json = {
        "xwikidoc": {
            "web": name[name.length-2],
            "name": name[name.length-1],
            "language": "",
            "defaultLanguage": "",
            "translation": "0",
            "parent": "xwiki:XWiki.WebHome",
            "creator": "xwiki:XWiki.Admin",
            "author": "xwiki:XWiki.Admin",
            "customClass": "",
            "contentAuthor": "xwiki:XWiki.Admin",
            "creationDate": "1357694025000",
            "date": "1357696926000",
            "contentUpdateDate": "1357696926000",
            "version": "1.1",
            "title": "",
            "template": "",
            "defaultTemplate": "",
            "validationScript": "",
            "comment": "",
            "minorEdit": "false",
            "syntaxId": "xwiki/2.1",
            "hidden": "false",
            "content": ""
        }
    };

    // file paths to attachments.
    var attachments = [];

    // Make setters and getters
    var doc;
    var init = function (that) {
        doc = that.json.xwikidoc;
        for (var key in doc) {
            (function () {
                var k = key;
                var upperFirst = k[0].toUpperCase()+k.substring(1);
                that['set'+upperFirst] = function(val) { doc[k] = val; };
                that['get'+upperFirst] = function(val) { return doc[k]; };
            }());
        }
    };
    init(this);

    this.setClass = function(cl) {
        doc['class'] = cl;
    };
    this.getClass = function() {
        return doc['class'];
    };

    this.fromJSON = function(from) {
        var js = Extend({}, from);
        from.xwikidoc.web = this.getWeb();
        from.xwikidoc.name = this.getName();
        this.json = from;
        init(this);
    };

    var addTag = function (tag, val) {
        var j = 1;
        for (;doc[tag]; j++) { tag = tag.split(' ')[0] + " " + j; }
        doc[tag] = val;
        return j;
    };

    var getTags = function (tag) {
        var out = [];
        var j = 1;
        for (;doc[tag]; j++) { out.push(doc[tag]); tag = tag.split(' ')[0] + " " + j; }
        return out;
    };

    this.addAttachment = function(filePath, options) {
        filePath = Path.resolve(filePath);
        var stat = fs.statSync(filePath);
        if (!stat.isFile()) { throw new Error(filePath + ' is not a file'); }
        var writeContent = function(writer, callback) {
            var readStream = fs.createReadStream(filePath);
            var partial;
            readStream.on('data', function(data) {
                if (partial) {
                    data = Buffer.concat([partial, data]);
                    partial = undefined;
                }
                for (var i = 0;;i+=63) {
                    if (i+63 > data.length) {
                        partial = data.slice(i);
                        return;
                    }
                    var str = data.toString('base64', i, i+63);
                    writer.write(str);
                    writer.write("\n");
                }
            });
            readStream.on('end', function() {
                for (var i = 0; partial; i+=63) {
                    var str = partial.toString('base64', i, i+63);
                    if (!str) { break; }
                    writer.write(str);
                    writer.write("\n");
                }
                callback();
            });
        };
        attachments.push(filePath);
        addTag('attachment', {
            filename: filePath.split('/').pop(),
            filesize: stat.size,
            author:  (options && options.author) || "XWiki.Admin",
            date:    (options && options.date) || "1364415417000",
            version: (options && options.version) || "1.1",
            comment: (options && options.comment) || "",
            content: writeContent
        });
    };

    this.getAttachments = function() {
        var out = []
        out.push.apply(out, attachments);
        return out;
    };

    this.removeAttachment = function (name) {
        for (var i = 0; i < attachments.length; i++) {
            if (name === attachments[i] || name === attachments[i].split('/').pop()) {
                delete doc[ "attachment" + ((i > 0) ? " "+i : "") ];
                return true;
            }
        }
        return false;
    };

    this.addXObject = function(object) {
        object.json.number = addTag('object', object.json);
        object.json.name = doc.web + '.' + doc.name;
    };
}});
