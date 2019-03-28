const stream = require('stream');
const { Map } = require('warp-pipes');
const fs = require('fs');

const CharProcessStream = require('./char-process-stream');
const StreamToChar = require('./stream-to-char');

const replaceBlank = char => {
    switch (char) {
        case ' ' : return 'space'
        case '\n' : return 'cr'
        case '\t' : return 'tab'
        default: return char;
    }
}

class FileProcessor extends stream.Writable {
  constructor(redis, options = {}) {
    options.objectMode = true;
    super(options);
    this.redis = redis
  }

  _write(entryInfo, encoding, callback) {
    fs.createReadStream(entryInfo.fullPath)
      .pipe(new StreamToChar())
      .pipe(new Map(replaceBlank, { objectMode: true })) // replace blank char
      .pipe(new CharProcessStream(this.redis))
      .on('error', callback)
      .on('finish', () => {
          console.log('Done with file :', entryInfo.path)
          callback();
        });
  }
}

module.exports = FileProcessor;