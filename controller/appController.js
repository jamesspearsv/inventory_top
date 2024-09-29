const db = require('../db/dbController');

async function getAllTitles(req, res) {
  const rows = await db.selectAllTitles();
  res.json(rows);
}

async function getTitle(req, res) {
  const id = req.params.id;
  const row = await db.selectTitle(id);
  row ? res.json(row) : res.send('no title found');
}

async function getAllAuthors(req, res) {
  const rows = await db.selectAllAuthors();
  res.json(rows);
}

async function getAuthor(req, res) {
  const id = req.params.id;
  const rows = await db.selectAuthor(id);
  rows.length > 0 ? res.json(rows) : res.send('Nothing found');
}

async function getAllGenres(req, res) {
  const rows = await db.selectAllGenres();
  res.json(rows);
}

async function getGenre(req, res) {
  const id = req.params.id;
  const rows = await db.selectGenre(id);

  rows.length > 0 ? res.json(rows) : res.send('Nothing found');
}

module.exports = {
  getAllTitles,
  getTitle,
  getAllAuthors,
  getAuthor,
  getAllGenres,
  getGenre,
};
