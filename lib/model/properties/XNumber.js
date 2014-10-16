var BaseProperty = require('./BaseProperty');
module.exports.create = function (extend) {
  return BaseProperty.create().extend({
    "size": "255",
    "numberType": "integer",
    "classType": "com.xpn.xwiki.objects.classes.NumberClass"
  }, extend);
};
