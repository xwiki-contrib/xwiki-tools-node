var XWiki = require('../index');
var Fs = require('fs');

Fs.readFile(process.argv[process.argv.length-1], function (err, data) {
  if (err) { throw err; }
  console.log(XWiki.tools.ClassParser.parse(data, (process.argv[process.argv.length-2] === '-i')));
});
