require("dotenv").config();
const http = require("http");
const app = require("./index");

const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port);
