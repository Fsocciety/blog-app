const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "blog",
  password: process.env.DB_PASSWORD,
});

module.exports = db;
