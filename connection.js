var mysql = require("mysql");
var connection = require("express-myconnection");
require('dotenv').config();

let sql_connection = null;
if (!!process.env.DB_HOST && !!process.env.DB_USER && !!process.env.DB_PASSWORD && !!process.env.DB_NAME) {
    // Create Sql Connection
    sql_connection = connection(mysql, {
        host     : process.env.DB_HOST || 'localhost',
        user     : process.env.DB_USER || 'kcdemo',
        password : process.env.DB_PASSWORD || 'password',
        database : process.env.DB_NAME || 'asdf'
    },'request');
}


module.exports = sql_connection;