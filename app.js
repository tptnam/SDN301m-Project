const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
app.use(cors());
const db = require("./database/dtb");
const User = require("./database/Schemas/User");
const Booking = require("./database/Schemas/Booking");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

db();

app.use(bodyParser());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
