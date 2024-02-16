const express = require('express');
const router = express.Router();
const mongodb = require('../db/connect');

const { ObjectId } = require('mongodb');

const moviesController = require('../controllers/movies');
const validateMovie = require('../middleware/validate');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', validateMovie, moviesController.createMovie);

router.put('/:id', validateMovie, moviesController.updateMovie);

router.delete('/:id', moviesController.deleteMovie);

module.exports = router;