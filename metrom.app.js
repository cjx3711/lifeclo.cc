const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');
const vhost = require('vhost')

const app = express()
const port = 9001

const database = {}

// Set up the static page urls
function setStaticPages(subdomain, directory) {
  app.use(vhost(`${subdomain}localhost`, express.static(`${directory}`)))
  app.use(vhost(`${subdomain}metrom.app`, express.static(`${directory}`)))
}
setStaticPages('', 'metrom.app/main')
setStaticPages('how.', 'metrom.app/how')

// All subdomains will have an assets subfolder
app.use('/assets', express.static('site/assets'))

app.listen(port, () => console.log(`MetroM.app app listening on port ${port}!`))