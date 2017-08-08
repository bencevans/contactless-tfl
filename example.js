const tfl = require('./')

tfl(process.env.LOGIN, process.env.PASS)
.then(console.log)
.catch(console.error)
