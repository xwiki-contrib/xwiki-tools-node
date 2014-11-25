var XWikiDoc = require('../model/XWikiDoc');
var ClassParser = require('./ClassParser');

var capitalFirst = function (name) {
    return name[0].toUpperCase() + name.substring(1);
};

var parse = module.exports.parse = function(obj, docSpace, docName, fsTree, undefined) {

    fsTree.classes = fsTree.classes || {};
    fsTree.classes[obj.className + '.js'] = ClassParser.parse(obj['class']);

    fsTree.xwiki[docSpace] = fsTree.xwiki[docSpace] || {};
    fsTree.xwiki[docSpace][docName] = fsTree.xwiki[docSpace][docName] || {};
    var docDir = fsTree.xwiki[docSpace][docName];

    var objsDir = docDir.objects = docDir.objects || {};
    var objDir = objsDir[obj.className + '_' + obj.number] = {};

    var thisJs = [];
    thisJs.push('XWikiObj(function (obj) {');

    var prop = obj['property'];
    var i = 2;
    while (prop || (prop = obj['property ' + (i++)])) {
        var name = Object.keys(prop)[0];
        thisJs.push('    obj.set' + capitalFirst(name) + '(' + JSON.stringify(prop[name]) + ');');
        prop = null;
    }
    thisJs.push('});\n');

    objDir['this.js'] = thisJs.join('\n');
};
