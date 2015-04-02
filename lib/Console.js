var Package = require('./Package');
var Fs = require('fs');

module.exports.main = function (argv) {
    Package.fromDirTree('./src/', function (pkg) {
        var i;
        if ((i = argv.indexOf('--post')) > -1) {
            pkg.postToWiki(argv[i+1], (argv.indexOf('--ssl') !== -1));
        } else if ((i = argv.indexOf('--mvn')) > -1) {
            var path = argv[i+1];
            if(Fs.existsSync(path)) {
                pkg.genMvn(path);
            } else {
                pkg.genMvn('mvnout');
            }
        } else {
            pkg.genXar();
        }
    });
};
