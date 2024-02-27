const express = require('express');
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
const moviesController = require('../controllers/movies');
const validateMovie = require('../middleware/validate');

const routes = express.Router();

routes.get('/', moviesController.getAll);
routes.get('/:id', moviesController.getSingle);
routes.post('/', validateMovie, moviesController.createMovie);
routes.put('/:id', validateMovie, moviesController.updateMovie);
routes.delete('/:id', moviesController.deleteMovie);

module.exports = routes;