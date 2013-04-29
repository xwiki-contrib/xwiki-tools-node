"use strict";

var Fs = require("fs");
var XWiki = require("../index");
var ASSERT = require('assert');
var XMHell = require('xmhell');

var xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<xwikidoc>',
    '  <web>Main</web>',
    '  <name>WebHome</name>',
    '  <language />',
    '  <defaultLanguage />',
    '  <translation>0</translation>',
    '  <parent>xwiki:XWiki.WebHome</parent>',
    '  <creator>xwiki:XWiki.Admin</creator>',
    '  <author>xwiki:XWiki.Admin</author>',
    '  <customClass />',
    '  <contentAuthor>xwiki:XWiki.Admin</contentAuthor>',
    '  <creationDate>1357694025000</creationDate>',
    '  <date>1357696926000</date>',
    '  <contentUpdateDate>1357696926000</contentUpdateDate>',
    '  <version>1.1</version>',
    '  <title />',
    '  <template />',
    '  <defaultTemplate />',
    '  <validationScript />',
    '  <comment />',
    '  <minorEdit>false</minorEdit>',
    '  <syntaxId>xwiki/2.1</syntaxId>',
    '  <hidden>false</hidden>',
    '  <content />',
    '  <attachment>',
    '    <filename>temp.txt</filename>',
    '    <filesize>1628</filesize>',
    '    <author>XWiki.Admin</author>',
    '    <date>1364415417000</date>',
    '    <version>1.1</version>',
    '    <comment />',
    '    <content>RnQ3c3BwUVp0R1lTQkU3QXkxcDlKMXEyZkt2dTFkSG44eWRnMGxwU0l5MnpWY2pQU3hDSzVxZ3dXOW5xUnFJ',
    'd1BrcXQ0RWV1WnpQcVc3YzBobTdHdDNDY3RNQ3lPM0NrWjZ5MWNVdnViZE9oTnhIblN0N3J6QUdGdWpkKzF2',
    'SW82aHNLZmxSU2xkOWNvY3NLL09zVkg5MS9VM3F6Qm9ZMldFVWZCVmN2RXNmalZ0R3JCbVFIQ09ZNWhQS2M1',
    'ME1xYXZBK3ZZd2s0ZVk0dzdkdjUvZ1VOdmltNkpTZmt4dFBTdEZUZG1DVmFjbUsyQnFRbWNVTmJWc1ljOVda',
    'OC9kWWtIUlNvbHkwK1NKY0wzZ251clNMSlhiT1hwZDlqVERPQ3BaU0x0T1BXOWJUUjVPbzg2VlVjNTNva0Y5',
    'Y20vRWpSeDRCMmhUb0RmRmdCSEtJMWJrVTM0dEkrUFRKVDBIMllOMGJ6NjlFTkY3TnFJcnEyU1NtbmpvV3gx',
    'N1hkbENkblRsVWhyYlYvOUJFejVacERUN2VzdDhxYmcvRmFmaGUxdU9WYmdLbW1BcVRjUXhOUGNjZzVJOUlw',
    'REtrRzRuWU42MmNSY0o0NSs3cHZEblJwVUJvK3JBYUFQcG5pT04rVmYxa2pMLzhpMUtIOU9SblJDZmJsTTVx',
    'cVBPNjZTejZOYzlLb3VCZUw1YWtEa0NtMzhZbXZqL1Vsb2RaYlZ4aUppTzdoZUhQZ0NuQmwwa1Z1dWcraVdN',
    'SXcyY3Z5NHZVaWVaR01aWXJRbXJ4ZzZhVDlBN2k3ZGdYVmwyWHJmSUFSazVxdlhSdHZJT3d3Kzc5RmpLQThj',
    'N2RBRjJQOWp2Nkx3Q0lVSy94VEhjZ2hvUTBEUEMydHZZMFNEeEtiM1ZFMUtDNDVEeDUwSTdhOFBqaVhBVGRW',
    'bi96Ull1TkFvN0Ivd0E5YVVrY2RMbE1MSENYZlZ5bnZWdDhsTWNDSGxrdXhudk04QTZNVklTcDY4Y0h6SVN2',
    'ZlZpNDBQRXNqcEEzVHR5bWhZUVNnVDAyajlJbGpQQVZoTElvQzRJeXJYNDgxOHdQd1hEc0UyeE9mNmZLRW5I',
    'M0pIU2dwQWYwL1FOcU0yWElKN1VBWXd5cjkyQkFHYmJpaWdLUERHanYzN3lQWGppUnJGaklDdlc3Njl1TDlD',
    'eTJHWXFkZlljelZHY0dWMTlXdit2bHAvTDlDWjhyQTJJWUNFd3E5V1lPYklDdXQ3ZkxuOEhjTjdQUDVVWCtn',
    'RTJTc1pab1ZQRklkemREZXBIZzlPekVRdWZmYm9DSXAwSjlZWCs5U29NZEpsUFNLNVVmZWgrcWV1cEFGTkpk',
    'cXpJU3RpOHJaQzVuQTYxQnBMTE1kUXY3QXlhVVp1Q2pmUVpTM3ZqNUc0YXh6QnJMQzhkWVpQdUIzdWwvTURy',
    'VUxzV3pBUGxuclVrN3B5RU9ES29yNzdsQkJHa1M1S3g4UnpRbHJqaGtTTzNrNm5BZFdONHpJNnVvKzRFeWdn',
    'L1VCSWhuMEZIeUVXTUxSQUdnNGZ2VEtxVDhpcUlObkNVOW0yZFRobFVCM0d1ZXZTRGNqL2N4dWtYVW5XY01I',
    'cW1OOU9LWTFndjNLMEdiQVpLcWQ4Z0x1djdLWVpoTDBiaE94Vk8yTENmVStvQ1UrQWUwREs2VDhtM3Z3ZnJt',
    'Q0s1VXFIemYwemRFNVlDdzZLd3htMDFLSE1yS3hGdHJ1TFQ2Ky90YjJYRlB0clNKdkdBY1JZR2xPOGxreThL',
    'WGVmRlRMTkE5SGt6dHBGQ2xsYWt6Zk9Ya01lNmdzZUxBSFpsS21Ka0h3QmNpUVlRamVJSVZ4emhHMjlZd2F0',
    'bEc3SFM5WmN4NTZqY3QwYXBMUzJKZzJtdXE4eVFuVTBHYVl6dXVmcjRxVlJ6clQ1RXZuaDM0L2U5TTBtV1NT',
    'RG5GUVBXdHNlcWxOVGRBRlhVYW5ROEY2b2dTMEFjUWRDUzhSdzAxbjl1NE1WUmhndDQyWVp3TTh0MmxQVDdU',
    'bTJpZURXZTcySzUwSXNXKy9vcVBPRTl4TS9GVWJjSThOWGlvamVod01ZUGYreFBTTDFwN3RtR0JGdU02djJJ',
    'ZnFEaTBCY0Y3NjY4U0c4clY2czdmSjBxTUcyYkpTaVFWWU1SQ1kwZ0gwWXA2RGhBSlZRPT0=',
    '</content>',
    '  </attachment>',
    '</xwikidoc>\n'
].join('\n');

