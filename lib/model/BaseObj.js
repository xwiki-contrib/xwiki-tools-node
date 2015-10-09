var UUID = require('node-uuid');
var Tools = require('../Tools');
var Extend = require('node.extend');

module.exports.create = function (className) {
  var self = {};
  var json = self.json = {
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
  var klass = self.json['class'];
  var objNumber = 0;

  var addTag = self.addTag = function(container, tag, value) {
    container = container || {};
    for (var j = 2; typeof(container[tag]) !== 'undefined'; j++) {
      tag = tag.replace(/ [0-9]*$/, '') + " " + j;
    }
    container[tag] = value;
    return container;
  };

  self.addProp = function (name, prop) {
    objNumber++;
    prop.json.number = objNumber;
    prop.json.name = name;
    addTag(klass, name, prop.json);
    var propJson = {};
    // TODO: this should be a post-process filter because this is wrong.
    if (prop.json.classType !== "com.xpn.xwiki.objects.classes.ComputedFieldClass") {
        props[objNumber] = prop;
        (json["property " + objNumber] = {})[name] = '';
    }
  };

  self.instance = function () {
    var that = {};
    that.json = Extend(true, {}, json);
    that.json.guid = UUID.v4();

    var index = props.length;
    that.addDeprecatedProperty = function (name, value) {
        if (typeof(name) !== 'string' || typeof(value) !== 'string') {
          throw new Error("addDeprecatedProperty() must be called with key, value");
        }
        var propObj = {};
        propObj[name] = value;
        that.json["property " + (index++)] = propObj;
    }
    props.forEach(function (prop, i) {
      var k = prop.json.name;
      var upperFirst = k[0].toUpperCase()+k.substring(1);
      that['set'+upperFirst] = function(val) {
        that.json["property "+i][k] = prop.setValue(val);
        return that;
      };
      that['get'+upperFirst] = function() { return that.json["property "+i][k]; };
    });
    return that;
  };

  Tools.addAccessors(klass, self);
  return self;
};
