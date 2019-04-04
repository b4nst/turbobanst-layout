const stream = require("stream");
const _ = require("lodash");
const constants = require("../helpers/constants");

const FLUSH_EVERY = 100000;

const souldCharBeCounted = _.memoize(char => !/\s/.test(char));

class CharProcessStream extends stream.Writable {
  constructor(redis, options = {}) {
    options.objectMode = true;
    super(options);
    this.redis = redis;
    this.pipeline = redis.pipeline();
    this.previousChar = "SoF";
  }

  _write(char, enconding, cb) {
    var pipeline = this.redis.pipeline();
    this._pushCharToPipeline(char);
    this._done(cb);
  }

  _writev(chunks, cb) {
    chunks.map(c => c.chunk).forEach(char => this._pushCharToPipeline(char));
    this._done(cb);
  }

  _final(cb) {
    this._flush()
      .then(cb)
      .catch(cb);
  }

  _pushCharToPipeline(char) {
    if (souldCharBeCounted(char)) {
      this.pipeline
        .zincrby("charcount", 1, "total")
        .zincrby("charcount", 1, char);

      if (souldCharBeCounted(this.previousChar)) {
        const bigram =
          char > this.previousChar
            ? `${this.previousChar}${constants.SPLIT_CHARACTER}${char}`
            : `${char}${constants.SPLIT_CHARACTER}${this.previousChar}`;
        this.pipeline
          .zincrby("bigram", 1, bigram)
          .zincrby(`bigram:${this.previousChar}`, 1, char)
          .zincrby(`bigram:${char}`, 1, this.previousChar);
      }
    }
    this.previousChar = char;
  }

  async _flush() {
    await this.pipeline.exec();
    this.pipeline = this.redis.pipeline();
    return null;
  }

  _done(cb) {
    if (this.pipeline.length < FLUSH_EVERY) cb(null);
    else
      this._flush()
        .then(cb)
        .catch(cb);
  }
}

module.exports = CharProcessStream;
