const serialize = ({ id, name, state }) => ({ id, name, state });

const serializeCity = (docs, totalDocs) => ({
  Cities: docs.map(serialize),
  total: totalDocs,
});
export { serializeCity };
