define(function() {
    var unescapeXML = this.unescape = function (s) {
        var xmlChars = {
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&quot;': '"',
            '&apos;': "'"
        };
        return s.replace(/&[^;]*;/g, function (ch) {
	        return xmlChars[ch];
        });
    };

    /** Escape a string for use in XML */
    var escapeXML = this.escape = function (s) {
        var xmlChars = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&apos;'
        };
        return s.replace(/[<>&"']/g, function (ch) {
	        return xmlChars[ch];
        });
    };

    /** Read XML from XWiki document exports, this only reads a narrow subset of XML. */
    this.read = function(data) {
        var i = data.indexOf('<')+1, isXML;
        var p = function(cont) {
            for (; i > 0; i = data.indexOf('<', i)+1) {
                switch (data[i]) {
                    case '?':
                        isXML = true;
                        break;

                    case '/':
                        var x = data.indexOf('>', i);
                        return cont || unescapeXML(data.substring(data.lastIndexOf('>',i) + 1, i-1));

                    default:
                        if (!isXML) { throw new Error("this doesn't look like XML: [" + data.substring(0,100) + "]"); }
                        var z = data.indexOf('<', i);
                        var tag = data.substring(i, data.indexOf('>', i));
                        i = z+1;
                        cont = cont || {};
                        for (var j = 2; cont[tag]; j++) { tag = tag.split(' ')[0] + " " + j; }
                        cont[tag] = p();
                }
            }
            return cont;
        };
        return p();
    };

    var EscapingWriter = function (writer) {
        this.write = function(content) {
            writer.write(escapeXML(content));
        };
    };

    /**
     * Write out XWiki XML.
     * @param obj an XWiki JSON representation.
     * @param w an object with a 'write' function.
     * @param andThen callback when it's done.
     * @param count number of tabs of indentation to start with (optional).
     */
    var writeXML = this.write = function (obj, w, andThen, count) {
        if (count == undefined) {
            count = 0;
            w.write('<?xml version="1.0" encoding="UTF-8"?>');
        }

        switch (typeof(obj)) {
            case 'string': w.write(obj); andThen(); return;
            case 'undefined': andThen(); return;
            case 'function': obj(new EscapingWriter(w), andThen); return;
            case 'object': break;
            case 'number':
            case 'boolean': w.write(String(obj)); andThen(); return;
            default: w.write(typeof(obj)); andThen(); return;
        }

        var appendSpace = function() {
            for (var i = 0; i < count; i++) { w.write('  '); }
        };

        if (Object.keys(obj).length === 0) { andThen(); return; }
        w.write('\n');
        var keyVal = [];
        for (var key in obj) {
            if (Array.isArray(obj[key])) {
                var elems = obj[key];
                for (var i = 0; i < elems.length; i++) {
                    keyVal.push(key, elems[i]);
                }
            } else {
                keyVal.push(key, obj[key]);
            }
        }

        var addTag = function (callback) {
            var key = keyVal.shift();
            if (!key) { callback(); return; }
            appendSpace();

            // strip a trailing " 2" but leave '<tag key="val">
            // the trailing " 2" is used for multiple tags with
            // the same name.
            key = key.replace(/ [0-9]*$/, '');
            if (key === "__COMMENT__") {
                w.write('<!--');
                w.write(String(keyVal.shift()));
                w.write('-->\n');
                addTag(callback);
                return;
            }

            w.write('<' + key + '>');
            writeXML(keyVal.shift(), w, function() {
                // strip anything following the tag name.
                w.write('</' + key.replace(/ .*/, '') + '>\n');
                addTag(callback);
            }, count+1);
        };
        addTag(function() {
            count--;
            appendSpace();
            andThen();
        });
    };

    return this;
});
