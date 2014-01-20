var props = require("../properties/all.js");
var BaseObj = require("../BaseObj");
var obj = BaseObj.create("XWiki.WikiMacroClass");

obj.addProp("id", props.XString.create({
  "prettyName": "Macro id",
  "size": "30"
}));
obj.addProp("name", props.XString.create({
  "prettyName": "Macro name",
  "size": "30"
}));
obj.addProp("description", props.TextArea.create({
  "prettyName": "Macro description",
  "rows": "5",
  "size": "40"
}));
obj.addProp("defaultCategory", props.XString.create({
  "prettyName": "Default category",
  "size": "30"
}));
obj.addProp("supportsInlineMode", props.XBoolean.create({
  "prettyName": "Supports inline mode"
}));
obj.addProp("visibility", props.StaticList.create({
  "prettyName": "Macro visibility",
  "separator": "|",
  "separators": "|",
  "values": "Current User|Current Wiki|Global"
}));
obj.addProp("contentType", props.StaticList.create({
  "prettyName": "Macro content type",
  "separator": "|",
  "separators": "|",
  "values": "Optional|Mandatory|No content"
}));
obj.addProp("contentDescription", props.TextArea.create({
  "prettyName": "Content description (Not applicable for \"No content\" type)",
  "rows": "5",
  "size": "40"
}));
obj.addProp("code", props.TextArea.create({
  "prettyName": "Macro code",
  "size": "40"
}));

module.exports.create = function () {
    return obj.instance();
};
