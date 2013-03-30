"use strict";

var Fs = require ("fs");
var XWiki = require ("../index");
var BufferedWriter = require('buffered-writer');
var nThen = require('nthen');
var Crypto = require('crypto');

exports.test_addAttachment = function (test, assert)
{
    var doc = new XWiki.model.XWikiDoc(['Main', 'WebHome']);

    var rand;
    nThen(function(waitFor) {
        var bytes = Math.floor(Math.random() * 100) + 1000; // 1000000;
        //console.log(bytes);
        Crypto.pseudoRandomBytes(bytes, waitFor(function(ex, r) {
            if (ex) { throw ex; }
            rand = r.toString('base64').replace(/(.{100})/g, function(a) { return a+'\n'; });
        }));
    }).nThen(function(waitFor) {
        Fs.writeFile("temp.txt", rand, waitFor());
    }).nThen(function(waitFor) {
        doc.addAttachment("temp.txt");
        var stream = BufferedWriter.open("temp.xml");
        XWiki.XML.write(doc.json, stream, waitFor(function() {
            stream.close(waitFor());
        }));
    }).nThen(function(waitFor) {
        Fs.readFile("temp.xml", waitFor(function (err, data) {
            if (err) { throw err; }
            var str = data.toString();
            var json = XWiki.XML.read(str);
            var content = new Buffer(json.xwikidoc.attachment.content, 'base64');
            assert.equal(rand, String(content));
            test.finish();
        }));
    });
};

exports.tearDown = function (test, assert) {
    Fs.unlink("temp.xml");
    Fs.unlink("temp.txt");
    test.finish();
};
