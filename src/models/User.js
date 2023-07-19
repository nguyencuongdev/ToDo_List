const database = require('../common/databse');
const connection = database.getConnection();
const ExceptionDatabase = require('../common/Exception');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');


const User = {};

User.createAccount = async (account) => {
    try {
        let insert_sql = `INSERT INTO users (name, username, password, createAt, updateAt)
                 VALUES (?, ?, ?, ?, ?)`;

        const stringSalt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(account.password, stringSalt);
        const data = [
            account.name,
            account.username,
            password = hashedPassword,
            account.createAt,
            account.updateAt,
        ];

        await new Promise((resolve, reject) => {
            connection.query(insert_sql, data, (err) => {
                if (err) {
                    reject(new Error('Error creating account: ' + err.message));
                } else {
                    console.log('Account created successfully!');
                    resolve();
                }
            })
        })

    } catch (err) {
        throw new Error(err.message);
    }
};
module.exports = User;