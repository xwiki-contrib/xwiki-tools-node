var BaseProperty = require('./BaseProperty');
module.exports.create = function (extend) {
  return BaseProperty.create().extend({
    "customDisplay": "",
    "script": "",
    "classType": "com.xpn.xwiki.objects.classes.ComputedFieldClass"
  }, extend);
};
