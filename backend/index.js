const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const authController = require("./controllers/authController");
const propertyController = require("./controllers/propertyController");
const uploadController = require("./controllers/uploadController");
const app = express();

require("./connect/db");
mongoose.set("strictQuery", false);
app.use("/images", express.static("public/images"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authController);
app.use("/property", propertyController);
app.use("/upload", uploadController);


const port = process.env.PORT || 4001;
app.listen(port, () => console.log("Server has been started"));
