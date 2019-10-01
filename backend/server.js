const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db_uri = process.env.ATLAS_URI;
mongoose.connect(db_uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
const db_connection = mongoose.connection;
db_connection.once('open', () => {
    console.log('Database connection success');
});

require('./routes/channels.routes.js')(app);

app.listen(port, () => {
    console.log('Server is running on port: ${port}');
});
