// index.js
const fs = require('fs');
const path = require('path');
const processUrl = require('./processUrl');

// Đọc file JSON chứa các URL
const data = require('../data/data_results.json');

// Hàm để đảm bảo thư mục tồn tại
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

// Hàm để lưu thông tin đã cập nhật vào file JSON
async function updateDataWithEmails() {
  for (const item of data) {
    const url = item.website;
    console.log(`Processing ${url}`);
    const email = await processUrl(url);
    if (email) {
      item.email = email; // Thêm email vào đối tượng
      console.log(`Found email: ${email}`);
    } else {
      item.email = null;
      console.log('No email found.');
    }
  }

  // Đảm bảo thư mục tồn tại
  const outputFilePath = path.join(__dirname, '../data/data_results_updated.json');
  ensureDirectoryExistence(outputFilePath);

  // Ghi dữ liệu đã cập nhật vào file JSON mới
  fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
  console.log('Data has been updated and saved.');
}

// Thực thi hàm
updateDataWithEmails();
