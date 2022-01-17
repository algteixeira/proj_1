import moment from 'moment';
const getAge = date => {
  date = moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY');
  date = moment(date, 'DD/MM/YYYY').toISOString();
  const age = moment().diff(date, 'years');
  return age;
};

export { getAge };
