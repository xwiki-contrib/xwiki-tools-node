var props = require("../../properties/all.js");
var BaseObj = require("../../BaseObj.js");
var obj = BaseObj.create("ExtensionCode.ExtensionVersionClass");

obj.addProp("version", props.XString.create({
  "picker": "0",
  "prettyName": "Version",
  "size": "10",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("download", props.XString.create({
  "picker": "0",
  "prettyName": "Download URL",
  "size": "50",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("notes", props.TextArea.create({
  "editor": "---",
  "picker": "0",
  "prettyName": "Release Notes",
  "rows": "15",
  "size": "75",
  "validationMessage": "",
  "validationRegExp": ""
}));

module.exports.create = function () {
    return obj.instance();
};
