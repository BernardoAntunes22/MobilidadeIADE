var mysql = require("mysql");
var util = require("util");

// we should use enviroment variables instead of fixed values
//   user     : process.env.DBUSER,
//   password : process.env.DBPASS,
// DBPASS and DBUSER must be defined in terminal or hosting settings
// Powershell: $env:DBPASS="password"
// CMD (windows): set DBPASS="password"
// Linux and iOS: export DBPASS="password"
// Heroku: Go to Settings and then to config vars

var pool = mysql.createPool({
  host: "remotemysql.com",
  user: "NadbqlK05M",
  password: "BolQPlyo50",
  database: "NadbqlK05M",
  port: "3306",
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  if (connection) connection.release();

  return;
});

pool.query = util.promisify(pool.query); // Magic happens here.

module.exports = pool;
