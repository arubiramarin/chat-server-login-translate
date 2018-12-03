var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var translate = require('google-translate-api');
var port = process.env.PORT || 3800;
var path = require('path');
var { Translate } = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'maximal-ship-223810';

// Instantiates a client
const translate = new Translate({
    projectId: projectId,
});

app.use('/', express.static(path.join(__dirname, '.', 'dist')));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    translate.translate(msg.message, 'en').then(res => {
    	msg.allMessages = {};
	    msg.allMessages['en'] = res[0];
	    translate.translate(msg.message, 'es').then(res => {
		    msg.allMessages['es'] = res[0];
		    translate.translate(msg.message, 'fr').then(res => {
			    msg.allMessages['fr'] = res[0];
			    translate.translate(msg.message,'ja').then(res => {
				    msg.allMessages['ja'] = res[0];
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
