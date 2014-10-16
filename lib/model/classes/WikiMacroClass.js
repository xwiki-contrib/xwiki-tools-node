XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("id", props.XString.create({
    "prettyName": "Macro id",
    "size": "30"
  }));
  xcl.addProp("name", props.XString.create({
    "prettyName": "Macro name",
    "size": "30"
  }));
  xcl.addProp("description", props.TextArea.create({
    "prettyName": "Macro description",
    "rows": "5",
    "size": "40"
  }));
  xcl.addProp("defaultCategory", props.XString.create({
    "prettyName": "Default category",
    "size": "30"
  }));
  xcl.addProp("supportsInlineMode", props.XBoolean.create({
    "prettyName": "Supports inline mode"
  }));
  xcl.addProp("visibility", props.StaticList.create({
    "prettyName": "Macro visibility",
    "separator": "|",
    "separators": "|",
    "values": "Current User|Current Wiki|Global"
  }));
  xcl.addProp("contentType", props.StaticList.create({
    "prettyName": "Macro content type",
    "separator": "|",
    "separators": "|",
    "values": "Optional|Mandatory|No content"
  }));
  xcl.addProp("contentDescription", props.TextArea.create({
    "prettyName": "Content description (Not applicable for \"No content\" type)",
    "rows": "5",
    "size": "40"
  }));
  xcl.addProp("code", props.TextArea.create({
    "prettyName": "Macro code",
    "size": "40"
  }));
});
