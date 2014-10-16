var BaseProperty = require('./BaseProperty');
module.exports.create = function (extend) {
  return BaseProperty.create().extend({
    "size": "255",
    "dateFormat": "dd/MM/yyyy HH:mm:ss",
    "emptyIsToday": "1",
    "classType": "com.xpn.xwiki.objects.classes.DateClass"
  }, extend);
};
