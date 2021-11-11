//const mysql = require('mysql');
import mysql from 'mysql'
//CReate mysql Connection
const dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database: 'avrentaldb'
})

dbConn.connect(function(error){
    if(error) throw error;
    console.log("Database Connected Successfully")
})

//module.exports = dbConn;
export default dbConn ;