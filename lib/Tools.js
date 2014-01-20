var QueryString = require('querystring');
var Http = require('http');
var Fs = require('fs');
var Path = require('path');
var XMHell = require('xmhell');

/** For use with json structures, XML serializer will call the returned function. */
var contentFromFile = module.exports.contentFromFile = function (filePath) {
    filePath = Path.resolve(filePath);
    var stat = Fs.statSync(filePath);
    if (!stat.isFile()) { throw new Error(filePath + ' is not a file'); }
    return function (writer, callback) {
        var stream = Fs.createReadStream(filePath);
        stream.on('data', function(data) { writer.write( String(data) ); });
        stream.on('end', function() { callback(); });
    };
};

var postDocToWiki = module.exports.postDocToWiki = function(userPass, url, doc, callback) {

    var script = [
        "{{groovy}}",
        "import com.xpn.xwiki.doc.XWikiDocument;",

        "if (request.getMethod() == 'POST' && request.get('doc') != null) {",
            "xdoc = new XWikiDocument();",
            "xdoc.fromXML(request.get('doc'));",
            "xc = xcontext.getContext();",
            "xc.getWiki().saveDocument(xdoc, '', false, xc);",
        "}",

        "os=response.getOutputStream();",
        "os.println('works');",
        "os.close();",
        "xcontext.setFinished(true);",

        "{{/groovy}}"
    ].join('\n');

    //var userPass = 'Admin:admin'
    //var url = 'http://192.168.0.6:8080/xwiki/bin/preview/Main/WebHome';

    url = url.replace('http://', '');

    var options = {
        host: url.split(':')[0].split(':')[0],
        port: (url.split(':')[1] || '80').split('/')[0],
        path: url.replace(url.split('/')[0], ''),
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': 0,
            'Authorization': 'Basic ' + new Buffer(userPass).toString('base64')
        }
    };

    var docXML = '';
    var w = { write: function(data) { docXML += data } };
    XMHell.write(doc.json, w, function() {

        var data = QueryString.stringify({
            action_preview:'Preview',
            syntaxId:'xwiki/2.1',
            comment: '',
            xeditaction: 'edit',
            content: script,
            language: 'en',
            parent: '',
            title: '',
            'x-maximized': '',
            doc: docXML
        });

        options.headers['Content-Length'] = data.length;

        var post = Http.request(options, function(res) {
            //console.log(res.statusCode);
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log(chunk);
            });
            res.on('end', function () {
                callback();
            });
        });

        post.write(data);
        post.end();
    });
};


var addAccessors = module.exports.addAccessors = function(json, obj) {
    for (var key in json) {
        (function() {
            var k = key;
            var upperFirst = k[0].toUpperCase()+k.substring(1);
            obj['set'+upperFirst] = function(val) { json[k] = val; return obj; };
            obj['get'+upperFirst] = function(val) { return json[k]; };
        })();
    }
};
