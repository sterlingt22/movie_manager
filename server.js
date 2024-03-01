const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;
const routes = require('./routes');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

function isAuthenticated(req, res, next) {
    if (req.oidc.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

const app = express();

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', routes);

process.on('uncaughtException', (err, origin) => {
    console.error(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        const server = app.listen(port, () => {
            console.log(`Connected to database and listening on ${port}`);
        });
        module.exports = { app, server }; 
    }
});