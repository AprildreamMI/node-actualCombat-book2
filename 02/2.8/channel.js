const events = require('events')
const net = require('net')
// 得到一个时间
const channel = new events.EventEmitter();
// 客户
channel.clients = {}
channel.subscriptions = {}
// 监听事件
channel.on('join', function (id, client) {
  // 保存用户对象
  this.clients[id] = client
  // 用户id属性值赋值为一个函数
  this.subscriptions[id] = (senderId, message) => {
    if (id != senderId) {
      this.clients[id].write(message)
    }
  }

  // 添加一个专门针对当前用户的broadcast事件监听器
  // 触发此事件的时候 会传入id 和 message
  this.on('broadcast', this.subscriptions[id])
})

const server = net.createServer(client => {
  const id = `${client.remoteAddress}:${client.remotePort}`

  // 用户加入,触发join事件,给定id和用户对象
  channel.emit('join', id, client)

  // 监听用户发送数据
  client.on('data', data => {
    data = data.toString()
    // 当有用户发送数据时,发出一个评到broadcast,指明用户ID和消息
    channel.emit('broadcast', id, data)
  })
})

server.listen(8888)
