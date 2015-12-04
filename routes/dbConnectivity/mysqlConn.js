/**
 * New node file
 * To create mysql connection pool.
 */
var mysql = require('mysql');
var pool  = mysql.createPool({
	host     : 'crowdsourcing.cqk6ycyeciwh.us-west-1.rds.amazonaws.com',
	user     : 'root',
	password : 'Rajas987.',
	port     : '3306',
	database : '280',
	connectionLimit : '10'
});

exports.pool = pool;
