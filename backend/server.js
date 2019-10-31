const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Chatkit = require('@pusher/chatkit-server');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:55ce6f9e-f791-4467-ac53-ad1c8a1ecd27',
  key: 'dfead682-b3e8-4ffc-a159-0a96272d493a:6XDyimo6EBQJWGIQz4at5aaZmCzWyHYxDWoAn+ecwjI='
});

app.set('chatKit', chatkit);

const db_uri = process.env.ATLAS_URI;
mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

require('./routes/channels.routes.js')(app);
require('./routes/users.routes.js')(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
