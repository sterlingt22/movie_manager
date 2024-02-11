const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const router = require('./routes'); 

const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


app.use('/', router);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
