
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , report = require('./routes/report')
  , login = require('./routes/login')
  , http = require('http')
  , path = require('path');

var app = express();
var server = require('http').createServer(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/chat', function(req, res) {
	res.render('chat');
});

app.get('/contact', function(req, res) {
	res.render('contact');
});
app.get('/', function(req, res) {
	res.render('login');
});
app.get('/home', login.login);
app.get('/users', user.list);
app.get('/clusterReport', report.clusterReport);
app.get('/getPosition', report.getPosition);
app.get('/getLatLong', report.getLatLong);
app.get('/getPointsInDistance',report.getPointsInDistance);
app.get('/calNPMGeoDistance',report.calNPMGeoDistance);
server.listen(3000);

var people=[];
var id;
var io = require('socket.io')(server); 
io.on('connection',function(client){
	//var count=0;
	//client first funtion to call
	client.on('join',function(name){
		console.log("joined"+name);
		client.nickname=name;
		client.room='room1';
		client.join('room1');
		id=client.id;
		people[client.id] = {"name" : name};
	});
	
	//client report msgs to broadcast
	client.on('messages',function(value,data){
		//count=0;
		var nickname = client.nickname;
		
		var i=0;
		var clients = io.sockets.adapter.rooms['room1'];
		for(i=0; i<data.length; i++)
		{
			for (var clientId in clients)
			{
				
				if(data[i].name==people[clientId].name)
				{
				if (io.sockets.connected[clientId]) {
				    io.sockets.connected[clientId].emit("messages",{name:nickname,msg:value.report,lat:value.lat,long:value.long});
				}
				}
			}
		}
	});
	
	//client send alert msg after clustering emergency vehicle 
	client.on('sendAlert',function(data,wayLat, wayLong){
		var nickname = client.nickname;
		var i=0;
		
		var clients = io.sockets.adapter.rooms['room1'];
		for(i=0; i<data.length; i++)
		{
			for (var clientId in clients)
			{
				
				if(data[i].name==people[clientId].name && data[i].name!=nickname)
				{	
					
						if (io.sockets.connected[clientId]) {
						    io.sockets.connected[clientId].emit("sendAlert", "emergency vehicle around!",wayLat, wayLong);
					
					}
			
					
				}
			}
		}
		
	});
	
	client.on('sendPolyWay',function(wayLat, wayLong){
		console.log("--in---------------------"+ wayLat[0]);
		client.broadcast.emit("sendPolyWay",wayLat,wayLong);
	});
	client.on('new user', function(){
			client.nickname = people[id].name;
			updateNicknames();
	});

	function updateNicknames(){
		io.sockets.emit('usernames', people);
	}

	client.on('send message', function(data){
		io.sockets.emit('new message', {msg: data, nick: client.nickname});
	});

	client.on('disconnect', function(data){
		if(!client.nickname) return;
		people.splice(people.indexOf(client.nickname), 1);
		updateNicknames();
	});
});
