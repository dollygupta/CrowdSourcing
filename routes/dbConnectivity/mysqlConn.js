/**
 * New node file
 * To create mysql connection pool.
 */
var mysql = require('mysql');
var pool  = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	port     : '3306',
	database : 'crowdsourcing',
	connectionLimit : '10'
});

exports.pool = pool;
