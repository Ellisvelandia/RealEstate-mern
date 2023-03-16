const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();

require("./connect/db");

mongoose.set("strictQuery", false);
app.use(cors());
app.use(express.json());




app.listen(process.env.PORT, () =>
  console.log("Server has been started successfully")
);
