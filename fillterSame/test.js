const data = [
  { id: 1, name: "John" },
  { id: 2, name: "John" },
  { id: 3, name: "Jane" },
  { id: 4, name: "Doe" },
  { id: 5, name: "Jane" },
];

const duplicateNames = ["John", "Jane"];
const _ = require("lodash");

const seen = new Set();
const filteredData = _.filter(data, (item) => {
  if (duplicateNames.includes(item.name)) {
    if (!seen.has(item.name)) {
      seen.add(item.name);
      return true;
    }
    return false;
  }
  return true;
});

console.log(filteredData);
