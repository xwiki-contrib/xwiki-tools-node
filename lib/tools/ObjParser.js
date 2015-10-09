var XWikiDoc = require('../model/XWikiDoc');
var ClassParser = require('./ClassParser');

var capitalFirst = function (name) {
    return name[0].toUpperCase() + name.substring(1);
};

var classContainsProp = function (cls, name) {
    if (typeof(cls[name]) === 'object' && cls[name].name === name) {
        return true;
    } else if (typeof(cls[name + ' 2']) === 'object' && cls[name + ' 2'].name === name) {
        return true;
    }
    return false;
};

var parse = module.exports.parse = function(obj, docSpace, docName, fsTree, undefined) {

    fsTree.classes = fsTree.classes || {};
    var objClass = fsTree.classes[obj.className + '.js'] = ClassParser.parse(obj['class']);

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
        if (!classContainsProp(obj['class'], name)) {
          thisJs.push('    obj.addDeprecatedProperty(' + JSON.stringify(name) + ', ' +
              JSON.stringify(prop[name]) + ');');
        } else if (/.*[^a-zA-Z0-9_].*/.test(name)) {
            thisJs.push('    obj[' + JSON.stringify("set" + capitalFirst(name)) + '](' +
                JSON.stringify(prop[name]) + ');');
        } else {
            thisJs.push('    obj.set' + capitalFirst(name) + '(' +
                JSON.stringify(prop[name]) + ');');
        }
        prop = null;
    }
    thisJs.push('});\n');

    objDir['this.js'] = thisJs.join('\n');
};
