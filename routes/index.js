const routes = require('express').Router();
const movie = require('./movies');

routes.use('/', require('./swagger'));
routes.use('/movies', movie);


routes.use('/', (req, res, next) => {
    
    req.docData = {
        documentationURL: 'https://github.com/sterlingt22/movie_manager.git',
    };
   
    next();
});

module.exports = routes;