var json = {
    "xwikidoc": {
        "web": "Main",
        "name": "WebHome",
        "language": "",
        "defaultLanguage": "",
        "translation": "0",
        "parent": "xwiki:XWiki.WebHome",
        "creator": "xwiki:XWiki.Admin",
        "author": "xwiki:XWiki.Admin",
        "customClass": "",
        "contentAuthor": "xwiki:XWiki.Admin",
        "creationDate": "1357694025000",
        "date": "1357696926000",
        "contentUpdateDate": "1357696926000",
        "version": "1.1",
        "title": "",
        "template": "",
        "defaultTemplate": "",
        "validationScript": "",
        "comment": "",
        "minorEdit": "false",
        "syntaxId": "xwiki/2.1",
        "hidden": "false",
        "content": "",
        "attachment": {
            "filename": "temp.txt",
            "filesize": "1628",
            "author": "XWiki.Admin",
            "date": "1364415417000",
            "version": "1.1",
            "comment": "",
            "content": [
                "RnQ3c3BwUVp0R1lTQkU3QXkxcDlKMXEyZkt2dTFkSG44eWRnMGxwU0l5MnpWY2pQU3hDSzVxZ3dXOW5xUnFJ",
                "d1BrcXQ0RWV1WnpQcVc3YzBobTdHdDNDY3RNQ3lPM0NrWjZ5MWNVdnViZE9oTnhIblN0N3J6QUdGdWpkKzF2",
                "SW82aHNLZmxSU2xkOWNvY3NLL09zVkg5MS9VM3F6Qm9ZMldFVWZCVmN2RXNmalZ0R3JCbVFIQ09ZNWhQS2M1",
                "ME1xYXZBK3ZZd2s0ZVk0dzdkdjUvZ1VOdmltNkpTZmt4dFBTdEZUZG1DVmFjbUsyQnFRbWNVTmJWc1ljOVda",
                "OC9kWWtIUlNvbHkwK1NKY0wzZ251clNMSlhiT1hwZDlqVERPQ3BaU0x0T1BXOWJUUjVPbzg2VlVjNTNva0Y5",
                "Y20vRWpSeDRCMmhUb0RmRmdCSEtJMWJrVTM0dEkrUFRKVDBIMllOMGJ6NjlFTkY3TnFJcnEyU1NtbmpvV3gx",
                "N1hkbENkblRsVWhyYlYvOUJFejVacERUN2VzdDhxYmcvRmFmaGUxdU9WYmdLbW1BcVRjUXhOUGNjZzVJOUlw",
                "REtrRzRuWU42MmNSY0o0NSs3cHZEblJwVUJvK3JBYUFQcG5pT04rVmYxa2pMLzhpMUtIOU9SblJDZmJsTTVx",
                "cVBPNjZTejZOYzlLb3VCZUw1YWtEa0NtMzhZbXZqL1Vsb2RaYlZ4aUppTzdoZUhQZ0NuQmwwa1Z1dWcraVdN",
                "SXcyY3Z5NHZVaWVaR01aWXJRbXJ4ZzZhVDlBN2k3ZGdYVmwyWHJmSUFSazVxdlhSdHZJT3d3Kzc5RmpLQThj",
                "N2RBRjJQOWp2Nkx3Q0lVSy94VEhjZ2hvUTBEUEMydHZZMFNEeEtiM1ZFMUtDNDVEeDUwSTdhOFBqaVhBVGRW",
                "bi96Ull1TkFvN0Ivd0E5YVVrY2RMbE1MSENYZlZ5bnZWdDhsTWNDSGxrdXhudk04QTZNVklTcDY4Y0h6SVN2",
                "ZlZpNDBQRXNqcEEzVHR5bWhZUVNnVDAyajlJbGpQQVZoTElvQzRJeXJYNDgxOHdQd1hEc0UyeE9mNmZLRW5I",
                "M0pIU2dwQWYwL1FOcU0yWElKN1VBWXd5cjkyQkFHYmJpaWdLUERHanYzN3lQWGppUnJGaklDdlc3Njl1TDlD",
                "eTJHWXFkZlljelZHY0dWMTlXdit2bHAvTDlDWjhyQTJJWUNFd3E5V1lPYklDdXQ3ZkxuOEhjTjdQUDVVWCtn",
                "RTJTc1pab1ZQRklkemREZXBIZzlPekVRdWZmYm9DSXAwSjlZWCs5U29NZEpsUFNLNVVmZWgrcWV1cEFGTkpk",
                "cXpJU3RpOHJaQzVuQTYxQnBMTE1kUXY3QXlhVVp1Q2pmUVpTM3ZqNUc0YXh6QnJMQzhkWVpQdUIzdWwvTURy",
                "VUxzV3pBUGxuclVrN3B5RU9ES29yNzdsQkJHa1M1S3g4UnpRbHJqaGtTTzNrNm5BZFdONHpJNnVvKzRFeWdn",
                "L1VCSWhuMEZIeUVXTUxSQUdnNGZ2VEtxVDhpcUlObkNVOW0yZFRobFVCM0d1ZXZTRGNqL2N4dWtYVW5XY01I",
                "cW1OOU9LWTFndjNLMEdiQVpLcWQ4Z0x1djdLWVpoTDBiaE94Vk8yTENmVStvQ1UrQWUwREs2VDhtM3Z3ZnJt",
                "Q0s1VXFIemYwemRFNVlDdzZLd3htMDFLSE1yS3hGdHJ1TFQ2Ky90YjJYRlB0clNKdkdBY1JZR2xPOGxreThL",
                "WGVmRlRMTkE5SGt6dHBGQ2xsYWt6Zk9Ya01lNmdzZUxBSFpsS21Ka0h3QmNpUVlRamVJSVZ4emhHMjlZd2F0",
                "bEc3SFM5WmN4NTZqY3QwYXBMUzJKZzJtdXE4eVFuVTBHYVl6dXVmcjRxVlJ6clQ1RXZuaDM0L2U5TTBtV1NT",
                "RG5GUVBXdHNlcWxOVGRBRlhVYW5ROEY2b2dTMEFjUWRDUzhSdzAxbjl1NE1WUmhndDQyWVp3TTh0MmxQVDdU",
                "bTJpZURXZTcySzUwSXNXKy9vcVBPRTl4TS9GVWJjSThOWGlvamVod01ZUGYreFBTTDFwN3RtR0JGdU02djJJ",
                "ZnFEaTBCY0Y3NjY4U0c4clY2czdmSjBxTUcyYkpTaVFWWU1SQ1kwZ0gwWXA2RGhBSlZRPT0=\n"
            ].join('\n'),
        }
    }
};

exports.test_read = function (test, assert) {
    var parsed = XMHell.parse(xml);
    //assert.deepEqual(parsed, json);
    test.finish();
};

exports.test_write = function (test, assert) {
    var out = '';
    var w = { write: function(content) { out += content; } };
    XMHell.write(json, w, function() {
        //console.log("["+out+"]");
        assert.equal(out, xml);
        test.finish();
    });
};
