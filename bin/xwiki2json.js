require('requirejs')(
[
    'fs',
    '../lib/XML'
], function(
    fs,
    XML
) {
    fs.readFile(process.argv[process.argv.length-1], function (err, data) {
        if (err) { throw err; }
        var json = XML.read(data.toString());
        console.log(JSON.stringify(json, null, '    '));
    });
});
