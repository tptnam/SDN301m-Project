const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

// const db = require("./database/dtb");
// const User = require("./database/Schemas/User");
// const Booking = require("./database/Schemas/Booking");
const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const db = require("./database/dtb");
// const User = require('./database/Schemas/User');
// const Booking = require('./database/Schemas/Booking');
const BookingDetail = require("./routes/bookingDetailRoutes.js");
const Packages = require("./routes/packagesRoutes.js");
const StyleParty = require("./routes/stylePartyRoutes.js");
const Booking = require("./routes/bookingRoutes.js");
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api", Packages);
app.use("/api", Booking);
app.use("/api", BookingDetail);

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
app.use("/api", Packages);
app.use("/api", StyleParty);
