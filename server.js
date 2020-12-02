const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const urlRouter = require('./routes/url');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('port', (process.env.PORT || 5000))

const mongoDBEndpoint = process.env.MONGODB_URI || 'mongodb://127.0.0.1/collection_name';
mongoose.connect(mongoDBEndpoint, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to mongodb'));

app.use('/url', urlRouter);

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})