const Redis = require("ioredis");
const fs = require("fs");
const util = require("util");
const getGraph = require("./get-graph");

const writeFile = util.promisify(fs.writeFile);
const redis = new Redis();

getGraph(redis)
  .then(graph => writeFile("build/data.json", JSON.stringify(graph)))
  .then(() => redis.quit())
  .then(() => console.log("Done"))
  .catch(console.error);
