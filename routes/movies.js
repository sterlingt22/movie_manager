const express = require('express');
const routes = express.Router(); // Change variable name from router to routes
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
const moviesController = require('../controllers/movies');
const validateMovie = require('../middleware/validate');
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: '57xg29C13cCPU6zkthW0Q5Cg5PuUcWtNn_KkFymFeOXwolvRFNREgmCMp8oBqt5h',
    baseURL: 'https://cse341-winter24-uqt1.onrender.com',
    clientID: 'Hff8lp9f8fLlCcAPpCktmmcEXRRNk5VP',
    issuerBaseURL: 'https://dev-aq4g00mxk5l1itvh.us.auth0.com'
};

routes.get('/', auth(config), moviesController.getAll);
routes.get('/:id', auth(config), moviesController.getSingle);
routes.post('/', auth(config), validateMovie, moviesController.createMovie);
routes.put('/:id', auth(config), validateMovie, moviesController.updateMovie);
routes.delete('/:id', auth(config), moviesController.deleteMovie);

module.exports = routes;
