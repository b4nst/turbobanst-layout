const _ = require("lodash");
const fs = require("fs");
const CharProcessStream = require("./char-process-stream");
const StreamToChar = require("./stream-to-char");
const Redis = require("ioredis");
const e2p = require("event-to-promise");
const { Filter } = require("warp-pipes");

const redis = new Redis();

const processFile = async file => {
  const s2c = new StreamToChar();
  const cps = new CharProcessStream(redis);
  const isNotBlank = new Filter(c => !/\s/.test(c), { objectMode: true });

  const stream = fs
    .createReadStream(file)
    .pipe(s2c)
    .pipe(isNotBlank)
    .pipe(cps);
  return e2p(stream, "finish");
};

const processDir = async dir => {
  await redis.flushall();
  const filenames = fs.readdirSync(dir);
  const streamPromises = filenames.map(f => dir + f).map(processFile);
  return Promise.all(streamPromises);
};

processDir("./resources/")
  .then(_ => redis.quit())
  .then(res => console.log("Done :", res))
  .catch(err => console.error("Error", err));
