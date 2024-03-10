const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "views");
// const ejsLint = require('ejs-lint');
// const db = require("./database/dtb");
// const User = require("./database/Schemas/User");
// const Booking = require("./database/Schemas/Booking");
const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");
const viewRoutes = require("./ejs-routes/ejs-routes");

const db = require("./database/dtb");
// const User = require('./database/Schemas/User');
// const Booking = require('./database/Schemas/Booking');
const BookingDetail = require("./routes/bookingDetailRoutes.js");
const Packages = require("./routes/packagesRoutes.js");
const StyleParty = require("./routes/stylePartyRoutes.js");
const Booking = require("./routes/bookingRoutes.js");
const menuRouter = require("./routes/MenuRoutes.js");
const ServiceRouter = require("./routes/ServiceRoutes.js");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", Packages);
app.use("/api", Booking);
app.use("/api", BookingDetail);
app.use("/api", Booking);
app.use("/api", menuRouter);
app.use("/api", ServiceRouter);
app.use("/api", StyleParty);

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
app.use("/", viewRoutes);
