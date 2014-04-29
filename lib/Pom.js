module.exports = {
  create: function() {
    var LGPL = "\n" +
        " *\n" +
        " * See the NOTICE file distributed with this work for additional\n" +
        " * information regarding copyright ownership.\n" +
        " *\n" +
        " * This is free software; you can redistribute it and/or modify it\n" +
        " * under the terms of the GNU Lesser General Public License as\n" +
        " * published by the Free Software Foundation; either version 2.1 of\n" +
        " * the License, or (at your option) any later version.\n" +
        " *\n" +
        " * This software is distributed in the hope that it will be useful,\n" +
        " * but WITHOUT ANY WARRANTY; without even the implied warranty of\n" +
        " * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU\n" +
        " * Lesser General Public License for more details.\n" +
        " *\n" +
        " * You should have received a copy of the GNU Lesser General Public\n" +
        " * License along with this software; if not, write to the Free\n" +
        " * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA\n" +
        " * 02110-1301 USA, or see the FSF site: http://www.fsf.org.\n" +
        " *\n";

    var self = {};
    var project = {
        modelVersion:"4.0.0",
        parent:{
            groupId:"org.xwiki.platform",
            artifactId:"xwiki-platform-core",
            version:"5.0-SNAPSHOT"
        },
        groupId:"org.xwiki.contrib",
        packaging:"xar",
        artifactId:"xwiki-contrib-tableedit",
        name:"XWiki - Contrib - XWiki.TableEdit",
        description:"An editor which allows you to edit XWiki tables as spreadsheets using Jquery.sheet.",
        version:"1.0",
        build: {
            plugins: {
                plugin: {
                    groupId:"org.xwiki.platform",
                    artifactId:"xwiki-platform-tool-xmldoc-update-plugin",
                    version:4.4,
                    executions: {}
                }
            }
        }
    };

    // Make setters and getters
    for (var key in project) {
        (function(that) {
            var k = key;
            var upperFirst = k[0].toUpperCase()+k.substring(1);
            that['set'+upperFirst] = function(val) { project[k] = val; };
            that['get'+upperFirst] = function(val) { return project[k]; };
        })(self);
    }

    var json = self.json = {
        '#COMMENT': LGPL,
    };
    json['project xmlns="http://maven.apache.org/POM/4.0.0" ' +
         'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
         'xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 ' +
         'http://maven.apache.org/maven-v4_0_0.xsd"'] = project;

    var addTag = function (obj, tag, val) {
        var j = 1;
        for (;obj[tag]; j++) { tag = tag.split(' ')[0] + " " + j; }
        obj[tag] = val;
        return j;
    };

    self.addAttachment = function(doc, filePath) {
        addTag(project.build.plugins.plugin.executions, "execution", {
            goals: { goal:"attach" },
            phase: "process-resources",
            id: filePath.replace(/[^a-zA-Z._-]/g, '_'),
            configuration: {
                sourceDocument: "${project.build.outputDirectory}/" +
                    doc.getWeb() + "/" + doc.getName() + ".xml",
                file: "${project.build.outputDirectory}/attachments/" + filePath,
            }
        });
    };

    return self;
  }
};
