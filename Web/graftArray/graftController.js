const { locationss } = require("../nameOfSearch");
const StorePath = require("../storePath");

const graftController = (forderData) => {
  let combinedData = [];
  // for (let i = 0; i < locationss.length; i++) {
  //   const data_Advertsing = require(`../${forderData}/${locationss[i]}_results.json`);
  //   combinedData = [...combinedData, ...data_Advertsing];
  //   StorePath("data_promotional", combinedData, "ok");
  //   console.log(`finish in ${locationss[i]}`);
  // }
  const data_Advertsing1 = require(`../ok/data_Advertising_results.json`);
  const data_Advertsing2 = require(`../ok/data_clothers_results`);
  const data_Advertsing3 = require(`../ok/data_maketing_results.json`);
  const data_Advertsing4 = require(`../ok/data_promotional_results.json`);
  combinedData = [
    ...combinedData,
    ...data_Advertsing1,
    ...data_Advertsing2,
    ...data_Advertsing3,
    ...data_Advertsing4,
  ];
  StorePath("final", combinedData, "ok");
};

module.exports = { graftController };
