define(["model/properties/all", "model/BaseObj"], function(props, BaseObj) {
  var obj = new BaseObj("XWiki.JavaScriptExtension");

  obj.addProp("name", new props.XString({
    "prettyName": "Name",
    "size": "30"
  }));
  obj.addProp("code", new props.TextArea({
    "prettyName": "Code"
  }));
  obj.addProp("use", new props.StaticList({
    "prettyName": "Use this extension",
    "values": "currentPage=Always on this page|onDemand=On demand|always=Always on this wiki"
  }));
  obj.addProp("parse", new props.XBoolean({
    "prettyName": "Parse content"
  }));
  obj.addProp("cache", new props.StaticList({
    "prettyName": "Caching policy",
    "values": "long|short|default|forbid"
  }));
  return obj.instance;
});
