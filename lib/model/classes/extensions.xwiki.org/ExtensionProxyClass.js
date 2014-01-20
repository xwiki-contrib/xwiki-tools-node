var props = require("../../properties/all.js");
var BaseObj = require("../../BaseObj.js");
var obj = BaseObj.create("ExtensionCode.ExtensionProxyClass");

obj.addProp("repositoryId", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Repository Id",
  "size": "30",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("repositoryType", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Repository type",
  "size": "30",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("repositoryURI", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Repository URI",
  "size": "30",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("autoUpdate", props.XBoolean.create({
  "customDisplay": "",
  "defaultValue": "1",
  "displayFormType": "checkbox",
  "displayType": "",
  "prettyName": "Auto update",
  "validationMessage": "",
  "validationRegExp": ""
}));

module.exports.create = function () {
    return obj.instance();
};
