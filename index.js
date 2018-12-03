var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var translate = require('google-translate-api');
var port = process.env.PORT || 3800;
var path = require('path');

app.use('/', express.static(path.join(__dirname, '.', 'dist')));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    translate(msg.message, {from: msg.language, to: 'en'}).then(res => {
    	msg.allMessages = {};
	    msg.allMessages['en'] = res.text;
	    translate(msg.message, {from: msg.language, to: 'es'}).then(res => {
		    msg.allMessages['es'] = res.text;
		    translate(msg.message, {from: msg.language, to: 'fr'}).then(res => {
			    msg.allMessages['fr'] = res.text;
			    translate(msg.message, {from: msg.language, to: 'ja'}).then(res => {
				    msg.allMessages['ja'] = res.text;
				    io.emit('chat message', msg);
				}).catch(err => {
				    console.error(err);
				});
			}).catch(err => {
			    console.error(err);
			});
		}).catch(err => {
		    console.error(err);
		});
	}).catch(err => {
	    console.error(err);
	});

  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
