const { names, locations } = require('./nameOfSearch');

const { userAgents, proxies } = require('./utils/ramdom');

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const scrapeCategory = async (browser, url) => {
  try {
    const userAgent = getRandomElement(userAgents);
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 150000 });
    await page.waitForNavigation({ timeout: 1200000 });
    console.log(' >> Accessing URL:', url);

    // Check if login is required
    const isLoginRequired = await page.evaluate(() => {
      return !!document.querySelector('#okta-regular-login');
    });

    if (isLoginRequired) {
      await page.type('#okta-signin-username', 'caopro@ballerheadwear.com');
      await page.type('#okta-signin-password', 'Pro----2024');
      await page.click('#okta-signin-submit');
      console.log(' >> Performing login operation');
    }

    // Wait for the page to fully load
    await page.waitForSelector('#zi-lite-shell', { timeout: 150000 });
    console.log(' >> Page loaded');

    // Enter location
    await page.waitForSelector('#zic-input-text-0', { timeout: 600000 });
    await page.type('#zic-input-text-0', locations[0]);
    console.log(' >> Entered location:', locations[0]);

    // Wait for location dropdown and select the first option
    await page.waitForSelector('div.filters-values.ng-star-inserted > ul', { timeout: 60000 });
    await page.evaluate(() => {
      const ulElement = document.querySelector('div.filters-values.ng-star-inserted > ul');
      if (ulElement) {
        const firstDiv = ulElement.querySelector('div.filter-values-container');
        firstDiv?.click();
      }
    });

    // Open industry filter popup
    await page.waitForSelector('div[data-onboarding="filter-wrapper:industry"]', { timeout: 60000 });
    await page.click('div[data-onboarding="filter-wrapper:industry"]');
    console.log(' >> Opened industry filter popup');

    // Input industries from the names array
    for (let i = 0; i < names.length; i++) {
      console.log(` >> Entering industry: ${names[i]}`);
      await page.waitForSelector('input[id="zic-input-text-6"]', { timeout: 60000 });
      await page.type('input[id="zic-input-text-6"]', names[i]);

      // Wait for dropdown and select the second row
      await page.waitForSelector('tbody.p-treetable-tbody', { timeout: 60000 });
      await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay
      await page.click('tbody.p-treetable-tbody > tr:nth-child(2)');
      console.log(` >> Industry ${names[i]} selected`);

      // Clear the input field for the next entry
      await page.click('input[id="zic-input-text-6"]', { clickCount: 3 });
      await page.keyboard.press('Backspace');
    }

    // Wait for results to load
    await page.waitForSelector('label.zic-counter-badge__label', { timeout: 60000 });

    const totalOfCompany = await page.evaluate(() => {
      const label = document.querySelector('label.zic-counter-badge__label');
      return label ? parseInt(label.textContent.trim().replace(/,/g, ''), 10) : 0;
    });

    console.log(' >> Total companies found:', totalOfCompany);

    const allData = [];
    const arrFilter = [
      // '[data-automation-data="Company Name"]',
      // '[data-automation-data="Company Name"]',
      // '[data-automation-data="City, State"]',
      // '[data-automation-data="City, State"]',
      // '[data-automation-data="Employees"]',
      // '[data-automation-data="Employees"]',
      // '[data-automation-data="Revenue"]',
      // '[data-automation-data="Revenue"]',
      // '[data-automation-data="Website"]',
      // '[data-automation-data="Website"]',
    ];

    const numOfLoop = Math.min(Math.ceil(totalOfCompany / 25), 99); // Limit to 99 pages
    console.log(' >> Number of loops:', numOfLoop);

    // Pagination loop
    for (let j = -1; j < arrFilter.length; j++) {
      if (j > -1) {
        console.log(` >> Sorting by ${arrFilter[j]}`);
        await new Promise((resolve) => setTimeout(resolve, 4000));
        await page.click(arrFilter[j]);
      }

      for (let i = 0; i < numOfLoop; i++) {
        await new Promise((resolve) => setTimeout(resolve, 4000));

        // Scrape data from the current page
        const data = await page.evaluate(() => {
          const rows = document.querySelectorAll('tr[zi-ax-table-row]');
          const result = [];

          rows.forEach((row) => {
            const companyName = row.querySelector('span[data-automation-id="company-search-company-name"]')?.textContent.trim();
            const location = row.querySelector('span[data-automation-id="company-search-location"]')?.textContent.trim();
            const industry = row.querySelector('span[data-automation-id="card-name"]')?.textContent.trim();
            const employees = row.querySelector('.table-item.employees')?.textContent.trim();
            const revenue = row.querySelector('span[data-automation-id="company-search-revenue"]')?.textContent.trim();
            const website = row.querySelector('span[data-automation-id="company-search-website"]')?.textContent.trim();

            result.push({
              companyName,
              location,
              industry,
              employees,
              revenue,
              website,
              phone: '',
              description: '',
            });
          });

          return result;
        });

        // Get phone and description for each company
        for (let k = 1; k < data.length; k++) {
          const companyRowIndex = k;
          await page.evaluate((index) => {
            const rows = document.querySelectorAll('tr[zi-ax-table-row]');
            if (rows[index]) {
              rows[index].click();
            }
          }, companyRowIndex);

          await page.waitForSelector('div[data-onboarding="profile-side-pane-container"]', { timeout: 3000000 });
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const phone = await page.evaluate(() => {
            const phoneElement = document.querySelector('div[data-onboarding="profile-side-pane-container"] p[_ngcontent-ng-c618450157]');
            return phoneElement ? phoneElement.textContent.trim() : 'No data found';
          });

          const description = await page.evaluate(() => {
            const descriptionElement = document.querySelector('div[data-onboarding="profile-side-pane-container"] div[_ngcontent-ng-c3205106403]');
            return descriptionElement ? descriptionElement.textContent.trim() : 'No data found';
          });

          data[k].phone = phone;
          data[k].description = description;
        }

        allData.push(...data);

        await new Promise((resolve) => setTimeout(resolve, 8000));
        await page.click('button.p-paginator-next');
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await page.close();
    console.log(' >> Scraping completed');
    return allData;
  } catch (error) {
    console.error('Error in scrapeCategory:', error);
    throw error;
  }
};

module.exports = { scrapeCategory };
