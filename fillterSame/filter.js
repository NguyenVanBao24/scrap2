const _ = require("lodash");

const Fillter = (data, type) => {
  return _.uniqBy(data, type);
};

const filteredData = (data, name) => {
  return _.filter(data, (item) => !item.address.includes(name));
};

const findElement = (data, name) => {
  const grouped = _.groupBy(data, key);

  // Tìm các nhóm có nhiều hơn một phần tử (trùng lặp)
  const duplicates = _.filter(grouped, (group) => group.length > 1);

  // Kết hợp tất cả các phần tử trùng lặp vào một mảng duy nhất
  return _.flatten(duplicates);
};

module.exports = {
  Fillter,
  filteredData,
};
