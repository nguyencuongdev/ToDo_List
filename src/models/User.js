const database = require('../common/databse');
const connection = database.getConnection();
const ExceptionDatabase = require('../common/ExceptionDatabase');


const User = {};

User.createAccount = async (account) => {
    try {
        let insert_sql = `INSERT INTO users (name, username, password, createAt, updateAt)
                 VALUES (?, ?, ?, ?, ?)`;
        const data = [
            account.name,
            account.username,
            account.password,
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

User.getUserByUsername = async (username) => {
    try {
        let select_sql = `SELECT * FROM users WHERE username = ?`;
        let data = [username];
        return await new Promise((resolve, reject) => {
            connection.query(select_sql, data, (err, results) => {
                if (err) {
                    reject(new ExceptionDatabase('Error getting user by username: ' + err.message));
                } else {
                    results.length > 0 ? resolve(results[0]) : reject(null);
                }
            })
        })
    } catch (err) {
        throw new Error(err.message);
    }
}
module.exports = User;