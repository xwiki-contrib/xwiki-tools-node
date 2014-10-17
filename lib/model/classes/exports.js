// We do not yet have an XWiki object since we are in the code which sets it up.
// calling require('../xwiki.js') would create an intinite loop.
var BaseObj = require("../BaseObj");

var CLASSES = [
    'JavaScriptExtension',
    'StyleSheetExtension',
    'WikiMacroClass',
    'WikiMacroParameterClass'
];

var fakeXWiki = { model: { properties: require('../properties/exports') }};

CLASSES.forEach(function (cl) {
    var fun;
    // Never ever do this :(
    global.XClass = function (f) { fun = f; };
    require('./'+cl);
    delete global.XClass;

    var obj = BaseObj.create('XWiki.' + cl);    
    fun(obj, fakeXWiki);
    module.exports[cl] = {
        create: function () {
            return obj.instance();
        }
    };
});
