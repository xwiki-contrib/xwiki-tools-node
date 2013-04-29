define([
    'Tools',
    'node.extend'
], function (
    Tools,
    Extend
) {
  return function() {
    var self = this;
    self.json = {
      disabled: "0",
      name: function () { throw new Error("name unspecified") },
      number: function () { throw new Error("number unspecified") },
      prettyName: function (w, cb) {
        w.write(String(self.json.name[0].toUpperCase() + self.json.name.substring(1)));
        cb();
      },
      unmodifiable: "0",
      classType: function () { throw new Error("classType unspecified") }
    };

    self.extend = function (json, moreJson) {
      Extend(true, self.json, json, moreJson);
      Tools.addAccessors(self.json, self);
      if (self.prettyName === "" && typeof(self.name) === 'string') {
          self.prettyName = self.name[0].toUpperCase() + self.name.substring(1);
      }
      return self;
    };

    self.setValue = self.getValue = function (val) { return val; };

    Tools.addAccessors(self.json, self);

    return self;
  };
});
