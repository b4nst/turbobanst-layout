const constants = require("../helpers/constants");

module.exports = reducedResult => {
  const graph = {};
  graph.nodes = reducedResult.charWithScore.map(cws => ({
    id: cws.char,
    group: /\w/.test(cws.char) ? 0 : 1,
    percentage: cws.weight
  }));

  graph.links = reducedResult.bigramsWithScore
    .map(bws => {
      const [source, target] = bws.bigram.split(constants.SPLIT_CHARACTER);
      return {
        source,
        target,
        value: bws.score / reducedResult.maxBigramCount
      };
    })
    .filter(bws => bws.value >= 0.01)
    .sort((a, b) => b.value - a.value);

  return graph;
};
