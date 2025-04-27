// require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vinniastrie!7',
    database: 'equipdistribution'
});

const connectDB = () => {
    connection.connect((err) => {
        if(err){
            console.log("Error connecting to the database", err.stack);
            return;
        }
        console.log("Connected to the database", connection.threadId);
    });

};

module.exports = {connectDB, connection};