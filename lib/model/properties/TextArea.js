var BaseProperty = require('./BaseProperty');
module.exports.create = function (extend) {
  return BaseProperty.create().extend({
    "rows": "20",
    "size": "50",
    "classType": "com.xpn.xwiki.objects.classes.TextAreaClass"
  }, extend);
};

