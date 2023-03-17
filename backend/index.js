const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const authController = require("./controllers/authController");
const app = express();

require("./connect/db");
mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authController);


app.listen(4001, () => {
  console.log(`Node API app is running on port 4001`);
});