var props = require("../properties/all.js");
var BaseObj = require("../BaseObj");
var obj = BaseObj.create("XWiki.StyleSheetExtension");

obj.addProp("name", props.XString.create({
  "prettyName": "Name",
  "size": "30"
}));
obj.addProp("code", props.TextArea.create({
  "prettyName": "Code"
}));
obj.addProp("use", props.StaticList.create({
  "prettyName": "Use this extension",
  "values": "currentPage=Always on this page|onDemand=On demand|always=Always on this wiki"
}));
obj.addProp("parse", props.XBoolean.create({
  "prettyName": "Parse content"
}));
obj.addProp("cache", props.StaticList.create({
  "prettyName": "Caching policy",
  "values": "long|short|default|forbid"
}));

module.exports.create = function () {
    return obj.instance();
};
