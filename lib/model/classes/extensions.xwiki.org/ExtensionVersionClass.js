define(["model/properties/all", "model/BaseObj"], function(props, BaseObj) {
  var obj = new BaseObj("ExtensionCode.ExtensionVersionClass");

  obj.addProp("version", new props.XString({
    "picker": "0",
    "prettyName": "Version",
    "size": "10",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("download", new props.XString({
    "picker": "0",
    "prettyName": "Download URL",
    "size": "50",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("notes", new props.TextArea({
    "editor": "---",
    "picker": "0",
    "prettyName": "Release Notes",
    "rows": "15",
    "size": "75",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  return obj.instance;
});
