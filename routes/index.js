const express = require('express');
const movie = require('./movies');
const actor = require('./actors');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'dcFCFjp14F-k78Oo6YHKZJMwb5dLstqrA0g9Z6euqcfaRzLYSK1yWST2ni0UzUfb',
    baseURL: 'https://cse341-winter24-uqt1.onrender.com',
    clientID: 'SK2BZMKiytoAFDgFtFqHXiUS71vCaN1n',
    issuerBaseURL: 'https://dev-aq4g00mxk5l1itvh.us.auth0.com'
};

routes.use(auth(config));

routes.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

routes.use('/', require('./swagger'));
routes.use('/movies', movie);
routes.use('/actors', actor);

routes.use('/', (req, res, next) => {
    req.docData = {
        documentationURL: 'https://github.com/sterlingt22/movie_manager.git',
    };
    next();
});

module.exports = routes;
