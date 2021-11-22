//const mysql = require('mysql');
import mysql from 'mysql'
//CReate mysql Connection
const dbConn = mysql.createConnection({
    host:'av-rental-db.cu6psljv9z1n.us-east-2.rds.amazonaws.com',
    user:'admin',
    password:'avrental',
    database: 'avrentaldb'
})

dbConn.connect(function(error){
    if(error) throw error;
    console.log("Database Connected Successfully")
})

//module.exports = dbConn;
export default dbConn ;