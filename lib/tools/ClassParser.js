var XMHell = require('xmhell');
var props = require('../model/properties/exports');
var BaseObj = require('../model/BaseObj');

var getType = function(classType) {
  switch (classType) {
    case "com.xpn.xwiki.objects.classes.TextAreaClass": return "TextArea";
    case "com.xpn.xwiki.objects.classes.StringClass": return "XString";
    case "com.xpn.xwiki.objects.classes.NumberClass": return "XNumber";
    case "com.xpn.xwiki.objects.classes.BooleanClass": return "XBoolean";
    case "com.xpn.xwiki.objects.classes.DateClass": return "XDate";
    case "com.xpn.xwiki.objects.classes.StaticListClass": return "StaticList";
    case "com.xpn.xwiki.objects.classes.DBListClass": return "DBList";
    case "com.xpn.xwiki.objects.classes.UsersClass": return "Users";
    case "com.xpn.xwiki.objects.classes.ComputedFieldClass": return "ComputedField";
    case "com.xpn.xwiki.objects.classes.GroupsClass": return "Groups";
    case "com.xpn.xwiki.objects.classes.PasswordClass": return "Password";
    case "com.xpn.xwiki.objects.classes.LevelsClass": return "Levels";
    case "com.xpn.xwiki.objects.classes.EmailClass": return "Email";
    default: throw new Error("Unhandled type [" + classType + "]");
  }
};

var addProp = function(json) {
  var type = getType(json.classType);
  var prop = props[type].create();
  var line = '  xcl.addProp("' + json.name + '", props.' + type + '.create(';
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
    line += JSON.stringify(diff, null, '  ').split('\n').join('\n  ');
  }
  line += '));';
  return line;
};

var parse = module.exports.parse = function(c, undefined) {
  var file = [
    'XClass(function (xcl, XWiki) {',
    '  var props = XWiki.model.properties;'
  ];

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
          file.push('xcl.set' + upperFirst + '("' + c[key] + '");');
        }
        break;
      default:
        properties[Number(c[key].number)] = c[key];
    }
  }
  properties.forEach(function(prop) {
    file.push(addProp(prop));
  });
  file.push('});');
  return file.join('\n');
};
