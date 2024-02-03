const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 8888;

const server = http.createServer(app);

mongoose
  .connect(
    "mongodb+srv://nandiyawarsantosh0719:GGPzBWAedYeONmht@cluster0.zjupeg1.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected Database");
    server.listen(port, () => {
      console.log("Server Running");
    });
  })
  .catch((error) => {
    console.log(error);
  });
