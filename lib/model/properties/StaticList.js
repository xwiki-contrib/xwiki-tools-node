define(['./BaseProperty'],function(BaseProperty) {
  return function(extend) {
    return new BaseProperty().extend({
      "cache": "0",
      "displayType": "select",
      "multiSelect": "0",
      "relationalStorage": "0",
      "separator": " ",
      "separators": " ,|",
      "size": "1",
      "unmodifiable": "0",
      "values": "",
      "classType": "com.xpn.xwiki.objects.classes.StaticListClass"
    }, extend);
  };
});
