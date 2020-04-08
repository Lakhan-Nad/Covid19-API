require("dotenv").config();
const http = require("http");
const app = require("./index");

const server = http.createServer(app);

const port = process.env.PORT || 8080;

console.log("MongoDB URI: ", process.env.MONGO_URI);

console.log("Listening on port ", port);

server.listen(port);
