const express = require('express')
const app = express();
const path = require('path')
const mongoose = require("mongoose")
const dotenv = require('dotenv');


dotenv.config();


mongoose.connect(process.env.MongoDB_URL_Locations, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => console.log("database connection established"));
db.on('error', (err) => console.error(err));



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

const moneyBox = require('./routes/moneyBox');
app.use("/api/money", moneyBox);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})