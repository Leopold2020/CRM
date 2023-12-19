const pool = require('../database/db');

async function getCompanyList() {
    const list = await pool.query(
        `SELECT * FROM company WHERE toCall >= NOW()::DATE ORDER BY toCall ASC, 
            (CASE status
                WHEN 'green' THEN 1
                WHEN 'yellow' THEN 2
                WHEN 'red' THEN 3
                END)`
    )
    return list.rows;
}



module.exports = {
    getCompanyList
};