const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 9000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const database = {}

app.use(express.static('site'))

app.get('/api/:userid', function (req, res) {
  const userid = req.params.userid;
  if (userid in database) {
    res.send({"data": database[userid]})
  } else {
    res.send({"error":"No such user"})
  }
})

app.post('/api/:userid', function (req, res) {
  console.log("App post")
  console.log(req.body.data)
  const userid = req.params.userid;
  if (userid in database) {
    res.send({"error":"User exists"})
  } else {
    if ( !req.body.data ) {
      res.send({"error": "No data"})
    } else {
      database[userid] = req.body.data
      res.send(database[userid])
    }
  }
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))