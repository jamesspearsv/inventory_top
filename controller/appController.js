const db = require('../db/dbController');

async function getAllTitles(req, res) {
  const rows = await db.selectAllTitles();
  res.render('titles', { books: rows });
}

async function getTitle(req, res) {
  const id = req.params.id;
  const row = await db.selectTitle(id);
  row ? res.json(row) : res.send('no title found');
}

async function getAllAuthors(req, res) {
  const rows = await db.selectAllAuthors();
  res.render('authors', { authors: rows });
}

async function getAuthor(req, res) {
  const id = req.params.id;
  const rows = await db.selectAuthor(id);
  rows.length > 0 ? res.json(rows) : res.send('Nothing found');
}

async function getAllGenres(req, res) {
  const rows = await db.selectAllGenres();
  res.render('genres', { genres: rows });
}

async function getGenre(req, res) {
  const id = req.params.id;
  const rows = await db.selectGenre(id);

  rows.length > 0 ? res.json(rows) : res.send('Nothing found');
}

function addBookGet(req, res) {
  res.render('add');
}

async function addBookPost(req, res) {
  const data = {
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    genre: req.body.genre.toLowerCase().trim(),
  };

  await db.insertIntoBooks(data);
  res.redirect('/titles');
}

async function deleteBook(req, res) {
  const book_id = req.params.id;
  await db.deleteFromBooks(book_id);
  res.redirect('/titles');
}

async function updateGet(req, res) {
  const book_id = req.params.id;
  const row = await db.selectTitle(book_id);
  res.render('update', { book: row });
}

async function updatePost(req, res) {
  const book_id = req.params.id;
  const data = {
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    genre: req.body.genre.trim(),
  };

  await db.updateBook(book_id, data);
  res.redirect('/titles');
}

module.exports = {
  getAllTitles,
  getTitle,
  getAllAuthors,
  getAuthor,
  getAllGenres,
  getGenre,
  addBookGet,
  addBookPost,
  deleteBook,
  updateGet,
  updatePost,
};
