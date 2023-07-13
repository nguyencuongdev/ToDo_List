const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection(
    {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
        port: process.env.DATABASE_PORT
    }
)

connection.connect((error) => {
    error ? console.error(error) : console.log('Connection succesful!');
})

function getConnection() {
    return connection;
}

module.exports = {
    getConnection
};