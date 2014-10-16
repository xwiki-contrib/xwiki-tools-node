XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("name", props.XString.create({
    "prettyName": "Parameter name",
    "size": "30"
  }));
  xcl.addProp("description", props.TextArea.create({
    "prettyName": "Parameter description",
    "rows": "5",
    "size": "40"
  }));
  xcl.addProp("mandatory", props.XBoolean.create({
    "prettyName": "Parameter mandatory"
  }));
  xcl.addProp("defaultValue", props.XString.create({
    "prettyName": "Parameter default value",
    "size": "30"
  }));
});
