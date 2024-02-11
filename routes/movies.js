const express = require('express');
const router = express.Router();
const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const moviesController = require('../controllers/movies');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', moviesController.createMovie);

router.put('/:id', moviesController.updateMovie);

router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
