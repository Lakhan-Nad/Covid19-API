const http = require("http");
const app = require("./index");

const server = http.createServer(app);

const port = process.env.port || 3000;

server.listen(port);
