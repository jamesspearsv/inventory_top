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
router.get('/add', controller.addBookGet);
router.post('/add', controller.addBookPost);
router.post('/update/:id', controller.updatePost);
router.get('/update/:id', controller.updateGet);
router.post('/delete/:id', controller.deleteBook);

// index route
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
