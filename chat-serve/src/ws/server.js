var express = require('express');
var http = require('http');
var WebSocket = require('ws');

var app = express();
app.use(express.static(__dirname));

var server = http.createServer(app);
var wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
    console.log('开始连接！');
    ws.on('message', function incoming(data) {
         console.log('接收到了消息！');
        /**
         * 把消息发送到所有的客户端
         * wss.clients获取所有链接的客户端
         */
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    });
});

server.listen(8000, function listening() {
    console.log('服务器启动成功！');
});