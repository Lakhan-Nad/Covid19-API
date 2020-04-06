require("dotenv").config();
const http = require("http");
const app = require("./index");

const server = http.createServer(app);

const port = process.env.port || 8000;

server.listen(port);
