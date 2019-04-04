const Redis = require("ioredis");
const fs = require("fs");
const util = require("util");
const getAndReduce = require("./get-and-reduce");
const buildGraph = require("./build-graph");

const writeFile = util.promisify(fs.writeFile);
const redis = new Redis();

getAndReduce(redis)
  .then(buildGraph)
  .then(graph => writeFile("build/data.json", JSON.stringify(graph)))
  .then(() => redis.quit())
  .then(() => console.log("Done"))
  .catch(console.error);
