const _ = require('lodash');

const Fillter = (data) => {
  return _.uniqBy(data, 'title');
};

module.exports = {
  Fillter,
};
