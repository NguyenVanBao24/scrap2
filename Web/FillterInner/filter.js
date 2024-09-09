const _ = require('lodash');

const Fillter = (data, type) => {
  return _.uniqBy(data, type);
};

const filteredData = (data, name, type) => {
  return _.filter(data, (item) => {
    return !item[type].includes(name);
  });
};

const findElementsDuplicate = (data, key) => {
  const grouped = _.groupBy(data, key);
  const duplicates = _.filter(grouped, (group) => group.length > 1);
  const duplicateValues = duplicates.map((group) => group[0][key]);
  return duplicateValues;
};

const filterDuplicates = (data, key, duplicateValues) => {
  const seen = new Set();

  return _.filter(data, (item) => {
    if (duplicateValues.includes(item[key])) {
      if (!seen.has(item[key])) {
        seen.add(item[key]);
        return true;
      }
      return false;
    }
    return true;
  });
};

module.exports = {
  Fillter,
  filteredData,
  findElementsDuplicate,
  filterDuplicates,
};
