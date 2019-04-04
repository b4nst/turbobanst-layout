const _ = require("lodash");
const constants = require("../helpers/constants");

const bigramBuilder = (left, index, collection) =>
  collection
    .slice(index)
    .map(right => `${left}${constants.SPLIT_CHARACTER}${right}`);

module.exports = async redis => {
  const countOccurences = parseFloat(await redis.zscore("charcount", "total"));
  const characters = await redis.zrevrangebyscore(
    "charcount",
    countOccurences - 1, // Ignore the total
    countOccurences * 0.01 // Keep only chracter that are typed at least 1% of total
  );

  const charWithScore = await Promise.all(
    characters.map(async char => {
      const score = parseFloat(await redis.zscore("charcount", char));
      const weight = (score / countOccurences) * 100;
      return {
        char,
        weight
      };
    })
  );

  const possibleBigrams = _.chain(characters)
    .sort()
    .flatMap(bigramBuilder)
    .value();

  const bigramsWithScore = await possibleBigrams.reduce(
    async (accP, bigram) => {
      const acc = await accP;
      const score = parseFloat(await redis.zscore("bigram", bigram));
      if (score) {
        acc.push({ bigram, score });
      }
      return acc;
    },
    Promise.resolve([])
  );

  const maxBigramCount = _.chain(bigramsWithScore)
    .map("score")
    .max()
    .value();

  return { charWithScore, bigramsWithScore, maxBigramCount };
};
