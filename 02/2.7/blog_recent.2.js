const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  if (req.url === '/') {
    getTitles(res)
  }
}).listen(8000, () => {
  console.log('server 8000')
})

// 读取标题数据
function getTitles(res) {
  fs.readFile('./title.json', (err, data) => {
    if (err) {
      hadError(err, res)
    } else {
      const titles = JSON.parse(data.toString())
      getTemplate(titles, res)
    }
  })
}

// 读取模板
function getTemplate (titles, res) {
  fs.readFile('./template.html', (err, data) => {
    if (err) {
      hadError(err, res)
    } else {
      formatHtml(titles, data, res)
    }
  })
}

// 格式化模板
function formatHtml (titles, tmpl, res) {
  const html = tmpl.toString().replace('%', titles.join('<li></li>'))
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end(html)
}

// 错误信息
function hadError (err, res) {
  console.error(err)
  res.end('Server Error')
}

