const { Router } = require('express');
const controller = require('../controller/appController');

const router = Router();

// title routes
router.get('/titles/:id', controller.getTitle);
router.get('/titles', controller.getAllTitles);

// genre routes
router.get('/genres/:id', controller.getGenre);
router.get('/genres', controller.getAllGenres);

// author routes
router.get('/authors/:id', controller.getAuthor);
router.get('/authors', controller.getAllAuthors);

// CRUD endpoints to interact books table
router.post('/add');
router.put('/update/:id');
router.delete('/delete/:id');

// index route
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
