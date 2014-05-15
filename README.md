# XWiki Tools

xwiki-tools is a set of command line tools and a node.js library for building
and parsing parts of xwiki .xar files. It is unique in that it contains a
fairly complete model of XWiki documents, objects, and classes which is not
based on the original model in oldcore. It is capable of compiling a filesystem
representation of an xwiki extension such as: https://github.com/xwiki-contrib/realtime-wysiwyg
into either a Maven compatible directory structure or a .xar file (which can
optionally be auto-posted up to the rest interface of a running wiki).
