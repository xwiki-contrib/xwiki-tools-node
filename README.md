# XWiki Tools

[![XWiki labs logo](https://raw.githubusercontent.com/xwiki-labs/xwiki-labs-logo/master/projects/xwikilabs/xlabs-project.png "XWiki labs")](https://labs.xwiki.com/xwiki/bin/view/Main/WebHome)

Toolchain for building and dumping XWiki Archive (`xar`) files.

## Intallation

With nodejs and npm installed, use:

    sudo npm install -g xwiki-tools

## Workflow

Dump a page from a running wiki to a directory structure

    xardump <user>:<password>@<wiki hostname>:<wiki port>/<wiki export path>
    Example: xardump Admin:admin@blk1:8080/xwiki/wiki/xwiki/export/Main/WebHome

Build an XWiki Archive from directory structure

    xargen

Build an XWiki Archive and auto-import it into a running XWiki instance

    xargen --post <user>:<password>@<wiki hostname>:<wiki port>/<wiki rest import path>
    Example: xargen --post Admin:admin@blk1:8080/xwiki/rest/wikis/xwiki

## Workflow Example

Dump xar from running subwiki (named wiki1):

```
user@toshitba:~/Desktop/test$ rm ./* -rf
user@toshitba:~/Desktop/test$ xardump Admin:admin@blk1:8080/xwiki/wiki/wiki1/export/Main/WebHome
query: Admin:admin@blk1:8080//xwiki/wiki/wiki1/export/Main/WebHome?name=x&pages=Main.WebHome
STATUS: 200
HEADERS: {"server":"Apache-Coyote/1.1","set-cookie":["JSESSIONID=B630723680EB9BA8CEF6CACD9E41E196; Path=/xwiki/; HttpOnly"],"content-disposition":"attachment; filename=x.xar","content-type":"application/zip;charset=ISO-8859-1","content-language":"en","transfer-encoding":"chunked","date":"Tue, 31 Mar 2015 14:16:59 GMT"}
writeDir: /home/user/Desktop/test/src
writeDir: /home/user/Desktop/test/src/xwiki
writeDir: /home/user/Desktop/test/src/xwiki/Main
writeDir: /home/user/Desktop/test/src/xwiki/Main/WebHome
writeDir: /home/user/Desktop/test/src/xwiki/Main/WebHome/objects
writeDir: /home/user/Desktop/test/src/xwiki/Main/WebHome/objects/XWiki.EditModeClass_1
writeFile: /home/user/Desktop/test/src/xwiki/Main/WebHome/objects/XWiki.EditModeClass_1/this.js
writeDir: /home/user/Desktop/test/src/xwiki/Main/WebHome/attachments
writeFile: /home/user/Desktop/test/src/xwiki/Main/WebHome/attachments/xwiki-logo.png
writeFile: /home/user/Desktop/test/src/xwiki/Main/WebHome/this.js
writeFile: /home/user/Desktop/test/src/xwiki/Main/WebHome/content.xwiki20
writeDir: /home/user/Desktop/test/src/classes
writeFile: /home/user/Desktop/test/src/classes/XWiki.EditModeClass.js
done
user@toshitba:~/Desktop/test$ 
```

Edit content:

```
user@toshitba:~/Desktop/test$ echo 'HAI MOM' >> ./src/xwiki/Main/WebHome/content.xwiki20
```

Re-Package:

```
user@toshitba:~/Desktop/test$ xargen
ran ./src//classes//XWiki.EditModeClass.js
ran ./src/xwiki/this.js
ran ./src//xwiki/Main/WebHome/this.js
attachment ./src//xwiki/Main/WebHome/attachments/xwiki-logo.png
obj ./src//xwiki/Main/WebHome/objects/XWiki.EditModeClass_1
ran ./src//xwiki/Main/WebHome/objects/XWiki.EditModeClass_1/this.js
/tmp/xwiki-tools-genxar115231-14509-1j2gifu/package.xml Generating
package.xml Compressing
package.xml Complete
/tmp/xwiki-tools-genxar115231-14509-1j2gifu/Main/WebHome.xml Generating
Main/WebHome.xml Compressing
Main/WebHome.xml Complete
user@toshitba:~/Desktop/test$ ls
i-forgot-to-edit-src-slash-xwiki-slash-this-dot-js.xar  src
user@toshitba:~/Desktop/test$ 
```

Package and auto-post to subwiki (called wiki1):

```
user@toshitba:~/Desktop/test$ xargen --post Admin:admin@blk1:8080/xwiki/rest/wikis/wiki1
ran ./src//classes//XWiki.EditModeClass.js
ran ./src/xwiki/this.js
ran ./src//xwiki/Main/WebHome/this.js
attachment ./src//xwiki/Main/WebHome/attachments/xwiki-logo.png
obj ./src//xwiki/Main/WebHome/objects/XWiki.EditModeClass_1
ran ./src//xwiki/Main/WebHome/objects/XWiki.EditModeClass_1/this.js
/tmp/xwiki-tools-genxar115231-15382-1xl6muj/package.xml Generating
package.xml Compressing
package.xml Complete
/tmp/xwiki-tools-genxar115231-15382-1xl6muj/Main/WebHome.xml Generating
Main/WebHome.xml Compressing
Main/WebHome.xml Complete
Posting to [blk1]:8080/xwiki/rest/wikis/wiki1?backup=true&history=RESET
STATUS: 200
HEADERS: {"set-cookie":["JSESSIONID=444CF64309319D262CCC7E8090F0DF52; Path=/xwiki/; HttpOnly"],"date":"Tue, 31 Mar 2015 14:21:00 GMT","accept-ranges":"bytes","server":"Restlet-Framework/2.0.14","xwiki-user":"XWiki.XWikiGuest","xwiki-version":"6.0-SNAPSHOT","content-type":"application/xml;charset=UTF-8","content-language":"en","transfer-encoding":"chunked"}
BODY: <?xml version="1.0" encoding="UTF-8" standalone="yes"?><wiki xmlns="http://www.xwiki.org"><link href="http://blk1:8080/xwiki/rest/wikis/wiki1/spaces" rel="http://www.xwiki.org/rel/spaces"/><link href="http://blk1:8080/xwiki/rest/wikis/wiki1/classes" rel="http://www.xwiki.org/rel/classes"/><link href="http://blk1:8080/xwiki/rest/wikis/wiki1/modifications" rel="http://www.xwiki.org/rel/modifications"/><link href="http://blk1:8080/xwiki/rest/wikis/wiki1/search" rel="http://www.xwiki.org/rel/search"/><link href="http://blk1:8080/xwiki/rest/wikis/wiki1/query" rel="http://www.xwiki.org/rel/query"/><id>wiki1</id><name>wiki1</name></wiki>
user@toshitba:~/Desktop/test$
```
