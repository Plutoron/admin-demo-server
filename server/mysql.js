const mysql = require("mysql")

const { database } = require('./config') 
 
const pool = mysql.createPool({
    host        : database.HOST,
    user        : database.USERNAME,
    password    : database.PASSWORD,
    database    : database.DATABASE
});

const query = (sql, values) => {
  console.log('query sql values', sql, values)
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}
 
const createTable = function(sql) {
  return query(sql, [])
}

const findDataById = function(table,  id) {
  const  _sql =  "SELECT * FROM ?? WHERE id = ? "
  return query(_sql, [table, id])
}
 
const findDataByPage = function(table, keys, start, end) {
  const  _sql =  "SELECT ?? FROM ??  LIMIT ? , ?"
  return query(_sql, [keys,  table,  start, end])
}
 
const insertData = function(table, values) {
  const _sql = "INSERT INTO ?? SET ?"
  return query(_sql, [table, values])
}
 
const updateDataById = function(table, values, id) {
  const _sql = "UPDATE ?? SET ? WHERE id = ?"
  return query(_sql, [table, values, id])
}
 
const deleteDataById = function(table, id) {
  const _sql = "DELETE FROM ?? WHERE id = ?"
  return query(_sql, [table, id])
}
 
const select = function(table, keys) {
  const _sql =  "SELECT ?? FROM ?? "
  return query(_sql, [keys, table])
}

const selectKeysById = function(table, keys, id) {
  const _sql =  "SELECT ?? FROM ?? WHERE id = ?"
  return query(_sql, [keys, table, id])
}

const selectKeysWithRule = (table, keys, key, value) => {
  const _sql =  "SELECT ?? FROM ?? WHERE ?? = ?"
  return query(_sql, [keys, table, key, value])
}
 
const count = function(table) {
  const _sql =  "SELECT COUNT(*) AS total_count FROM ?? "
  return query(_sql, [table])
}
 
module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateDataById,
  select,
  selectKeysById,
  selectKeysWithRule,
  count,
}
