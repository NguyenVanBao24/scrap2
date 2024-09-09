const fs = require('fs');
const path = require('path');

const StorePath = (data, forderOfStorage, nameOfStorage) => {
  const directoryPath = path.join(__dirname, forderOfStorage);
  const sanitizedKeyword = (keyword) => keyword.replace(/[\s]/g, '_');
  const filePath = path.join(directoryPath, sanitizedKeyword(`${nameOfStorage}_results.json`));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = StorePath;
