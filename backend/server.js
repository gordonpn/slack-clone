const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db_uri = process.env.ATLAS_URI;
mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

require('./routes/channels.routes.js')(app);

app.listen(port, () => {
  console.log('Server is running on port: ${port}');
});
