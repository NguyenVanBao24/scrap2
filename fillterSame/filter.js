const _ = require("lodash");

const Fillter = (data, type) => {
  return _.uniqBy(data, type);
};

module.exports = {
  Fillter,
};
