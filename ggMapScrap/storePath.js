const fs = require('fs');
const path = require('path');
const { Fillter } = require('./fillter');

const StorePath = (keyword, results) => {
  const directoryPath = path.join(__dirname, 'data');
  const sanitizedKeyword = (keyword) => keyword.replace(/[\s]/g, '_');
  const filePath = path.join(directoryPath, sanitizedKeyword(`${keyword}_results.json`));

  const filteredResults = results.filter((result) => result.title);
  const fillter = Fillter(filteredResults);

  fs.writeFileSync(filePath, JSON.stringify(fillter, null, 2));
};

module.exports = StorePath;
