export const formatResultData = (results) =>
  results.reduce(
    (acc, current) => ({
      ...acc,
      [current.choice]: [...(acc[current.choice] || []), current.id],
    }),
    {}
  );

export const displayResultData = (results) => {
  const formatArray = results.reduce(
    (acc, current) => ({
      ...acc,
      [current.choice]: [...(acc[current.choice] || []), current.id],
    }),
    {}
  );
  return Object.keys(formatArray).map((val) => ({ name: val, data: formatArray[val].length }));
};
