const { findElementsDuplicate } = require("../FillterInner/filter");
const final_results = require("../ok/final_results.json");

const findElementsDup = () => {
  let arrE = [];
  const result = findElementsDuplicate(final_results, "name");
  arrE = [...arrE, ...result];
  return arrE;
};

findElementsDup();
