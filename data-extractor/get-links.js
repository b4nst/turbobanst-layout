module.exports = async redis => {
  const [mostPopularBigram] = await redis.zrevrange("bigram", 0, 0);
  const bestScore = await redis.zscore("bigram", mostPopularBigram);
  const bigrams = await redis.zrevrangebyscore(
    "bigram",
    bestScore,
    bestScore * 0.1
  );

  const bigramsAsync = bigrams.map(async bigram => {
    const score = await redis.zscore("bigram", bigram);
    const [source, target] = bigram.split(":");

    return {
      source,
      target,
      value: (score / bestScore) * 100
    };
  });

  return Promise.all(bigramsAsync);
};
