var lazyExport = function (name, pathOpt) {
    module.exports.__defineGetter__(name, function () {
        return require('./' + (pathOpt || name));
    });
};
lazyExport("Console");
lazyExport("DirTree");
lazyExport("Package");
lazyExport("Pom");
lazyExport("Tools");
lazyExport("model", "model/exports");
lazyExport("tools", "tools/exports");
