const { Router } = require('express');

const router = Router();

// title routes
router.get('/titles/:id');
router.get('/titles');

// genre routes
router.get('/genres/:id');
router.get('/genres');

// author routes
router.get('/authors/:id');
router.get('/authors');

// CRUD endpoints
router.post('/add');
router.put('/update/:id');
router.delete('/delete/:id');

// index route
router.get('/', (req, res) => {
  res.send('Hello, Router!');
});

module.exports = router;
