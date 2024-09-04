const fs = require("fs");
const path = require("path");

const StorePath = (keyword, results) => {
  const directoryPath = path.join(__dirname, `ok`);
  const sanitizedKeyword = (keyword) => keyword.replace(/[\s]/g, "_");
  const filePath = path.join(directoryPath, sanitizedKeyword(`${keyword}_results.json`));

  fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
};

module.exports = StorePath;
