var lazyExport = function (name, pathOpt) {
    module.exports.__defineGetter__(name, function () {
        return require('./' + (pathOpt || name));
    });
};
lazyExport("ClassParser");
