const getLinks = require("./get-links");
const getNodes = require("./get-nodes");

module.exports = async redis => {
  const graph = {};
  graph.nodes = await getNodes(redis);
  graph.links = await getLinks(redis);

  return graph;
};
