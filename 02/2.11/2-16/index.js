const async = require('async')

async.series([
  callback => {
    setTimeout(() => {
      console.log('1')
      callback()
    }, 1000)
  },
  callback => {
    setTimeout(() => {
      console.log('2')
      callback()
    }, 500)
  },
  callback => {
    setTimeout(() => {
      console.log('3')
      callback()
    }, 100)
  }
])