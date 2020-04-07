const express = require("express");
const mongoose = require("mongoose");
const victimRoutes = require("./routes/victimRouter");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  (err) => {
    if (!err) {
      console.log("Connected to db :)");
    } else {
      console.log("Unable to Connect to db ):");
      process.exit(1);
    }
  }
);

app.use(express.json());

app.use("/victim", victimRoutes);

app.use((req, res, next) => {
  next({ status: 404, message: "Requested route does not exist." });
});

// Common Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
