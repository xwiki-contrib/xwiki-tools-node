var props = require("../properties/all.js");
var BaseObj = require("../BaseObj.js");
var obj = BaseObj.create("XWiki.WikiMacroParameterClass");

obj.addProp("name", props.XString.create({
  "prettyName": "Parameter name",
  "size": "30"
}));
obj.addProp("description", props.TextArea.create({
  "prettyName": "Parameter description",
  "rows": "5",
  "size": "40"
}));
obj.addProp("mandatory", props.XBoolean.create({
  "prettyName": "Parameter mandatory"
}));
obj.addProp("defaultValue", props.XString.create({
  "prettyName": "Parameter default value",
  "size": "30"
}));

module.exports.create = function () {
    return obj.instance();
};
