require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads' })

const app = express();
const port = process.env.PORT || 3000;

// Mount Middlewares
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Connect Database
mongoose
  .connect(process.env.DB_URL)
  .then(()=> console.log("Database connection established!"))
  .catch((err)=> console.error(err));

const fileSchema = new mongoose.Schema({
  name: String,
  type: String,
  size: Number
});
const File = mongoose.model('File', fileSchema);

// Homepage
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  const { originalname, mimetype, size } = req.file
  const fileObj = {
    name: originalname,
    type: mimetype,
    size: size
  }

  const file = await fileObj.save()

  res.json({
    name: file.name,
    type: file.type,
    size: file.size
  })
})

// Set App to listen on port
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});