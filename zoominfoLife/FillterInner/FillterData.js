const { Fillter, filteredData, findElementsDuplicate, filterDuplicates } = require('./filter');
const { locationss } = require('../nameOfSearch');
const StorePath = require('../storePath');
const StorePath2 = require('../../fillterSame/storePath2');

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
const removeDuplicates = (data, key) => {
  const seen = new Set();

  return data.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false; // Loại bỏ phần tử trùng lặp
    } else {
      seen.add(keyValue); // Thêm giá trị mới vào Set
      return true; // Giữ phần tử đầu tiên
    }
  });
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
  removeDuplicates,
  addLocation,
  findElementsDup,
};
