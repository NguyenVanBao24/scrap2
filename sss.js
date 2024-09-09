const { names, locations } = require('./nameOfSearch');

const scrapeCategory = async (browser, url) => {
  try {
    const page = await browser.newPage();
    console.log(' >> Opening new tab');
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 150000 });

    await page.waitForNavigation({ timeout: 1200000 });
    console.log(' >> Accessed URL', url);

    const isLoginRequired = await page.evaluate(() => {
      return !!document.querySelector('#okta-regular-login');
    });
    if (isLoginRequired) {
      await page.type('#okta-signin-username', 'prospector@ballerheadwear.com');
      await page.type('#okta-signin-password', 'Prospector---2024');
      await page.click('#okta-signin-submit');
      console.log(' >> Performed login operation');
      await page.waitForNavigation({ timeout: 1200000 });
    }

    await page.waitForSelector('#zi-lite-shell', { timeout: 150000 });
    console.log(' >> Page loaded');

    await page.waitForSelector('#zic-input-text-0', { timeout: 600000 });
    await page.type('#zic-input-text-0', locations[0]);
    console.log(' >> Entered location:', locations[0]);

    await page.waitForSelector('div.filters-values.ng-star-inserted > ul', { timeout: 60000 });
    await page.evaluate(() => {
      const ulElement = document.querySelector('div.filters-values.ng-star-inserted > ul');
      if (ulElement) {
        const firstDiv = ulElement.querySelector('div.filter-values-container');
        firstDiv?.click();
      }
    });

    await page.waitForSelector('div[data-onboarding="filter-wrapper:industry"]', { timeout: 60000 });
    await page.click('div[data-onboarding="filter-wrapper:industry"]');
    console.log(' >> Opened industry filter popup');

    for (const name of names) {
      console.log(` >> Entering industry: ${name}`);
      await page.waitForSelector('input[id="zic-input-text-6"]', { timeout: 60000 });
      await page.type('input[id="zic-input-text-6"]', name);

      await page.waitForSelector('tbody.p-treetable-tbody', { timeout: 60000 });
      await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay
      await page.click('tbody.p-treetable-tbody > tr:nth-child(2)');
      console.log(` >> Industry ${name} selected`);

      await page.click('input[id="zic-input-text-6"]', { clickCount: 3 });
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('.p-element.p-datatable-tbody', { timeout: 60000 });
    const totalOfCompany = await page.evaluate(() => {
      const label = document.querySelector('label.zic-counter-badge__label');
      return label ? parseInt(label.textContent.trim().replace(/,/g, ''), 10) : 0;
    });
    console.log(' >> Total companies found:', totalOfCompany);

    await new Promise((resolve) => setTimeout(resolve, 2000));

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

    const numOfPages = Math.min(Math.ceil(totalOfCompany / 25), 99); // Limit to 99 pages

    for (let j = -1; j < arrFilter.length; j++) {
      if (j > -1) {
        console.log(` >> Sorting by ${arrFilter[j]}`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await page.click(arrFilter[j]);
      }

      for (let i = 0; i < numOfPages; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Scrape data from current page
        const result = await page.evaluate(() => {
          const data = [];
          const rows = document.querySelectorAll('tr[_ngcontent-ng-c2548719673]');
          rows.forEach((row) => {
            const companyName = row.querySelector('span[data-automation-id="company-search-company-name"]')?.textContent.trim();
            const location = row.querySelector('span[data-automation-id="company-search-location"]')?.textContent.trim();
            const industry = row.querySelector('span[data-automation-id="card-name"]')?.textContent.trim();
            const employees = row.querySelector('.table-item.employees')?.textContent.trim();
            const revenue = row.querySelector('span[data-automation-id="company-search-revenue"]')?.textContent.trim();
            const website = row.querySelector('span[data-automation-id="company-search-website"]')?.textContent.trim();
            data.push({
              companyName,
              location,
              industry,
              employees,
              revenue,
              website,
            });
          });
          return data;
        });

        for (let i = 0; i < result.length; i++) {
          await page.evaluate((index) => {
            const rows = document.querySelectorAll('tr[_ngcontent-ng-c2548719673]');
            if (rows[index]) {
              rows[index].click();
            }
          }, i);

          await page.waitForSelector('div[data-onboarding="profile-side-pane-container"]', { timeout: 30000 });

          const modalData = await page.evaluate(() => {
            const phoneElement = document.querySelector('div[data-onboarding="profile-side-pane-container"] p[_ngcontent-ng-c618450157]');
            return phoneElement ? phoneElement.textContent.trim() : 'No data found';
          });
          result[i] = { ...result[i], modalData };

          // Close the modal
          await page.evaluate(() => {
            const closeButton = document.querySelector('button[aria-label="Close"]');
            if (closeButton) {
              closeButton.click();
            }
          });

          await page.waitForTimeout(2000);
        }

        allData.push(...result);
        const nextButton = await page.$('button.p-paginator-next');
        if (nextButton) {
          await nextButton.click();
        } else {
          console.log(' >> No more pages or "Next" button not found');
          break;
        }
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
