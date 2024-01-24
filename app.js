const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;

app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = require('./database/dtb');
const User = require('./database/Schemas/User');
const Booking = require('./database/Schemas/Booking');
const Packages = require('./routes/packagesRoutes.js');
const StyleParty = require('./routes/stylePartyRoutes.js');


app.use('/api', Packages);
app.use('/api', StyleParty);

db();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

