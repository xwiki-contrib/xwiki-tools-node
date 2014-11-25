var BaseProperty = require('./BaseProperty');
module.exports.create = function (extend) {
  return BaseProperty.create().extend({
    "cache": "0",
    "displayType": "select",
    "multiSelect": "0",
    "relationalStorage": "0",
    "separator": " ",
    "separators": "",
    "size": "1",
    "sort": "value",
    "unmodifiable": "0",
    "classType": "com.xpn.xwiki.objects.classes.LevelsClass"
  }, extend);
};
