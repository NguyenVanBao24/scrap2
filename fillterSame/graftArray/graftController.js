const { locationss } = require("../nameOfSearch");

const graftController = (forderData) => {
  let combinedData = [];

  for (let i = 0; i < locationss.length; i++) {
    const data_Advertsing = require(`./${forderData}/${locationss[i]}_results.json`);

    combinedData = [...combinedData, ...data_Advertsing];

    console.log(`finish in ${locationss[i]}`);
  }
  console.log(combinedData);
};

module.exports = { graftController };
