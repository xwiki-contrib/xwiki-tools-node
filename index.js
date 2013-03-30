(function() {
    var req = require('requirejs');
    req.config({baseUrl:__dirname});
    module.exports = req('./lib/xwiki');
})();
