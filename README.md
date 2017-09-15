# contactless-tfl

> Retrieve account balanced from TFL's contactless/oyster site.

## Install

    $ npm install contactless-tfl

## Usage

```js
const tfl = require('contactless-tfl')

tfl(process.env.LOGIN, process.env.PASS)
  .then(console.log)
  .catch(console.error)
// => [ { id: 'REDACTED', balance: 0.5, currency: 'GBP' },
//      { id: 'REDACTED', balance: 14.5, currency: 'GBP' } ]

```

## Licence

MIT © [Ben Evans](https://bencevans.io)