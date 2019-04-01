const stream = require("stream");

class CharProcessStream extends stream.Writable {
  constructor(redis, options = {}) {
    options.objectMode = true;
    super(options);
    this.redis = redis;
    this.previousChar = "SoF";
  }

  _write(char, enconding, cb) {
    var pipeline = this.redis.pipeline();
    this._pushCharToPipeline(char, pipeline).exec(cb);
  }

  _writev(chunks, cb) {
    chunks
      .map(c => c.chunk)
      .reduce(
        (acc, curr) => this._pushCharToPipeline(curr, acc),
        this.redis.pipeline()
      )
      .exec(cb);
  }

  _pushCharToPipeline(char, pipeline) {
    var result = pipeline
      .zincrby("charcount", 1, char)
      .zincrby("charcount", 1, "total")
      .zincrby(`bigram:${char}`, 1, this.previousChar)
      .zincrby(`bigram:${this.previousChar}`, 1, char);
    this.previousChar = char;
    return result;
  }
}

module.exports = CharProcessStream;
