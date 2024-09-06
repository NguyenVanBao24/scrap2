// findEmail.js

async function findEmail(page) {
  const emails = await page.evaluate(() => {
    const bodyText = document.body.innerText;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = bodyText.match(emailRegex);
    return matches ? matches : [];
  });
  return emails;
}

module.exports = findEmail;
