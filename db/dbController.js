const pool = require('./pool.js');

async function selectAllTitles() {
  const SQL = `SELECT books.book_id, books.title, authors.author_name, genres.genre_name FROM books 
  JOIN authors ON books.author_id=authors.author_id
  JOIN genres ON books.genre_id=genres.genre_id;`;

  const { rows } = await pool.query(SQL);
  return rows;
}

async function selectTitle(id) {
  const SQL = `SELECT books.book_id, books.title, authors.author_name, genres.genre_name FROM books 
  JOIN authors ON books.author_id=authors.author_id
  JOIN genres ON books.genre_id=genres.genre_id
  WHERE books.book_id=$1;`;

  const { rows } = await pool.query(SQL, [id]);
  return rows[0];
}

async function selectAllAuthors() {
  const { rows } = await pool.query(`SELECT * FROM authors;`);
  return rows;
}

async function selectAuthor(id) {
  const SQL = `SELECT books.book_id, books.title, authors.author_name, genres.genre_name
  FROM books
  JOIN authors ON books.author_id=authors.author_id
  JOIN genres ON books.genre_id=genres.genre_id
  WHERE authors.author_id=$1;`;

  const { rows } = await pool.query(SQL, [id]);
  return rows;
}

async function selectAllGenres() {
  const { rows } = await pool.query(`SELECT * FROM genres;`);
  return rows;
}

async function selectGenre(id) {
  const SQL = `SELECT books.book_id, books.title, authors.author_name, genres.genre_name
  FROM books
  JOIN authors ON books.author_id=authors.author_id
  JOIN genres ON books.genre_id=genres.genre_id
  WHERE genres.genre_id=$1;`;

  const { rows } = await pool.query(SQL, [id]);
  return rows;
}

module.exports = {
  selectAllTitles,
  selectTitle,
  selectAllAuthors,
  selectAuthor,
  selectAllGenres,
  selectGenre,
};
