define([
  'xmhell',
  'model/properties/all',
  'model/BaseObj'
], function(
    XMHell,
    properties,
    BaseObj
) {
/*
  var getType = function(classType) {
    switch (classType) {
      case "com.xpn.xwiki.objects.classes.TextAreaClass": return "TextArea";
      case "com.xpn.xwiki.objects.classes.StringClass": return "XString";
      case "com.xpn.xwiki.objects.classes.BooleanClass": return "XBoolean";
      case "com.xpn.xwiki.objects.classes.StaticListClass": return "StaticList";
      default: throw new Error("Unhandled type [" + classType + "]");
    }
  };

  var addProp = function(json) {
    var type = getType(json.classType);
    var prop = new properties[type];
    var line = '  obj.addProp("' + json.name + '", new props.' + type + '(';
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

  return {
    parse: function(data, internal) {

      var json = XMHell.parse(String(data));
      var c = json.xwikidoc;

      var file = [
        'define(["xwiki-tools"], function(XWiki) {',
        '  var props = XWiki.model.properties;',
        '  var doc = new XWiki.model.XWikiDoc(['+ c.web + ', ' + c.name + ']);',
        ''
      ];

      var defaultDoc = new XWikiDoc([c.web, c.name]);
      var properties = [];
      for (var key in c) {
        var upperFirst = key[0].toUpperCase()+key.substring(1);
        switch (key) {
          case "web":
          case "name": break;

          case "language":
          case "defaultLanguage":
          case "translation":
          case "parent":
          case "creator":
          case "author":
          case "customClass":
          case "contentAuthor":
          case "creationDate":
          case "date":
          case "contentUpdateDate":
          case "version":
          case "title":
          case "defaultTemplate":
          case "validationScript":
          case "comment":
          case "minorEdit":
          case "syntaxId":
          case "hidden":
            if (c[key] !== defaultDoc.json[key]) {
              file.push('  obj.set' + upperFirst + '("' + c[key] + '");');
            }
            break;
          case "content":
            if
          default:
            properties[Number(c[key].number)] = c[key];
        }
      }
      properties.forEach(function(prop) {
        file.push(addProp(prop));
      });
      file.push('  return obj.instance;');
      file.push('});');
      return file.join('\n');
    }
  };
*/
});
