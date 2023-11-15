const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Mount Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

// Connect Database
mongoose
  .connect(process.env.DB_URL)
  .then(()=> console.log("Database connection established!"))
  .catch((err)=> console.error(err));

// Homepage
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




// Set App to listen on port
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
