const { names, locations } = require('./nameOfSearch');

const scrapeCategory = async (browser, url) => {
  try {
    const page = await browser.newPage();
    console.log(' >> opening new tab');
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 150000 });

    await page.waitForNavigation({ timeout: 1200000 });

    console.log(' >> access URL', url);

    const isLoginRequired = await page.evaluate(() => {
      return !!document.querySelector('#okta-regular-login');
    });
    if (isLoginRequired) {
      await page.type('#okta-signin-username', 'prospector@ballerheadwear.com');
      await page.type('#okta-signin-password', 'Prospector---2024');
      await page.click('#okta-signin-submit');
      console.log('login operation');
    }

    // Wait for page to load completely
    await page.waitForSelector('#zi-lite-shell', { timeout: 150000 });
    console.log(' >> Page loaded');

    // Enter location
    await page.waitForSelector('#zic-input-text-0', { timeout: 60000 });
    await page.type('#zic-input-text-0', locations[0]);
    console.log(' >> Entered location:', locations[0]);

    // Wait for location dropdown and select first option
    await page.waitForSelector('div.filters-values.ng-star-inserted > ul', { timeout: 60000 });
    await page.evaluate(() => {
      const ulElement = document.querySelector('div.filters-values.ng-star-inserted > ul');
      if (ulElement) {
        const firstDiv = ulElement.querySelector('div.filter-values-container');
        firstDiv?.click();
      }
    });
    console.log(' >> Location selected');

    // Open industry filter popup
    await page.waitForSelector('div[data-onboarding="filter-wrapper:industry"]', { timeout: 60000 });
    await page.click('div[data-onboarding="filter-wrapper:industry"]');
    console.log(' >> Opened industry filter popup');

    // Input industries from names array
    for (let i = 0; i < names.length; i++) {
      console.log(` >> Entering industry: ${names[i]}`);
      await page.waitForSelector('input[id="zic-input-text-6"]', { timeout: 60000 });
      await page.type('input[id="zic-input-text-6"]', names[i]);

      // Wait for dropdown and select second row
      await page.waitForSelector('tbody.p-treetable-tbody', { timeout: 60000 });
      await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay
      await page.click('tbody.p-treetable-tbody > tr:nth-child(2)');
      console.log(` >> Industry ${names[i]} selected`);

      // Clear the input field for the next entry
      await page.click('input[id="zic-input-text-6"]', { clickCount: 3 });
      await page.keyboard.press('Backspace');
    }

    // Wait for results to load
    await page.waitForSelector('.p-element.p-datatable-tbody', { timeout: 60000 });
    const totalOfCompany = await page.evaluate(() => {
      const label = document.querySelector('label.zic-counter-badge__label');
      return label ? parseInt(label.textContent.trim().replace(/,/g, ''), 10) : 0;
    });
    console.log(' >> Total companies found:', totalOfCompany);

    const allData = [];

    const arrFilter = [
      '[data-automation-data="Company Name"]',
      '[data-automation-data="Company Name"]',
      '[data-automation-data="City, State"]',
      '[data-automation-data="City, State"]',
      '[data-automation-data="Employees"]',
      '[data-automation-data="Employees"]',
      '[data-automation-data="Revenue"]',
      '[data-automation-data="Revenue"]',
      '[data-automation-data="Website"]',
      '[data-automation-data="Website"]',
    ];

    const numOfLoop = Math.min(Math.ceil(totalOfCompany / 25), 99); // Limit to 99 pages

    // Pagination loop
    for (let j = -1; j < arrFilter.length; j++) {
      if (j > -1) {
        console.log(` >> Sorting by ${arrFilter[j]}`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await page.click(arrFilter[j]);
      }

      for (let i = 0; i < numOfLoop; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Scrape data from current page
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
            });
          });
          return result;
        });

        allData.push(...data);
        await page.click('button.p-paginator-next');
      }
    }

    // Wait before closing
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
