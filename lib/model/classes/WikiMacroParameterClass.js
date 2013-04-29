define(["model/properties/all", "model/BaseObj"], function(props, BaseObj) {
  var obj = new BaseObj("XWiki.WikiMacroParameterClass");

  obj.addProp("name", new props.XString({
    "prettyName": "Parameter name",
    "size": "30"
  }));
  obj.addProp("description", new props.TextArea({
    "prettyName": "Parameter description",
    "rows": "5",
    "size": "40"
  }));
  obj.addProp("mandatory", new props.XBoolean({
    "prettyName": "Parameter mandatory"
  }));
  obj.addProp("defaultValue", new props.XString({
    "prettyName": "Parameter default value",
    "size": "30"
  }));
  return obj.instance;
});
