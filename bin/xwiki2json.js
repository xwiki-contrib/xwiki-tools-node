require('requirejs')(
[
    'fs',
    'xmhell'
], function(
    fs,
    XMHell
) {
    fs.readFile(process.argv[process.argv.length-1], function (err, data) {
        if (err) { throw err; }
        var json = XMHell.parse(String(data));
        console.log(JSON.stringify(json, null, '  '));
    });
});
