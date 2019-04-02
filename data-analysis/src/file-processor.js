const stream = require("stream");
const fs = require("fs");

const CharProcessStream = require("./char-process-stream");
const StreamToChar = require("./stream-to-char");

class FileProcessor extends stream.Writable {
  constructor(redis, options = {}) {
    options.objectMode = true;
    super(options);
    this.redis = redis;
  }

  _write(entryInfo, encoding, callback) {
    fs.createReadStream(entryInfo.fullPath)
      .pipe(new StreamToChar())
      .pipe(new CharProcessStream(this.redis))
      .on("error", callback)
      .on("finish", () => {
        console.log("Done with file :", entryInfo.path);
        callback();
      });
  }
}

module.exports = FileProcessor;
