// const _ = require("lodash");
// const fs = require("fs");
// const CharProcessStream = require("./char-process-stream");
const FileProcessor = require("./file-processor");
const Redis = require("ioredis");

const redis = new Redis();

const readdirp = require("readdirp");

const parseData = () => {
  const entryInfoStream = readdirp({ root: "./resources" });

  entryInfoStream
    .on("warn", error => {
      console.error("non-fatal error", error);
    })
    .on("error", error => console.error("fatal error", error))
    .on("end", () => redis.quit().then(() => console.log("done")))
    .pipe(new FileProcessor(redis));
}

redis.flushall().then(() => parseData()).catch(console.error)