const { Fillter } = require("./filter");
const { locationss, names } = require("../Web/nameOfSearch");
const StorePath = require("./storePath");
const dataFillter = [];
for (let i = 0; i < locationss.length; i++) {
  const data_Advertsing = require(`./ok/${locationss[i]}_results.json`);
  const data = Fillter(data_Advertsing, "name");
  StorePath(locationss[i], data);
}
