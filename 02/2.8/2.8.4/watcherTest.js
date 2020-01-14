const fs = require('fs')
const Watcher = require('./Watcher')

const watchDir = 'watch'
const processedDir = 'done'
// watch 监视目录 目标目录
const watcher = new Watcher(watchDir, processedDir)

watcher.on('process', (file) => {
  const watchFile = `${watchDir}/${file}`
  const processedFile = `${processedDir}/${file.toLowerCase()}`
  fs.rename(watchFile, processedFile, err => {
    if (err) throw err
  })
})

// 启动 创建 watch 和 done 目录 把文件丢到 watch 目录中，然后看着文件出现在 done 目录中，文件名被改成小写
watcher.start()
