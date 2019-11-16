const net = require('net');

const signal = {"portocal": "boardcast", "from": "jinghong", "message": "hello"};

const client = net.createConnection({port: 2080, host: '127.0.0.1'}, () => {
    console.log('client已经连接');
    client.write(JSON.stringify(signal));
});

client.on('data', (data) => {
   console.log(data.toString());
})
client.on('end', () => {
    console.log('连接关闭');
})
