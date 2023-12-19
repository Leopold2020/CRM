const pool = require('../database/db');

async function login(name, password) {
    const login = await pool.query(
        `SELECT * FROM account  WHERE username = '${name}' AND password = '${password}'`
    )
    return login.rows[0];
}

async function create(username, password, email) {
    const newAccount = await pool.query(
        `INSERT INTO account (username, password, email) VALUES ('${username}', '${password}', '${email}') RETURNING *`
    )
    return newAccount.rows[0];
}


module.exports = {
    login,
    create
};