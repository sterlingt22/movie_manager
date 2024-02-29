const express = require('express');
const router = express.Router();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('actors').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingle = async (req, res) => {
  try {
    const actorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('actors').find({ _id: actorId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Must use a valid actor id' });
  }
};

const createActor = async (req, res) => {
  try {
    const actor = {
      title: req.body.title,
      release_year: req.body.release_year,
      actors: req.body.actors
    };
    const response = await mongodb.getDb().db().collection('actors').insertOne(actor);
    if (response.acknowledged) {
      res.status(201).json();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the actor.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateActor = async (req, res) => {
  try {
    const actorId = new ObjectId(req.params.id);
    const actor = {
      title: req.body.title,
      release_year: req.body.release_year,
      actors: req.body.actors
    };
    const response = await mongodb.getDb().db().collection('actors').replaceOne({ _id: actorId }, actor);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Actor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteActor = async (req, res) => {
  try {
    const actorId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('actors').deleteOne({ _id: actorId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Actor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createActor,
  updateActor,
  deleteActor,

};
