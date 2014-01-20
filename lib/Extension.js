var Tools = require('./Tools');
var Archiver = require('archiver');
var BufferedWriter = require('buffered-writer');
var XMHell = require('xmhell');
var ExtensionClass = require('./model/classes/extensions.xwiki.org/ExtensionClass.js');
var ExtensionVersionClass =
    require('./model/classes/extensions.xwiki.org/ExtensionVersionClass.js');

var create = module.exports.create = function(pkg, sourceLocation) {

  var doc = XWikiDoc.create(['Extension', pkg.getName()]);

  var extObj = ExtensionClass.create();
  extObj.setId(pkg.getExtensionId());
  extObj.setName(pkg.getName());
  extObj.setDescription(pkg.getDescription());
  extObj.setLicenseName(pkg.getLicence());
  extObj.setValidExtension(true);
  extObj.setSource(sourceLocation);
  doc.addXObject(extObj);

  var fileName = ''+pkg.getName()+'-'+pkg.getVersion()+'.xar';

  var verObj = ExtendionVersionClass.create();
  verObj.setVersion(pkg.getVersion);
  verObj.setDownload('attach:'+fileName);
  doc.addXObject(verObj);

  nThen(function(waitFor) {
      Temp.mkdir('xwiki-tools-genxar', waitFor(function(err, dirPath) {
        if (err) { throw err; }
        var filePath = dirPath + '/' + fileName;
        pkg.genXar(filePath, waitFor(function () {
            doc.addAttachment(filePath);
        }));
      }));

  }).nThen(function(waitFor) {

      
  });

};
