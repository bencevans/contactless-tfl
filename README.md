# contactless-tfl

> Retrieve account balanced from TFL's contactless site.

## Install

    $ npm i contactless-tfl

## Example

```js
const tfl = require('./')

tfl(process.env.LOGIN, process.env.PASS)
.then(console.log)
.catch(console.error)
```