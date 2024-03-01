const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Validator = require('validator');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const jwtCheck = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

function isAuthenticated(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Token is not valid' });
    }
}

const validateMovie = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 50 })
    .withMessage('Title must be at most 50 characters'),
  check('genre')
    .notEmpty()
    .withMessage('Genre is required')
    .isLength({ max: 50 })
    .withMessage('Genre must be at most 50 characters'),
  check('director')
    .notEmpty()
    .withMessage('Director is required')
    .isLength({ max: 50 })
    .withMessage('Director must be at most 50 characters'),
  check('year')
    .optional()
    .trim()
    .isNumeric()
    .withMessage('Year must be a number'),
  check('rating')
    .optional()
    .isIn(['G', 'PG', 'PG-13', 'R', 'NC-17'])
    .withMessage('Rating must be one of G, PG, PG-13, R, or NC-17'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const customMessages = {
        'title.notEmpty': 'Title is required',
        'genre.notEmpty': 'Genre is required',
        'director.notEmpty': 'Director is required',
        'title.isLength': 'Title must be at most 50 characters',
        'genre.isLength': 'Genre must be at most 50 characters',
        'director.isLength': 'Director must be at most 50 characters',
        'year.isNumeric': 'Year must be a number',
        'rating.isIn': 'Rating must be one of G, PG, PG-13, R, or NC-17',
      };
      
      return res.status(422).json({ errors: errors.array() });
    }

    const { title, genre, director, year, rating } = req.body;
    const movie = { title, genre, director };

    if (year) {
      movie.year = parseInt(year, 10);
    }

    if (rating) {
      movie.rating = rating;
    }

    req.validatedMovie = movie;
    next();
  }
];

const validateActor = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 50 })
    .withMessage('Title must be at most 50 characters'),
  check('release_year')
    .notEmpty()
    .withMessage('Release year is required')
    .isNumeric()
    .withMessage('Release year must be a number'),
  check('actors')
    .isArray({ min: 1 })
    .withMessage('At least one actor must be provided')
    .custom((value, { req }) => {
      if (!value.every(actor => typeof actor === 'string')) {
        throw new Error('Actors must be strings');
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const customMessages = {
        'title.notEmpty': 'Title is required',
        'release_year.notEmpty': 'Release year is required',
        'release_year.isNumeric': 'Release year must be a number',
        'actors.isArray': 'At least one actor must be provided',
        'actors.custom': 'Actors must be strings',
      };
      
      return res.status(422).json({ errors: errors.array() });
    }

    const { title, release_year, actors } = req.body;
    const actor = { title, release_year, actors };

    if (release_year) {
      actor.release_year = parseInt(release_year, 10);
    }

    req.validatedActor = actor;
    next();
  }
];

module.exports = {
  validateMovie,
  validateActor,
  isAuthenticated
};