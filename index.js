// Import
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// MiddleWare
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SERVER IS WORKING");
});

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
