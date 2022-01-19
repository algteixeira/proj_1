const serialize = ({ id, name, state }) => ({ id, name, state });

const serializeCity = (docs, totalDocs) => ({
  cities: docs.map(serialize),
  total: totalDocs,
});
export { serializeCity };
