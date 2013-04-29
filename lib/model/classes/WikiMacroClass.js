define(["model/properties/all", "model/BaseObj"], function(props, BaseObj) {
  var obj = new BaseObj("XWiki.WikiMacroClass");

  obj.addProp("id", new props.XString({
    "prettyName": "Macro id",
    "size": "30"
  }));
  obj.addProp("name", new props.XString({
    "prettyName": "Macro name",
    "size": "30"
  }));
  obj.addProp("description", new props.TextArea({
    "prettyName": "Macro description",
    "rows": "5",
    "size": "40"
  }));
  obj.addProp("defaultCategory", new props.XString({
    "prettyName": "Default category",
    "size": "30"
  }));
  obj.addProp("supportsInlineMode", new props.XBoolean({
    "prettyName": "Supports inline mode"
  }));
  obj.addProp("visibility", new props.StaticList({
    "prettyName": "Macro visibility",
    "separator": "|",
    "separators": "|",
    "values": "Current User|Current Wiki|Global"
  }));
  obj.addProp("contentType", new props.StaticList({
    "prettyName": "Macro content type",
    "separator": "|",
    "separators": "|",
    "values": "Optional|Mandatory|No content"
  }));
  obj.addProp("contentDescription", new props.TextArea({
    "prettyName": "Content description (Not applicable for \"No content\" type)",
    "rows": "5",
    "size": "40"
  }));
  obj.addProp("code", new props.TextArea({
    "prettyName": "Macro code",
    "size": "40"
  }));
  return obj.instance;
});
