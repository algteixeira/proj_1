const serialize = ({ id, name, sex, birthday, age, city_id }) => ({ id, name, gender: sex, birthday, age, city_id });

const serializePeople = ( docs, totalDocs ) => ({
  People: docs.map(serialize),
  total: totalDocs
});
export { serializePeople };