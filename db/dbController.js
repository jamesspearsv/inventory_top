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

async function insertIntoBooks(data) {
  // Check if author and genre already exist in database
  const authors = await pool.query(
    'SELECT * FROM authors WHERE authors.author_name=$1',
    [data.author]
  );

  const genres = await pool.query('SELECT * FROM genres WHERE genre_name=$1', [
    data.genre,
  ]);

  // Set author and genre id if possible
  let author_id = authors.rowCount ? authors.rows[0].author_id : null;
  let genre_id = genres.rowCount ? genres.rows[0].genre_id : null;

  // Add new author and genre if needed
  if (!author_id) {
    const { rows } = await pool.query(
      'INSERT INTO authors(author_name) VALUES($1) RETURNING author_id',
      [data.author]
    );

    author_id = rows[0].author_id;
  }

  if (!genre_id) {
    const { rows } = await pool.query(
      'INSERT INTO genres(genre_name) VALUES($1) RETURNING genre_id',
      [data.genre]
    );

    genre_id = rows[0].genre_id;
  }

  // Insert new book into db
  await pool.query(
    'INSERT INTO books(title, author_id, genre_id) VALUES($1, $2, $3)',
    [data.title, author_id, genre_id]
  );

  return 1;
}

async function deleteFromBooks(id) {
  await pool.query('DELETE FROM books where book_id=$1', [id]);
  return 1;
}

async function updateBook(id, data) {
  await deleteFromBooks(id);
  await insertIntoBooks(data);

  return 1;
}

module.exports = {
  selectAllTitles,
  selectTitle,
  selectAllAuthors,
  selectAuthor,
  selectAllGenres,
  selectGenre,
  insertIntoBooks,
  deleteFromBooks,
  updateBook,
};
