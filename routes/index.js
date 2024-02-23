const express = require('express');
const app = require('../server');
const movie = require('./movies');
const routes = express.Router();
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'https://cse341-winter24-uqt1.onrender.com',
    clientID: 'Hff8lp9f8fLlCcAPpCktmmcEXRRNk5VP',
    issuerBaseURL: 'https://dev-aq4g00mxk5l1itvh.us.auth0.com'
};
  
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
  
// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

routes.use('/', require('./swagger'));
routes.use('/movies', movie);

routes.use('/', (req, res, next) => {
    req.docData = {
        documentationURL: 'https://github.com/sterlingt22/movie_manager.git',
    };
    next();
});

module.exports = routes;
