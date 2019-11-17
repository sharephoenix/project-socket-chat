var wsServer = new WebSocket('ws://127.0.0.1:8000');
 wsServer.onopen = function (e) {
     (typeof e == 'string') && wsServer.send(e);//向后台发送数据
 };
 wsServer.onclose = function (e) {//当链接关闭的时候触发
    console.log('closed')
 };
 wsServer.onmessage = function (e) {//后台返回消息的时候触发
    console.log(e);
 };
 wsServer.onerror = function (e) {//错误情况触发
  console.log('err', e)
 }