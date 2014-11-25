var XWikiDoc = require('../model/XWikiDoc');

var parse = module.exports.parse = function(attach, docSpace, docName, fsTree, undefined) {

    fsTree.xwiki[docSpace] = fsTree.xwiki[docSpace] || {};
    fsTree.xwiki[docSpace][docName] = fsTree.xwiki[docSpace][docName] || {};
    fsTree.xwiki[docSpace][docName].attachments = fsTree.xwiki[docSpace][docName].attachments || {};
    var attachDir = fsTree.xwiki[docSpace][docName].attachments;

    var buff = new Buffer(attach.content, 'base64');
    if (buff.length !== Number(attach.filesize)) {
        throw new Error("file size mismatch in [" + attach.filename + "] expected [" +
            attach.filesize + "] got [" + buff.length + "]");
    }
    attachDir[attach.filename] = buff;
};
