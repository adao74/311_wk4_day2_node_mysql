const mysql2 = require('mysql2')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS, all fields from all tables

  pool.query("SELECT * FROM users u INNER JOIN usersAddress ua ON u.id = ua.user_id INNER JOIN usersContact uc ON u.id = uc.user_id", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = "SELECT * FROM users WHERE id = ?";
  sql = mysql2.format(sql, [parseInt(req.params.id)])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

// const createUser = (req, res) => {
//   // INSERT INTO USERS FIRST AND LAST NAME 
//   let sql = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"

//   sql = mysql2.format(sql, [
//     req.body.first_name, 
//     req.body.last_name
//   ])

//   pool.query(sql, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     return res.json({ newId: results.insertId });
//   })
// }

const createUser = (req, res) => {
  const { first_name, last_name, address, city, county, state, zip, phone1, phone2, email } = req.body;

  const sql = "CALL CreateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [first_name, last_name, address, city, county, state, zip, phone1, phone2, email];

  pool.query(sql, values, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE users SET first_name = ?, last_name = ? WHERE id = ? "
  
  sql = mysql2.format(sql, [req.body.first_name, req.body.last_name, parseInt(req.params.id)])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM users WHERE first_name = ?"
  sql = mysql2.format(sql, [req.params.first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}