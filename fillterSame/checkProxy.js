const puppeteer = require('puppeteer');
const ProxyList = require('proxy-list');

const checkProxy = async () => {
  // Khởi tạo ProxyList và cập nhật danh sách proxy
  const proxyList = new ProxyList();
  await proxyList.update();

  // Lấy proxy đầu tiên từ danh sách
  const proxy = proxyList.get().shift(); // Hoặc dùng bất kỳ proxy nào bạn muốn

  if (!proxy) {
    console.log('Không tìm thấy proxy nào trong danh sách.');
    return;
  }

  console.log(`Đang sử dụng proxy: ${proxy}`);

  // Khởi tạo trình duyệt Puppeteer với proxy
  const browser = await puppeteer.launch({
    args: [`--proxy-server=${proxy}`],
    headless: true,
  });

  const page = await browser.newPage();

  // Nếu proxy yêu cầu xác thực, sử dụng page.authenticate()
  // const username = 'your_proxy_username';
  // const password = 'your_proxy_password';
  // await page.authenticate({ username, password });

  try {
    // Truy cập một trang web để kiểm tra proxy
    await page.goto('http://www.google.com', { waitUntil: 'networkidle2' });
    console.log(`Proxy ${proxy} is working!`);
  } catch (error) {
    console.log(`Proxy ${proxy} failed: ${error.message}`);
  }

  // Đóng trình duyệt
  await browser.close();
};

// Gọi hàm kiểm tra proxy
checkProxy();
