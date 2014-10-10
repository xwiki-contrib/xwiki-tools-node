var Package = require('./Package');
var fs = require('fs');

module.exports.main = function (argv) {
    Package.fromDirTree('./src/xwiki/', function (pkg) {
        var i;
        if ((i = argv.indexOf('--post')) > -1) {
            pkg.postToWiki(argv[i+1]);
        } else if ((i = argv.indexOf('--mvn')) > -1) {
            var path = argv[i+1];
            if(fs.existsSync(path)) {
                pkg.genMvn(path);
            } else {
                pkg.genMvn('mvnout');
            }
        } else {
            pkg.genXar();
        }
    });
};
