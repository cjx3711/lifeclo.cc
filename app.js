const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');

const app = express()
const port = 9000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const database = {}

!fs.existsSync("data") && fs.mkdirSync("data");
const db_name = path.join(__dirname, "data", "app.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'app.db'");
});

const sql_create = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(256) NOT NULL,
  birthday DATE NOT NULL,
  metadata TEXT
);
`;

const sql_index = `
CREATE UNIQUE INDEX IF NOT EXISTS "username_index"
ON users(username);`

db.run(sql_create, err => {
  if (err) { return console.error(err.message); }
  console.log("Successful creation of the 'users' table");

  db.run(sql_index, err => {
    if (err) { return console.error(err.message); }
    console.log("Successful index creation");
  });
});



app.use(express.static('site'))

app.get('/api/:userid', function (req, res) {
  const userid = req.params.userid;

  const sql_get = `SELECT * FROM users WHERE username = '${userid}'`
  db.all(sql_get, [], (err, rows) => {
    if (rows.length == 0) {
      res.status(404).send({"error":"No such user"});
      return;
    }

    const metadata = JSON.parse(rows[0].metadata)
    metadata.touched = Date().toString();

    const sql_touch = `UPDATE users SET metadata='${JSON.stringify(metadata)}' WHERE username='${userid}'`
    db.run(sql_touch, err => {
      if (err) { return console.error(err.message); }
      console.log("Successful touch 'users' table");

      const payload = {
        userid: rows[0].username,
        birthday: rows[0].birthday
      }
  
      res.send(payload)
    });
    
  })
})

app.post('/api/:userid', function (req, res) {
  console.log("App post")
  const userid = req.params.userid;

  if ( !req.body.birthday ) {
    res.status(400).send({"error": "No birthday"})
    return
  }
  const birthday = req.body.birthday

  const sql_count = `SELECT COUNT(*) FROM users WHERE username = '${userid}'`
  db.all(sql_count, [], (err, rows) => {
    if (err) { return console.error(err.message); }
    console.log(rows)
    if ( rows[0]['COUNT(*)'] > 0 ) {
      res.status(400).send({"error":"User exists"})
      return;
    }

    let now = Date()
    let metadata = {
      created: now.toString(),
      touched: now.toString()
    }
      
    const sql_add = `
      INSERT INTO users
      ("username","birthday","metadata") VALUES
      ('${userid}','${birthday}','${JSON.stringify(metadata)}');
    `
    db.run(sql_add, err => {
      if (err) { return console.error(err.message); }
      console.log("Successful insertion into the 'users' table");
      res.send({userid: userid, birthday: birthday})
    });
  });
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))