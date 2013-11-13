define(['./BaseProperty'],function(BaseProperty) {
  return function(extend) {
    return new BaseProperty().extend({
      "customDisplay": "",
      "script": "",
      "classType": "com.xpn.xwiki.objects.classes.ComputedFieldClass"
    }, extend);
  };
});
