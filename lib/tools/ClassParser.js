var XMHell = require('xmhell');
var props = require('../model/properties/all');
var BaseObj = require('../model/BaseObj');

var getType = function(classType) {
  switch (classType) {
    case "com.xpn.xwiki.objects.classes.TextAreaClass": return "TextArea";
    case "com.xpn.xwiki.objects.classes.StringClass": return "XString";
    case "com.xpn.xwiki.objects.classes.NumberClass": return "XNumber";
    case "com.xpn.xwiki.objects.classes.BooleanClass": return "XBoolean";
    case "com.xpn.xwiki.objects.classes.StaticListClass": return "StaticList";
    case "com.xpn.xwiki.objects.classes.DBListClass": return "DBList";
    case "com.xpn.xwiki.objects.classes.UsersClass": return "Users";
    case "com.xpn.xwiki.objects.classes.ComputedFieldClass": return "ComputedField";
    default: throw new Error("Unhandled type [" + classType + "]");
  }
};

var addProp = function(json) {
  var type = getType(json.classType);
  var prop = props[type].create();
  var line = 'obj.addProp("' + json.name + '", props.' + type + '.create(';
  var diff = {};
  for (var key in json) {
    switch (key) {
      case "number":
      case "name": break;
      default:
        if (prop.json[key] !== json[key]) {
          diff[key] = json[key];
        }
    }
  }
  if (diff !== {}) {
    line += JSON.stringify(diff, null, '  ');
  }
  line += '));';
  return line;
};

var parse = module.exports.parse = function(data, internal) {
  var json = XMHell.parse(String(data));
  var c = json.xwikidoc['class'];

  var file = [
    'var XWiki = require("xwiki-tools");',
    'var props = XWiki.model.properties;',
    'var obj = XWiki.model.BaseObj.create("' + c.name + '");'
  ];
  if (internal) {
    file = [
      'var props = require("../../properties/all.js");',
      'var BaseObj = require("../../BaseObj.js");',
      'var obj = BaseObj.create("' + c.name + '");'
    ];
  }

  file.push('');

  var obj = BaseObj.create("test");
  var properties = [];
  for (var key in c) {
    var upperFirst = key[0].toUpperCase()+key.substring(1);
    switch (key) {
      case "name": break;
      case "customClass":
      case "customMapping":
      case "defaultViewSheet":
      case "defaultEditSheet":
      case "defaultWeb":
      case "nameField":
      case "validationScript":
        if (c[key] !== obj.json['class'][key]) {
          file.push('obj.set' + upperFirst + '("' + c[key] + '");');
        }
        break;
      default:
        properties[Number(c[key].number)] = c[key];
    }
  }
  properties.forEach(function(prop) {
    file.push(addProp(prop));
  });
  file.push('module.exports.create = function () {');
  file.push('  return obj.instance();');
  file.push('};');
  return file.join('\n');
};
