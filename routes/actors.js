const express = require('express');
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
const actorsController = require('../controllers/actors');
const validateActor = require('../middleware/validate');

const routes = express.Router();

routes.get('/', actorsController.getAll);
routes.get('/:id', actorsController.getSingle);
routes.post('/', validateActor, actorsController.createActor);
routes.put('/:id', validateActor, actorsController.updateActor);
routes.delete('/:id', actorsController.deleteActor);

module.exports = routes;