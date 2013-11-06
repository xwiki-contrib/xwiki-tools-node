define(["model/properties/all", "model/BaseObj"], function(props, BaseObj) {
  var obj = new BaseObj("ExtensionCode.ExtensionClass");

  obj.addProp("id", new props.XString({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "id",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("name", new props.XString({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Name",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("summary", new props.XString({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Summary",
    "size": "75",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("description", new props.TextArea({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Description",
    "rows": "50",
    "size": "75",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("icon", new props.XString({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Display Icon Location",
    "size": "75",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("installation", new props.TextArea({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Prerequisites & Additional Installation Instructions",
    "rows": "15",
    "size": "75",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("source", new props.XString({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Source",
    "size": "75",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("type", new props.DBList({
    "classname": "ExtensionCode.ExtensionTypeClass",
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Type",
    "validationMessage": "",
    "validationRegExp": "",
    "valueField": "name"
  }));
  obj.addProp("website", new props.XString({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Website",
    "size": "50",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("features", new props.StaticList({
    "customDisplay": "",
    "displayType": "input",
    "multiSelect": "1",
    "picker": "0",
    "prettyName": "features",
    "size": "30",
    "sort": "none",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("authors", new props.StaticList({
    "customDisplay": "{{include document=\"ExtensionCode.ExtensionAuthorsDisplayer\"/}}",
    "displayType": "input",
    "multiSelect": "1",
    "picker": "0",
    "prettyName": "Authors",
    "separator": ",",
    "separators": ",|",
    "size": "30",
    "sort": "none",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("lastVersion", new props.XString({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Last version",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("validExtension", new props.XBoolean({
    "customDisplay": "",
    "defaultValue": "0",
    "displayType": "",
    "prettyName": "Installable with Extension Manager",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("customInstallationOnly", new props.XBoolean({
    "customDisplay": "",
    "defaultValue": "0",
    "displayType": "",
    "prettyName": "Only Custom Installation instructions",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  return obj.instance;
});
