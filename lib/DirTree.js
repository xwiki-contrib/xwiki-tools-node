var XWiki = require('./xwiki');

var nThen = require('nthen');
var Fs = require('fs');
var Os = require('os');
var XMHell = require('xmhell');

var execute = function (name, content, funcName, args, callback)
{
    var to = setTimeout(function () {
        throw new Error("[" + name + "] did not complete execution in 10 seconds");
    }, 10000);

    var xx = function (f) {
        f.apply(null, args);
        clearTimeout(to);
        callback();
    };
    eval('function '+funcName+'(f) { xx(f); } ' + content);
};

var executeFile = function (fileName, funcName, args, callback)
{
    Fs.readFile(fileName, function (err, content) {
        if (err) { throw err; }
        execute(fileName, content.toString(), funcName, args, callback);
        console.log("ran " + fileName);
    });
};

var findClass = function (objName) {
    var className = objName.replace(/_[0-9]*$/, '');
    var spaceAndName = className.split('.');
    var space = spaceAndName[0];
    var name = spaceAndName[1];
    if (typeof(name) === 'undefined') {
        name = space;
        space = undefined;
    }
    var Clazz;
    if (typeof(XWiki.model.classes[space]) !== 'undefined'
        && typeof(XWiki.model.classes[space][name]) !== 'undefined')
    {
        return XWiki.model.classes[space][name];
    } else if (typeof(XWiki.model.classes[name]) !== 'undefined') {
        return XWiki.model.classes[name];
    }
    throw new Error("could not find class for object [" + objName + "]");
};

var addObject = function (doc, objDir, objName, callback) {
    var Clazz = findClass(objName);
    var obj = Clazz.create();
    doc.addXObject(obj);

    var files;
    nThen(function (waitFor) {

        Fs.readdir(objDir, waitFor(function (err, f) {
            if (err) { throw err; }
            files = f;
        }));

    }).nThen(function (waitFor) {

        if (files.indexOf('this.js') > -1) {
            executeFile(objDir+'/this.js', 'XWikiObj', [obj, XWiki], waitFor());
        }

    }).nThen(function (waitFor) {

        files.forEach(function (prop) {
            if (prop === 'this.js') { return; }

            var setter = 'set' + prop[0].toUpperCase() + prop.replace(/\.[^\.]*$/,'').substring(1);
            if (typeof(obj[setter]) !== 'function') {
                console.log("WARNING: object [" + objName + "] has no [" + setter
                    + "] ignoring [" + objDir+'/'+prop + "]");
                return;
            }
            console.log("prop " + objDir+'/'+prop);
            obj[setter]( XWiki.Tools.contentFromFile(objDir+'/'+prop) );

        });

    }).nThen(callback);
};

var handleObjectDir = function (doc, objectsDir, callback)
{
    nThen(function (waitFor) {

        Fs.stat(objectsDir, waitFor(function (err, stat) {
            if (err) { throw err; }
            if (!stat.isDirectory()) {
                throw new Error("[" + objectsDir + "] must be a directory");
            }
        }));

    }).nThen(function (waitFor) {

        Fs.readdir(objectsDir, waitFor(function (err, objects) {
            if (err) { throw err; }
            objects.forEach(function (objName) {
                var objDir = objectsDir+'/'+objName;
                console.log("obj "+objDir);
                addObject(doc, objDir, objName, waitFor());
            });
        }));

    }).nThen(callback);
};

var handleAttachmentDir = function (doc, attachmentDir, callback)
{
    nThen(function (waitFor) {
        Fs.stat(attachmentDir, waitFor(function (err, stat) {
            if (err) { throw err; }
            if (!stat.isDirectory()) {
                throw new Error("[" + attachmentDir + "] must be a directory");
            }
        }));
    }).nThen(function (waitFor) {
        Fs.readdir(attachmentDir, waitFor(function (err, attachments) {
            if (err) { throw err; }
            attachments.forEach(function (attach) {
                var attachFile = attachmentDir+'/'+attach;
                console.log("attachment " + attachFile);
                doc.addAttachment(attachFile);
            });
        }));
    }).nThen(callback);
};

var setPageField = function (doc, name, file, callback) {
    nThen(function (waitFor) {
        var cName = name[0].toUpperCase() + name.substring(1);
        if (typeof(doc['set' + cName]) === 'undefined') {
            console.log("WARNING: no method XWikiDoc.set" + cName + "() ignoring [" + file + "]");
            return;
        }
        Fs.readFile(file, waitFor(function (err, content) {
            if (err) { throw err; }
            doc['set' + cName](content.toString());
        }));
    }).nThen(callback);
};

