const { check, validationResult } = require('express-validator');
const Validator = require('validator');

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

module.exports = validateMovie;