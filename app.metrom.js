const express = require("express");
const vhost = require("vhost");

const app = express();
const port = 2030;

// Set up the static page urls
function setStaticPages(subdomain, directory) {
  app.use(vhost(`${subdomain}localhost`, express.static(`${directory}`)));
  app.use(vhost(`${subdomain}metrom.app`, express.static(`${directory}`)));
}
setStaticPages("", "metrom.app/main");
setStaticPages("how.", "metrom.app/how");

// All subdomains will have an assets subfolder
app.use("/assets", express.static("shared_assets"));

app.listen(port, () =>
  console.log(`MetroM.app app listening on port ${port}!`)
);
