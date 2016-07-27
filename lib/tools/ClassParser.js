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
    case "com.xpn.xwiki.objects.classes.DBTreeListClass": return "DBTreeList";
    case "com.xpn.xwiki.objects.classes.PageClass": return "XPage";
    case "com.xpn.xwiki.objects.classes.UsersClass": return "Users";
    case "com.xpn.xwiki.objects.classes.ComputedFieldClass": return "ComputedField";
    case "com.xpn.xwiki.objects.classes.GroupsClass": return "Groups";
    case "com.xpn.xwiki.objects.classes.PasswordClass": return "Password";
    case "com.xpn.xwiki.objects.classes.LevelsClass": return "Levels";
    case "com.xpn.xwiki.objects.classes.EmailClass": return "Email";
    case "com.xpn.xwiki.objects.classes.TimezoneClass": return "Timezone";
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
    if ('name' === key) { continue; }
    if (typeof(c[key]) !== 'string') { continue; }
    var upperFirst = key[0].toUpperCase()+key.substring(1);
    file.push('  xcl.set' + upperFirst + '("' + c[key] + '");');
  }
  for (var key in c) {
    if (typeof(c[key]) === 'string') { continue; }
    file.push(addProp(c[key]));
  }
  file.push('});');
  return file.join('\n');
};
