var props = require("../../properties/all.js");
var BaseObj = require("../../BaseObj.js");
var obj = BaseObj.create("ExtensionCode.ExtensionClass");

obj.addProp("id", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Id",
  "size": "30",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("type", props.DBList.create({
  "classname": "ExtensionCode.ExtensionTypeClass",
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Type",
  "validationMessage": "",
  "validationRegExp": "",
  "valueField": "name"
}));
obj.addProp("name", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Name",
  "size": "30",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("summary", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Summary",
  "size": "75",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("description", props.TextArea.create({
  "customDisplay": "",
  "editor": "---",
  "picker": "0",
  "prettyName": "Description",
  "rows": "50",
  "size": "75",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("website", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Website",
  "size": "30",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("authors", props.StaticList.create({
  "customDisplay": "{{include document=\"ExtensionCode.ExtensionAuthorsDisplayer\"/}}",
  "displayType": "input",
  "multiSelect": "1",
  "picker": "0",
  "prettyName": "Authors",
  "separators": ",|",
  "size": "30",
  "sort": "none",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("features", props.StaticList.create({
  "customDisplay": "",
  "displayType": "input",
  "multiSelect": "1",
  "picker": "0",
  "prettyName": "Features",
  "size": "60",
  "sort": "none",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("lastVersion", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Last version",
  "size": "30",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("licenseName", props.StaticList.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "License Name",
  "separators": ",|",
  "sort": "none",
  "validationMessage": "",
  "validationRegExp": "",
  "values": "GNU General Public License 1|GNU General Public License 2|GNU General Public License 3|GNU Lesser General Public License 2|GNU Lesser General Public License 2.1|GNU Lesser General Public License 3|Apache License 2.0|BSD license|Modified BSD License|Simplified BSD License|GNU Affero General Public License 3|GNU Free Documentation License 1.1|GNU Free Documentation License 1.2|GNU Free Documentation License 1.3|Educational Community License 1.0|Educational Community License 2.0|Do What The Fuck You Want To Public License 2"
}));
obj.addProp("validExtension", props.XBoolean.create({
  "customDisplay": "",
  "defaultValue": "0",
  "displayFormType": "checkbox",
  "displayType": "",
  "prettyName": "Installable with Extension Manager",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("icon", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Display Icon Location",
  "size": "75",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("installation", props.TextArea.create({
  "customDisplay": "",
  "editor": "---",
  "picker": "0",
  "prettyName": "Prerequisites & Additional Installation Instructions",
  "rows": "15",
  "size": "75",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("source", props.XString.create({
  "customDisplay": "",
  "picker": "0",
  "prettyName": "Source",
  "size": "75",
  "validationMessage": "",
  "validationRegExp": ""
}));
obj.addProp("customInstallationOnly", props.XBoolean.create({
  "customDisplay": "",
  "defaultValue": "0",
  "displayFormType": "checkbox",
  "displayType": "",
  "prettyName": "Only Custom Installation instructions",
  "validationMessage": "",
  "validationRegExp": ""
}));

module.exports.create = function () {
    return obj.instance();
};