var handlePageDir = function (space, page, pageDir, pkg, callback) {

    var doc = XWiki.model.XWikiDoc.create([space, page]);
    var names;
    nThen(function (waitFor) {

        Fs.readdir(pageDir, waitFor(function (err, n) {
            if (err) { throw err; }
            names = n;
        }));

    }).nThen(function (waitFor) {

        if (names.indexOf('this.js') !== -1) {
            if (names.indexOf('this.xml') !== -1) {
                throw new Error(pageDir + ' cannot have both this.js and this.xml');
            }
            executeFile(pageDir+'/this.js', 'XWikiDoc', [doc, XWiki], waitFor());
        } else if (names.indexOf('this.xml') !== -1) {
            Fs.readFile(pageDir+'/this.xml', waitFor(function (err, content) {
                if (err) { throw err; }
                var json = XMHell.parse(content.toString());
                doc.fromJSON(json);
            }));
        }

    }).nThen(function (waitFor) {

        names.forEach(function (name) {
            switch (name) {
                case 'attachments': {
                    handleAttachmentDir(doc, pageDir+'/'+name, waitFor());
                    return;
                }

                case 'objects': {
                    handleObjectDir(doc, pageDir+'/'+name, waitFor());
                    return;
                }

                case 'this.js':
                case 'this.xml':
                    return;

                default: {
                    var file = pageDir+'/'+name;
                    // get rid of the filename extension
                    name = name.replace(/\.[^\.]*$/, '');
                    setPageField(doc, name, file, waitFor());
                }
            }
        });

    }).nThen(function (waitFor) {

        pkg.addDocument(doc);

    }).nThen(callback);

};

var handleXMLPage = function (space, page, pageFile, pkg, callback) {
    nThen(function (waitFor) {
        Fs.readFile(pageFile, waitFor(function(err, data) {
            if (err) { throw err; }
            var json = XMHell.parse(data.toString());
            var doc = XWiki.model.XWikiDoc.create([space, page]);
            doc.fromJSON(json);
            pkg.addDocument(doc);
        }));
    }).nThen(callback);
};

var handlePage = function (space, page, pageFile, pkg, callback) {
    nThen(function (waitFor) {
        if (/\.xml$/.test(pageFile)) {
            page = page.replace(/\.xml$/, '');
            handleXMLPage(space, page, pageFile, pkg, waitFor());
        } else {
            Fs.stat(pageFile, waitFor(function (err, stat) {
                if (err) { throw err; }
                if (!stat.isDirectory()) {
                    throw new Error("non-directory non-XML page definitions are not supported");
                }
                handlePageDir(space, page, pageFile, pkg, waitFor());
            }));
        }
    }).nThen(callback);
};

var assertNoDupes = function (pages) {
    var pagesHash = {};
    pages.forEach(function (page) {
        var pageNoExtent = page.replace(/\.[^\.]*$/,'');
        if (typeof(pagesHash[pageNoExtent]) !== 'undefined') {
            throw new Error("duplicate " + page + " " + pageNoExtent);
        }
        pagesHash[pageNoExtent] = page;
    });
};

var handleSpace = function (space, spaceDir, pkg, callback) {
    nThen(function (waitFor) {
        Fs.readdir(spaceDir, waitFor(function (err, pages) {
            if (err) { throw err; }
            assertNoDupes(pages);
            pages.forEach(function (page) {
                handlePage(space, page, spaceDir+'/'+page, pkg, waitFor());
            });
        }));
    }).nThen(callback);
};

var mkPackage = module.exports.mkPackage = function (wikiDir, pkg, callback) {
    var spaces;
    nThen(function (waitFor) {

        Fs.readdir(wikiDir, waitFor(function (err, sp) {
            if (err) { throw err; }
            spaces = sp;
        }));

    }).nThen(function (waitFor) {

        if (spaces.indexOf('this.js') > -1) {
            executeFile(wikiDir+'/this.js', 'Package', [pkg, XWiki], waitFor());
        }

        spaces.forEach(function (space) {
            if (space === 'this.js') { return; }
            handleSpace(space, wikiDir+'/'+space, pkg, waitFor());
        });

    }).nThen(callback);
};
