const stream = require("stream");

class StreamToChar extends stream.Transform {
  constructor(options = {}) {
    options.readableObjectMode = true;
    options.writableObjectMode = false;
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const chars = Array.from(chunk.toString().toLowerCase());
    chars.forEach(c => this.push(c));
    callback();
  }
}

module.exports = StreamToChar;
