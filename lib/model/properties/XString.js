define(['./BaseProperty'], function(BaseProperty) {
  return function(extend) {
    return new BaseProperty().extend({
      "size": "255",
      "classType": "com.xpn.xwiki.objects.classes.StringClass"
    }, extend);
  };
});
