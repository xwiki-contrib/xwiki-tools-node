define([
  'node-uuid',
  'Tools',
  'node.extend',
], function(
  UUID,
  Tools,
  Extend
) {
  return function(className) {
    var json = this.json = {
      "class": {
        name: className,
        customClass: "",
        customMapping: "",
        defaultViewSheet: "",
        defaultEditSheet: "",
        defaultWeb: "",
        nameField: "",
        validationScript: ""
      },
      // Set when object is added to document.
      name: function() { throw new Error("name is unspecified"); },
      number: function() { throw new Error("object number is unspecified"); },
      className: className,

      // Set when instanciated
      guid: function() { throw new Error("guid unspecified"); },
    };

    var props = [];
    var klass = this.json['class'];
    var objNumber = 0;

    var addTag = this.addTag = function(container, tag, value) {
      container = container || {};
      for (var j = 2; typeof(container[tag]) !== 'undefined'; j++) {
        tag = tag.replace(/ [0-9]*$/, '') + " " + j;
      }
      container[tag] = value;
      return container;
    };

    this.addProp = function (name, prop) {
      objNumber++;
      prop.json.number = objNumber;
      prop.json.name = name;
      addTag(klass, name, prop.json);
      var propJson = {};
      // TODO: this should be a post-process filter because this is wrong.
      if (prop.classType !== "com.xpn.xwiki.objects.classes.ComputedFieldClass") {
          props[objNumber] = prop;
          (json["property " + objNumber] = {})[name] = '';
      }
    };

    this.instance = function () {
      this.json = Extend(true, {}, json);
      this.json.guid = UUID.v4();
      var that = this;
      props.forEach(function (prop, i) {
        var k = prop.json.name;
        var upperFirst = k[0].toUpperCase()+k.substring(1);
        that['set'+upperFirst] = function(val) {
          that.json["property "+i][k] = prop.setValue(val);
          return that;
        };
        that['get'+upperFirst] = function() { return that.json["property "+i][k]; };
      });
      return this;
    };

    Tools.addAccessors(klass, this);
    return this;
  };
});
