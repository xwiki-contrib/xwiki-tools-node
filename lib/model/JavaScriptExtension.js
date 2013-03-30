define(['node-uuid'], function(UUID) { return function() {
    var json = this.json = {
        "class": {
            "name": "XWiki.JavaScriptExtension",
            "customClass": "",
            "customMapping": "",
            "defaultViewSheet": "",
            "defaultEditSheet": "",
            "defaultWeb": "",
            "nameField": "",
            "validationScript": "",
            "cache": {
                "cache": "0",
                "disabled": "0",
                "displayType": "select",
                "multiSelect": "0",
                "name": "cache",
                "number": "5",
                "prettyName": "Caching policy",
                "relationalStorage": "0",
                "separator": " ",
                "separators": " ,|",
                "size": "1",
                "unmodifiable": "0",
                "values": "long|short|default|forbid",
                "classType": "com.xpn.xwiki.objects.classes.StaticListClass"
            },
            "code": {
                "disabled": "0",
                "name": "code",
                "number": "2",
                "prettyName": "Code",
                "rows": "20",
                "size": "50",
                "unmodifiable": "0",
                "classType": "com.xpn.xwiki.objects.classes.TextAreaClass"
            },
            "name 2": {
                "disabled": "0",
                "name": "name",
                "number": "1",
                "prettyName": "Name",
                "size": "30",
                "unmodifiable": "0",
                "classType": "com.xpn.xwiki.objects.classes.StringClass"
            },
            "parse": {
                "disabled": "0",
                "displayFormType": "select",
                "displayType": "yesno",
                "name": "parse",
                "number": "4",
                "prettyName": "Parse content",
                "unmodifiable": "0",
                "classType": "com.xpn.xwiki.objects.classes.BooleanClass"
            },
            "use": {
                "cache": "0",
                "disabled": "0",
                "displayType": "select",
                "multiSelect": "0",
                "name": "use",
                "number": "3",
                "prettyName": "Use this extension",
                "relationalStorage": "0",
                "separator": " ",
                "separators": " ,|",
                "size": "1",
                "unmodifiable": "0",
                "values": "currentPage=Always on this page|onDemand=On demand|always=Always on this wiki",
                "classType": "com.xpn.xwiki.objects.classes.StaticListClass"
            }
        },
        // Set in XWikiDoc.addXObject()
        "name": function() { throw new Error("name is unspecified"); },
        "number": function() { throw new Error("object number is unspecified"); },
        "className": "XWiki.JavaScriptExtension",
        "guid": UUID.v4(),
        "property": {
          "cache": "long"
        },
        "property 2": {
          "code": "(function()"
        },
        "property 3": {
          "name": ""
        },
        "property 4": {
          "parse": "1"
        },
        "property 5": {
          "use": "always"
        }
    };

    for (var key in json) {
        if (key.split(' ')[0] !== 'property') { continue; }
        (function(that) {
            var k = key;
            var name = Object.keys(json[key])[0];
            var upperFirst = name[0].toUpperCase()+name.substring(1);
            that['set'+upperFirst] = function(val) { json[k][name] = val; };
            that['get'+upperFirst] = function(val) { return json[k][name]; };
        })(this);
    }
    return this;
}});
