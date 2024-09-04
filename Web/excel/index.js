const fs = require("fs");
const xlsx = require("xlsx");

const jsonData = require("../ok/final_results.json");

const worksheet = xlsx.utils.json_to_sheet(jsonData);

const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, "Data");

xlsx.writeFile(workbook, "output.xlsx");

console.log("Dữ liệu đã được xuất ra file output.xlsx");
