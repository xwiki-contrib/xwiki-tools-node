var BaseProperty = require('./BaseProperty');
module.exports.create = function (extend) {
  var base = BaseProperty.create().extend({
    "displayFormType": "select",
    "displayType": "yesno",
    "classType": "com.xpn.xwiki.objects.classes.BooleanClass"
  }, extend);

  base.setValue = function (val) {
    switch (val) {
      case 0:
      case "0":
      case "":
      case false:
      case "false": return "0";
      case 1:
      case "1":
      case true:
      case "true": return "1";
      default: throw new Error("Cannot convert [" + val + "] to boolean");
    }
  };

  base.getValue = function (val) {
    return (val === "1");
  };

  return base;
};
