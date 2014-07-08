//请求websocket-server模块 
var ws = require("websocket-server"); 
 
//创建一个服务器 
var server = ws.createServer(); 
 
//当websocket正常通信时，我们为其注册一个message事件，用于异步监视是否有消息发送到服务器 
server.addListener("connection", function(connection){ 
  //当有消息发往到socket echo服务器时 
  connection.addListener("message", function(msg){ 
   //我们发送一个echo，请注意不是broadcast 
    server.send(connection.id,msg); 
  }); 
}); 