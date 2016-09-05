var PackageJson = require('../package.json');
var Semver = require('semver');

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

var VERSION = module.exports.VERSION = PackageJson.version;
var assertVersion = module.exports.assertVersion = function (v) {
    if (!Semver.satisfies(VERSION, v)) {
        throw new Error("Version mismatch, this package requires xargen [" + VERSION + "] but " +
            "current version is [" + v + "]");
    }
};
