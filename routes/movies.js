const express = require('express');
const moviesController = require('../controllers/movies');
const { validateMovie } = require('../middleware/validate'); 
const { isAuthenticated } = require('../middleware/validate');

const routes = express.Router();

routes.get('/', moviesController.getAll);
routes.get('/:id', moviesController.getSingle);
routes.post('/', validateMovie, moviesController.createMovie); 
routes.put('/:id', isAuthenticated, validateMovie, moviesController.updateMovie);
routes.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = routes;
