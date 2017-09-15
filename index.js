const {Chromeless} = require('chromeless');
const Cheerio = require('cheerio');

module.exports = async function TFL(login, password) {
  const chromeless = new Chromeless()

  const isLoggedIn = await chromeless
    .goto('https://contactless.tfl.gov.uk')
    .wait('footer')
    .evaluate(() => {
      const NativePromise = fetch().catch(_=>_).constructor;
      return new NativePromise((resolve, reject) => {
        resolve(document.querySelectorAll('#startpage-login-username').length === 0);
      })
    });

  if (isLoggedIn === false) {
    await chromeless
    .goto('https://contactless.tfl.gov.uk')
    .wait('footer')
    .type(login, '#startpage-login-username')
    .type(password, '#startpage-login-password')
    .click('#startpage-login-submit')
  }

  await chromeless.wait('#dashboard-todaystravel-container');

  const body = await chromeless.evaluate(() => {
    const NativePromise = fetch().catch(_=>_).constructor;
    return new NativePromise((resolve, reject) => {
      resolve(document.body.innerHTML)
    })
  });

  const $ = Cheerio.load(body);
  const cards = $('.card-tile');

  const parsedCards = cards.map((index, el) => {
      const idMatch = $(el).html().match(/([0-9]{12})/);
      const id = idMatch ? idMatch[1] : null;

      const balanceMatch = $(el).html().match(/([0-9]+\.[0-9]+)/)
      const balance = balanceMatch ? parseFloat(balanceMatch[1], 10) : null;

      return {
          id,
          balance,
          currency: 'GBP'
      }
  }).toArray()
    .filter(account => account.id)

  await chromeless.end()

  return parsedCards
}
