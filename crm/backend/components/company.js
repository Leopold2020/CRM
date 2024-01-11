const pool = require("../database/db");

async function getCompanyList() {
  const list = await pool.query(
    `SELECT * FROM company WHERE toCall >= NOW()::DATE ORDER BY toCall ASC, 
    (CASE status
      WHEN 'green' THEN 1
      WHEN 'yellow' THEN 2
      WHEN 'red' THEN 3
    END)`
  );
  return list.rows;
}

async function getCompany(name) {
  const company = await pool.query(
    `SELECT * FROM company WHERE name = '${name}'`
  );
  return company.rows[0];
}

async function createCompany(name, email, phone, information, status, toCall) {
  const new_company = await pool.query(
    `INSERT INTO company 
    (name, email, phone, information, status, toCall) 
    VALUES (
      '${name}', 
      '${email}', 
      '${phone}', 
      '${information}', 
      '${status}', 
      '${toCall}'
    ) RETURNING *`
  );
  return new_company.rows[0];
}

async function updateCompany(id, name, email, phone, information, status, toCall) {
  const update_company = await pool.query(
    `UPDATE company SET 
    name = '${name}', 
    email = '${email}', 
    phone = '${phone}', 
    information = '${information}', 
    status = '${status}', 
    toCall = '${toCall}' 
    WHERE id = ${id} RETURNING *`
  );
  return update_company.rows[0];
}

async function deleteCompany(id) {
  const delete_company = await pool.query(
    `DELETE FROM company WHERE id = ${id} RETURNING *`
  );
  return delete_company.rows[0];
}

async function filterCompany(name) {
  const filtered_company = await pool.query(
    `SELECT * FROM company WHERE name LIKE '%${name}%'`
  );
  return filtered_company.rows;
}

module.exports = {
  getCompanyList,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  filterCompany
};
