var BaseProperty = require('./BaseProperty');
module.exports.create = function (extend) {
  return BaseProperty.create().extend({
    "cache": "0",
    "displayType": "select",
    "multiSelect": "0",
    "relationalStorage": "0",
    "separator": " ",
    "separators": " ,|",
    "size": "1",
    "unmodifiable": "0",
    "values": "",
    "classType": "com.xpn.xwiki.objects.classes.StaticListClass"
  }, extend);
};
