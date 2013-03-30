define(['fs'], function(Fs) {
    /** For use with json structures, XML serializer will call the returned function. */
    this.contentFromFile = function (fileName) {
        return function (writer, callback) {
            var stream = Fs.createReadStream(fileName);
            stream.on('data', function(data) { writer.write( String(data) ); });
            stream.on('end', function() { callback(); });
        };
    };
    return this;
})
