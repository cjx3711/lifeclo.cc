const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');
const vhost = require('vhost')

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
  console.log("'users' table working");

  db.run(sql_index, err => {
    if (err) { return console.error(err.message); }
    console.log("index working");
  });
});

// Redirect the source and manual subdirectories to the subdomains
app.get('/manual', function(req, res) {
  res.redirect(`http://manual.${req.headers.host}`);
})
// Required for legacy reasons. Printed this URL format on the circuit board.
app.get('/manual/:version', function(req, res) {
  res.redirect(`http://manual.${req.headers.host}/${req.params.version}`);
})
app.get('/source', function(req, res) {
  res.redirect(`http://source.${req.headers.host}`);
})

// This will work for both app.lifeclo.cc and lifeclo.cc
app.get('/api/:userid', function (req, res) {
  var hostname = req.headers.host.split(":")[0];
  if (!hostname.startsWith('app.') && hostname !== 'lifeclo.cc' && hostname !== 'localhost') {
    res.status(404).send();
    return;
  }

  const userid = req.params.userid;

  if (!/^[A-Za-z0-9\.\-_~]+$/.test(userid)) {
    console.log("Invalid user id");
    res.status(404).send({"error":"No such user"});
    return;
  }

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

// This will work for both app.lifeclo.cc and lifeclo.cc
app.post('/api/:userid', function (req, res) {
  var hostname = req.headers.host.split(":")[0];
  if (!hostname.startsWith('app.') && hostname !== 'lifeclo.cc' && hostname !== 'localhost') {
    res.status(404).send();
    return;
  }

  const userid = req.params.userid;
  console.log("Saving user: ", userid );

  if ( !req.body.birthday ) {
    res.status(400).send({"error": "No birthday"})
    return
  }
  const birthday = req.body.birthday

  if (!/^[A-Za-z0-9\.\-_~]+$/.test(userid)) {
    console.log("Invalid user id");
    res.status(400).send({"error":"Invalid userid"});
    return;
  }

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


// Set up the static page urls
function setStaticPages(subdomain, directory) {
  app.use(vhost(`${subdomain}localhost`, express.static(`${directory}`)))
  app.use(vhost(`${subdomain}lifeclo.cc`, express.static(`${directory}`)))
  
}
setStaticPages('', 'site')
setStaticPages('app.', 'site-app')
setStaticPages('manual.', 'site/manual')
setStaticPages('source.', 'site/source')
setStaticPages('keebs.', 'site/keebs')
setStaticPages('keeb.', 'site/keebs/keeb-redirect')
setStaticPages('manual.keebs.', 'site/keebs-how/redirect')
setStaticPages('how.keebs.', 'site/keebs-how')
setStaticPages('metro.', 'site/metro')
setStaticPages('how.metro.', 'site/metro-how')

// All subdomains will have an assets subfolder
app.use('/assets', express.static('site/assets'))

app.listen(port, () => console.log(`Lifeclo.cc app listening on port ${port}!`))