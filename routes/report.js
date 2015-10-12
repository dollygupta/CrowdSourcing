var ejs = require("ejs");
var geodist = require('geodist');
var mysqlQuery = require("./dbConnectivity/mysqlQuery");
var pic="";
var location="";
var strOp="";


exports.clusterReport = function(req,res)
{
	console.log("in getPosition");
	var room = req.param("inputVal");
	console.log("value---- "+ room);
	var clusteredResult="";
	var sqlstmt = "select * from redUsers where room=?";
	var params =[room];
	
	mysqlQuery.execQuery(sqlstmt,params,function(err, rows, fields){
		if (err) {
		throw err;
        }else
        {
        	if(rows.length > 0)
        		{
        		console.log("Success in redUser");	
        		clusteredResult = JSON.stringify(rows);
        	
        		res.end(clusteredResult.toString());
        		}
        	
        }	
	});	
};
exports.getPosition = function(req,res)
{
	
	console.log("in getPosition");
	var value = req.param("input");
	var resultDis="";
	console.log(value);
	var sqlstmt = "select * from 239_data;";
	
	mysqlQuery.execQuery(sqlstmt,function(err, rows, fields){
		if (err) {
		throw err;
        }else
        {
        	if(rows.length > 0)
        		{
        		console.log("Success in getPos");	
        		resultDis = JSON.stringify(rows);
        	
        		res.end(resultDis.toString());
        		}
        	
        }	
	});
};

exports.getLatLong = function(req,res)
{
	console.log("in getLatLong");
	var name = req.param("input");
	var result="";
	console.log("nickname value =" +name);
	var sqlstmt = "select latitude,longitude from 239_data where name=?;";
	var params=[name];
	
	mysqlQuery.execQuery(sqlstmt,params,function(err, rows, fields){
		if (err) {
		throw err;
        }else
        {
        	if(rows.length > 0)
        		{
        		console.log("Success in LatLong");	
        		result = JSON.stringify(rows);
        		console.log(result);
        		res.end(result.toString());
        		}
        	
        }	
	});
};

exports.calNPMGeoDistance = function(req,res)
{
	
	var lat1 = parseFloat(req.param("lat1"),6);
	var lon1 = parseFloat(req.param("lon1"),6);
	var lat2 = parseFloat(req.param("lat2"),6);
	var lon2 = parseFloat(req.param("lon2"),6);
	
	var start = {
			  latitude: lat1,
			  longitude: lon1
			};
	var end = {
			  latitude: lat2,
			  longitude: lon2
			};
	
	var haversineDist = geodist(start,end,{exact: true, unit: 'mi'});
	//haversineDist = haversineDist/2;
	console.log(haversineDist);
	res.end(haversineDist.toString());
};

exports.getPointsInDistance = function(req,res)
{
	console.log("In get POI");
	var lat = req.param("lat");
	var lng = req.param("lng");
	var distance = req.param("distance");
	console.log(lat);
	console.log(lng);
	console.log("finally distance"+distance);
	
	//var sqlstmt = "select * from allUsers";
  var sqlstmt = "select latitude,longitude,name,mobileNo,streetAddress from 239_data where (((acos(sin(('"+lat+"' * pi()/180)) * sin((latitude*pi()/180)) + cos(('"+lat+"' * pi()/180)) *cos((latitude*pi()/180)) * cos((('"+lng+"' - longitude)*pi()/180)))) *180/pi())*60*2.133) <='"+distance+"';";
	
	mysqlQuery.execQuery(sqlstmt,function(err, rows, fields){
		if (err) {
			throw err;
        }else
        {
        	var resultDis='';
        	if(rows.length > 0)
        		{
        		console.log("Success in getPos poi");	
        		resultDis = JSON.stringify(rows);
        		var resultStr= JSON.parse(JSON.stringify(rows));
        		console.log(resultStr);
        		res.end(resultDis.toString());
        		}else
        			{
        			resultDis=JSON.stringify("No result found");
        			res.end(resultDis.toString());
        			}
        			
        	
        	
        }	
	});
	
};