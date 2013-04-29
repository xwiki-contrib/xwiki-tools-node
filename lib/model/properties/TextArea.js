define(['./BaseProperty'],function(BaseProperty) {
  return function(extend) {
    return new BaseProperty().extend({
      "rows": "20",
      "size": "50",
      "classType": "com.xpn.xwiki.objects.classes.TextAreaClass"
    }, extend);
  };
});
