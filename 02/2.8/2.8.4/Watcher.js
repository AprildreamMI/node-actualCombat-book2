const fs = require('fs')
const events = require('events')

class Watcher extends events.EventEmitter {
  constructor (watcherDir, processedDir) {
    super ()
    this.watcherDir = watcherDir
    this.processedDir = processedDir
  }

  watch () {
    fs.readdir(this.watcherDir, (err, files) => {
      if (err) throw err
      for(let index in files) {
        this.emit('process', files[index])
      }
    })
  }

  start () {
    fs.watchFile(this.watcherDir, () => {
      this.watch()
    })
  }
}

module.exports = Watcher