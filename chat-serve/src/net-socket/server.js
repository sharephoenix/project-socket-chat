const net = require('net');

//存储所有连接的client
// [{socketId: 'id', conn: Object}]
const sockets = [];
const conns = {}
// addSocket (conn) {
// }
// 创建一个socket服务器
const server = net.createServer((socket) => {
    var uuid  = require('node-uuid') // 生成唯一 id
    let connectUid = 'null'
    sockets.push({uuid, element: socket});
    
    console.log('创建了一个socket::')
    function boardcast(from, message){
        sockets.forEach((socket) => {
            const { element } = socket
            element.write(`你好呀${from}, 你说的是${message}`);
        });
    }

    function connetion (uid) {
        connectUid = uid
        conns[connectUid] = { element: socket, userId: connectUid }
        console.log(connectUid)
        socket.write(`'login-success', ${JSON.stringify({...conns[connectUid], ...{element: null}})}`)
    }

    socket.on('data', (chunk) => {
        //规定chunk的数据结构为： {portocal: 'boardcast', from: 'client', message: 'hello'}
        try {
            var data = JSON.parse(chunk);
            switch(data.portocal){
                case 'boardcast': 
                    console.log('收到消息');
                    boardcast(data.from, data.message);// 有任何客户端发消息都会有触发,对每个client进行广播
                    break;
                case 'connect':
                    connetion(data.uid)
                    break;
                default:  socket.write('你说的格式我不识别');
            }
        } catch (error) {
            console.log(error);
        }    
    })

});

const port = 2080;

// 监听一个特定的端口
server.listen(port, (err) => {
    // 监听端口成功后调用，如果监听失败则是端口被调用
    if (err){
        console.log('端口被占用');
        return false;
    }
    console.log(`server成功监听${port}`);
})

