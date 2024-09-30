const pool = require('./pool.js');

async function selectAllTitles() {
  // select all titles along with author and genre info
  const SQL = `SELECT books.book_id, books.title, authors.author_name, genres.genre_name FROM books 
  JOIN authors ON books.author_id=authors.author_id
  JOIN genres ON books.genre_id=genres.genre_id;`;

  const { rows } = await pool.query(SQL);
  return rows;
}

async function selectTitle(id) {
  // Select specific title based on id
  const SQL = `SELECT books.book_id, books.title, authors.author_name, genres.genre_name FROM books 
  JOIN authors ON books.author_id=authors.author_id
  JOIN genres ON books.genre_id=genres.genre_id
  WHERE books.book_id=$1;`;

  const { rows } = await pool.query(SQL, [id]);
  return rows[0];
}

async function selectAllAuthors() {
  // select all authors and count the number of books by author
  const SQL = `SELECT authors.author_id, authors.author_name, COUNT(books.title) AS number_of_titles
  FROM authors
  JOIN books ON books.author_id = authors.author_id
  GROUP BY authors.author_id, authors.author_name`;

  const { rows } = await pool.query(SQL);
  return rows;
}

async function selectAuthor(id) {
  // Select books by specific author
  const SQL = `SELECT books.book_id, books.title, authors.author_name, genres.genre_name
  FROM books
  JOIN authors ON books.author_id=authors.author_id
  JOIN genres ON books.genre_id=genres.genre_id
  WHERE authors.author_id=$1;`;

  const { rows } = await pool.query(SQL, [id]);
  return rows;
}

async function selectAllGenres() {
  const SQL = `SELECT genres.genre_id, genres.genre_name, COUNT(books.title) AS number_of_titles FROM genres
  JOIN books ON books.genre_id=genres.genre_id
  GROUP BY genres.genre_name, genres.genre_id;`;

  const { rows } = await pool.query(SQL);
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
