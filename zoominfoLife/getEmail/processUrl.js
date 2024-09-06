// processUrl.js
const puppeteer = require('puppeteer');
const findEmail = require('./findEmail');

async function processUrl(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Kiểm tra và thêm tiền tố nếu cần
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    let emails = await findEmail(page);
    if (emails.length === 0) {
      const contactLink = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        const contactLink = links.find((link) => link.innerText.toLowerCase().includes('contact'));
        return contactLink ? contactLink.href : null;
      });

      if (contactLink) {
        await page.goto(contactLink, { waitUntil: 'networkidle2' });
        emails = await findEmail(page);
      }
    }

    return emails.length > 0 ? emails[0] : null;
  } catch (error) {
    console.error(`Error processing ${url}:`, error.message);
    return null;
  } finally {
    await browser.close();
  }
}

module.exports = processUrl;
