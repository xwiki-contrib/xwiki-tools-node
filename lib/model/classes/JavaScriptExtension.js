XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("name", props.XString.create({
    "prettyName": "Name",
    "size": "30"
  }));
  xcl.addProp("code", props.TextArea.create({
    "prettyName": "Code"
  }));
  xcl.addProp("use", props.StaticList.create({
    "prettyName": "Use this extension",
    "values": "currentPage=Always on this page|onDemand=On demand|always=Always on this wiki"
  }));
  xcl.addProp("parse", props.XBoolean.create({
    "prettyName": "Parse content"
  }));
  xcl.addProp("cache", props.StaticList.create({
    "prettyName": "Caching policy",
    "values": "long|short|default|forbid"
  }));
});
