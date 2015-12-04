
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , report = require('./routes/report')
  , http = require('http')
  , path = require('path');

var app = express();
var server = require('http').createServer(app);

// all environments
//app.set('port', process.env.PORT || 3000);
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


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/clusterReport', report.clusterReport);
app.get('/getPosition', report.getPosition);
app.get('/getLatLong', report.getLatLong);
app.get('/getPointsInDistance',report.getPointsInDistance);
app.get('/calNPMGeoDistance',report.calNPMGeoDistance);


var port = process.env.PORT || 3000; // Use the port that Heroku provides or default to 3000
server.listen(port);
console.log('Server started on ' + port);

var people=[];
var id;
var io = require('socket.io')(server);
io.on('connection',function(client){
	//var count=0;
	//client first funtion to call
	client.on('join',function(name){
		client.nickname=name;
		client.room='room1';
		client.join('room1');
		id = client.id;
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
	client.on('sendAlert',function(data,start, end){
		var nickname = client.nickname;
		var i=0;

		var clients = io.sockets.adapter.rooms['room1'];

		console.log("------------------data name found----------"+data);
		for (var clientId in clients)
		{

			if(data==people[clientId].name && data!=nickname)
			{
				if (io.sockets.connected[clientId]) {
					io.sockets.connected[clientId].emit("sendAlert", "emergency vehicle around!",start, end);
				}
			}
		}
	});

	client.on('sendPolyWay',function(wayLat, wayLong){
		console.log("--in---------------------"+ wayLat[0]);
		client.broadcast.emit("sendPolyWay",wayLat,wayLong);
	});
	/*client.on('new user', function(){
	 client.nickname = people[id].name;
	 updateNicknames();
	 });

	 function updateNicknames(){
	 io.sockets.emit('usernames', people);
	 }*/

	client.on('send message', function(data,name){
		console.log("hello--------chat");
		io.sockets.emit('new message', {msg: data, nick: name});
	});

	/*client.on('disconnect', function(data){
	 if(!client.nickname) return;
	 people.splice(people.indexOf(client.nickname), 1);
	 updateNicknames();
	 });*/
});
