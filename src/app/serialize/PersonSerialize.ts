import { getAge } from "../utils/dates";

const serialize = ({ id, name, sex, birthday, city_id }) => ({
  id,
  name,
  gender: sex,
  birthday,
  age : getAge(birthday),
  city_id,
});

const serializePeople = (docs, totalDocs) => ({
  people: docs.map(serialize),
  total: totalDocs,
});
export { serializePeople, serialize };
