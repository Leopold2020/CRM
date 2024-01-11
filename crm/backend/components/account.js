const pool = require('../database/db');
const token = require('./token');

async function login(email, password) {
    const login = await pool.query(
        `SELECT * FROM account  WHERE email = '${email}' AND password = '${password}'`
    )
    if (login.rows.length === 0) {
        return { error: "Wrong username or password!" };
    } else {
        return login.rows[0];
    }
}

async function create(username, password, email) {
    const newAccount = await pool.query(
        `INSERT INTO account (username, password, email) VALUES ('${username}', '${password}', '${email}') RETURNING *`
    )
    return newAccount.rows[0];
}

async function updateAccount(username, password, email) {
    const updateAccount = await pool.query(
        `UPDATE account SET username = '${username}', password = '${password}', email = '${email}' WHERE id = ${id} RETURNING *`
    )
    return updateAccount.rows[0];
}

async function deleteAccount(id) {
    const deleteAccount = await pool.query(
        `DELETE FROM account WHERE id = ${id} RETURNING *`
    )
    return deleteAccount.rows[0];
}

async function getAccountList() {
    const list = await pool.query(
        `SELECT * FROM account`
    )
    return list.rows;
}


module.exports = {
    login,
    create,
    updateAccount,
    deleteAccount,
    getAccountList
};