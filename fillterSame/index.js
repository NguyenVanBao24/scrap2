const { locationss, names } = require("./nameOfSearch");
const StorePath = require("./storePath2");
const { filteredData } = require("./filter");

const deleteNA = (name) => {
  for (let i = 0; i < locationss.length; i++) {
    const data_Advertsing = require(`./ok/${locationss[i]}_results.json`);
    const data = filteredData(data_Advertsing, name);
    StorePath(locationss[i], data);
    console.log(`finish in ${locationss[i]}`);
  }
};

deleteNA("N/A");
