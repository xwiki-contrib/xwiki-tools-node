var props = require("../../properties/all.js");
var BaseObj = require("../../BaseObj.js");
var obj = BaseObj.create("ExtensionCode.ExtensionDependencyClass");

obj.addProp("extensionVersion", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Extension version",
  "size": "30",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("id", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Dependency id",
  "size": "30",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("constraint", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Dependency version constraint",
  "size": "30",
  "validationMessage": "",
  "validationRegExp": ""
}));

module.exports.create = function () {
    return obj.instance();
};
