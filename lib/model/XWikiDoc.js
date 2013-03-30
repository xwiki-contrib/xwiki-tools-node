define(['fs'], function(fs) { return function(name) {
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

    // Make setters and getters
    var doc = this.json.xwikidoc;
    for (var key in doc) {
        (function(that) {
            var k = key;
            var upperFirst = k[0].toUpperCase()+k.substring(1);
            that['set'+upperFirst] = function(val) { doc[k] = val; };
            that['get'+upperFirst] = function(val) { return doc[k]; };
        })(this);
    }

    var addTag = function (tag, val) {
        var j = 1;
        for (;doc[tag]; j++) { tag = tag.split(' ')[0] + " " + j+1; }
        doc[tag] = val;
        return j;
    };

    this.addAttachment = function(filePath, options) {
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

    this.addXObject = function(object) {
        object.json.number = addTag('object', object.json);
        object.json.name = doc.web + '.' + doc.name;
    };
}});
