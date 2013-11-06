define(['./BaseProperty'],function(BaseProperty) {
  return function(extend) {
    return new BaseProperty().extend({
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
      "classType": "com.xpn.xwiki.objects.classes.DBListClass"
    }, extend);
  };
});
