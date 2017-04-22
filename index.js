var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var thatSocket = '';
app.get('/',function(req,res){
	res.send('<h1>Hello World</h1>');
});

app.get('/chat',function(req,res){
	res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', function(socket){
  
  console.log('a user connected: ',socket.id);
 // console.log(socket);
  socket.on('disconnect', function(){
    console.log('user disconnected: ',socket.id);
    //console.log(socket);
    io.emit('chat message', 'This is an auto messgae behalf of user: '+socket.id);
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});

app.get('/automessage',function(req, res){  
  io.emit('chat message', 'This is an Auto Message');
  res.send('Message Sent');
});

http.listen(3000,function(){
	console.log('Listening on port: 3000');
});