var includes = [
    'XML',
    'Tools',
    'Package',
    'model/JavaScriptExtension',
    'model/XWikiDoc'
]

define(includes.map(function(k) { return './'+k }), function()
{
    var container = {};
    for (var i = 0; i < includes.length; i++) {
        var parts = includes[i].split('/');
        var end = parts.pop();
        var cont = container;
        for (var part; part = parts.shift();) {
            cont = (cont[part] = cont[part] || {});
        }
        cont[end] = arguments[i];
    }
    return container;
});
