var Package = require('./Package');

module.exports.main = function (argv) {
    Package.fromDirTree('./src/xwiki/', function (pkg) {
        var i;
        if ((i = argv.indexOf('--post')) > -1) {
            pkg.postToWiki(argv[i+1]);
        } else if (argv.indexOf('--mvn') > -1) {
            pkg.genMvn('mvnout');
        } else {
            pkg.genXar();
        }
    });
};
