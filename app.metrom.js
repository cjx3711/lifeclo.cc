const express = require("express");
const vhost = require("vhost");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 2030;

// Development mode check
const isDev = process.env.NODE_ENV !== "production";

// Set up the static page urls
function setStaticPages(subdomain, directory) {
  app.use(vhost(`${subdomain}localhost`, express.static(`${directory}`)));
  app.use(vhost(`${subdomain}metrom.app`, express.static(`${directory}`)));
}

// Root domain handling
if (isDev) {
  console.log("Development mode");
  app.use(
    vhost(
      "localhost",
      createProxyMiddleware({
        target: "http://localhost:2031",
        changeOrigin: true,
      })
    )
  );
  app.use(
    vhost(
      "metrom.app",
      createProxyMiddleware({
        target: "http://localhost:2031",
        changeOrigin: true,
      })
    )
  );
} else {
  console.log("Production mode");
  // Production static file serving
  setStaticPages("", "metrom.app/dist");
}

setStaticPages("old.", "old.metrom.app/main");
setStaticPages("old.how.", "old.metrom.app/how");

// All subdomains will have an assets subfolder
app.use("/assets", express.static("shared_assets"));

app.listen(port, () =>
  console.log(`MetroM.app app listening on port ${port}!`)
);
