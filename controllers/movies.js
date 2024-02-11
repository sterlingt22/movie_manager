const express = require('express');
const router = express.Router();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('movies').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingle = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('movies').find({ _id: movieId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = {
      title: req.body.title,
      genre: req.body.genre,
      director: req.body.director,
      year: req.body.year,
      rating: req.body.rating
    };
    const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
    if (response.acknowledged) {
      const createdMovie = response.ops[0];
      res.status(201).json(createdMovie);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the movie.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const movie = {
      title: req.body.title,
      genre: req.body.genre,
      director: req.body.director,
      year: req.body.year,
      rating: req.body.rating
    };
    const response = await mongodb.getDb().db().collection('movies').replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('movies').deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,

};
