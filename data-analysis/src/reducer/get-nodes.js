module.exports = async redis => {
  const total = await redis.zscore("charcount", "total");
  const characters = await redis.zrevrange("charcount", 0, 62); // 61 inputs

  const nodesAsync = characters
    .filter(char => char !== "total")
    .map(async char => {
      const score = await redis.zscore("charcount", char);
      return {
        id: char,
        group: char.length > 1 ? 0 : 1,
        percentage: (score / total) * 100
      };
    });

  return Promise.all(nodesAsync);
};
