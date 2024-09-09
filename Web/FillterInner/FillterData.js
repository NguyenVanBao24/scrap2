const { Fillter, filteredData, findElementsDuplicate, filterDuplicates } = require('./filter');
const { locationss } = require('../nameOfSearch');
const StorePath = require('../storePath');
const StorePath2 = require('../../fillterSame/storePath2');

const final_results = require('../ok/final_results.json');

const filter = (forderData) => {
  for (let i = 0; i < locationss.length; i++) {
    const data_Advertsing = require(`../${forderData}/${locationss[i]}_results.json`);
    const data = Fillter(data_Advertsing, 'name');
    StorePath(locationss[i], data, forderData);
    console.log(`finish in ${locationss[i]}`);
  }
};

const deleteNA = (keyword, forderData, type) => {
  for (let i = 0; i < locationss.length; i++) {
    const data_Advertsing = require(`../${forderData}/${locationss[i]}_results.json`);
    const data = filteredData(data_Advertsing, keyword, type);
    StorePath(locationss[i], data, forderData);
    console.log(`finish in ${locationss[i]}`);
  }
};

// mảng tên các trùng trong file result
const findElementsDup = (data, type) => {
  let arrE = [];
  const result = findElementsDuplicate(data, type);
  arrE = [...arrE, ...result];
  return arrE;
};

//  xoá các phần tử trùng
const deleteDuplicate = (forderData) => {
  const ElementsDup = findElementsDup(final_results, 'name');
  console.log(ElementsDup);

  for (let i = 0; i < locationss.length; i++) {
    const data_Advertsing = require(`../${forderData}/${locationss[i]}_results.json`);
    const data = filterDuplicates(data_Advertsing, 'name', ElementsDup);

    StorePath(locationss[i], data, forderData);
    console.log(`finish in ${locationss[i]}`);
  }
};

const addLocation = (forderData) => {
  for (let i = 0; i < locationss.length; i++) {
    const data_Advertsing = require(`../${forderData}/${locationss[i]}_results.json`);

    const data = data_Advertsing.map((els) => {
      return { ...els, location: `${locationss[i]}` };
    });

    StorePath(locationss[i], data, forderData);
    console.log(`finish in ${locationss[i]}`);
  }
};

module.exports = {
  filter,
  deleteNA,
  deleteDuplicate,
  addLocation,
};
