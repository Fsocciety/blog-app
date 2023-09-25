const { Client } = require("pg")

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 5432
})

client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });

// const mysql = require("mysql2");

// const db = mysql.createConnection({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
// });

// db.connect(function (err) {
//   if (err) {
//     return console.error("error: " + err.message);
//   }

//   console.log("Connected to the MySQL server.");
// });

// module.exports = db;
