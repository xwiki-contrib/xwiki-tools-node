var XWikiDoc = require('../model/XWikiDoc');
var ClassParser = require('./ClassParser');
var ObjParser = require('./ObjParser');
var AttachParser = require('./AttachParser');

var capitalFirst = function (name) {
    return name[0].toUpperCase() + name.substring(1);
};

var parse = module.exports.parse = function(json, undefined) {
    var xwikidoc;
    for (var nm in json) {
        if (/^xwikidoc/.test(nm)) { xwikidoc = json[nm]; }
    }
    var out = {
        xwiki: {}
    };
    if ('class' in xwikidoc) {
        out.classes = {};
        out.classes[xwikidoc.web + '.' + xwikidoc.name + '.js'] =
            ClassParser.parse(xwikidoc['class']);
    }
    out.xwiki[xwikidoc.web] = {};
    var docDir = out.xwiki[xwikidoc.web][xwikidoc.name] = {};

    for (var objName in xwikidoc) {
        if (! /^object/.test(objName)) { continue; }
        ObjParser.parse(xwikidoc[objName], xwikidoc.web, xwikidoc.name, out);
    }    

    for (var attachName in xwikidoc) {
        if (! /^attach/.test(attachName)) { continue; }
        AttachParser.parse(xwikidoc[attachName], xwikidoc.web, xwikidoc.name, out);
    }   

    var defaultDoc = XWikiDoc.create(['x','x']);
    var thisJs = [];
    thisJs.push('XWikiDoc(function (doc) {');
    [
        'language',
        'defaultLanguage',
        'translation',
        'parent',
        'creator',
        'author',
        'customClass',
        'contentAuthor',
        'creationDate',
        'date',
        'contentUpdateDate',
        'version',
        'title',
        'defaultTemplate',
        'validationScript',
        'comment',
        'minorEdit',
        'syntaxId',
        'hidden'
    ].forEach(function (elem) {
        var capName = capitalFirst(elem);
        var defaultVal = defaultDoc['get' + capName]();
        if (xwikidoc[elem] !== defaultVal) {
            // JSON.stringify() skape those quotes
            thisJs.push('    doc.set' + capName + '(' + JSON.stringify(xwikidoc[elem]) + ');');
        }
    });
    thisJs.push('});\n');

    docDir['this.js'] = thisJs.join('\n');

    if ('content' in xwikidoc && xwikidoc.content !== '') {
        var syntax = xwikidoc.syntaxId.replace(/[^a-zA-Z0-9]/g, '');
        docDir['content.' + syntax] = xwikidoc.content;
    }

    return out;
};
