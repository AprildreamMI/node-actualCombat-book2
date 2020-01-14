const fs = require('fs')
const request = require('request')
const htmlparser = require('htmlparser')

const configFilename = './rss_feeds.txt'

function checkForRSSFile () {
  fs.exists(configFilename, (exists) => {
    if (!exists) {
      return next(new Error(`Missing Rss file ,${configFilename}`))
    }
    next(null, configFilename)
  })
}

function readRSSFile (configFilename) {
  fs.readFile(configFilename, (err, feedList) => {
    if (err) return next(err)
    feedList = feedList
      .toString()
      .replace(/^\s+|\s+$/g, '')
      .split('\n')
    const random = Math.floor(Math.random() * feedList.length)
    next(null, feedList(random))
  })
}

function downloadRSSFeed (feedUrl) {
  request({uri: feedUrl}, (err, res, body) => {
    if (err) { 
      return next(err)
    }
    if (res.statusCode !== 200) {
      return next(new Error('Abnormal response status code'))
    }

    next(null)
  })
}