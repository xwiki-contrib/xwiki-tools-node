define(["model/properties/all", "model/BaseObj"], function(props, BaseObj) {
  var obj = new BaseObj("ExtensionCode.ExtensionProxyClass");

  obj.addProp("repositoryId", new props.XString({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Repository Id",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("repositoryType", new props.XString({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Repository type",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("repositoryURI", new props.XString({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Repository URI",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  obj.addProp("autoUpdate", new props.XBoolean({
    "customDisplay": "",
    "defaultValue": "1",
    "displayFormType": "checkbox",
    "displayType": "",
    "prettyName": "Auto update",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  return obj.instance;
});
