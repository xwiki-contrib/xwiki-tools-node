var BaseProperty = require('./BaseProperty');
module.exports.create = function (extend) {
  return BaseProperty.create().extend({
    "cache": "0",
    "displayType": "select",
    "idField": "id",
    "multiSelect": "0",
    "relationalStorage": "0",
    "separator": " ",
    "separators": "",
    "size": "1",
    "sort": "value",
    "sql": "",
    "unmodifiable": "0",
    "classType": "com.xpn.xwiki.objects.classes.PageClass"
  }, extend);
};
