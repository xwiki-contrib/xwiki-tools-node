var lazyExport = function (name, pathOpt) {
    module.exports.__defineGetter__(name, function () {
        return require('./' + (pathOpt || name));
    });
};
lazyExport("BaseObj");
lazyExport("XWikiDoc");
lazyExport("classes", "classes/exports");
lazyExport("properties", "properties/exports");
