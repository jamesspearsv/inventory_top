const { Client } = require('pg');
require('dotenv').config();

async function main() {
  const SQL = `
    INSERT INTO authors(author_name) VALUES
    ('Andy Weir'),
    ('J.R.R. Tolkien'),
    ('Frank Herbert');

    INSERT INTO genres(genre_name) VALUES 
    ('science fiction'),
    ('fantasy');

    INSERT INTO books(title, author_id, genre_id) VALUES
    ('The Fellowship of the Ring', 2, 2),
    ('The Return of the King', 2, 2),
    ('The Two Towers', 2, 2),
    ('The Martian', 1, 1),
    ('Artemis', 1, 1),
    ('Dune', 3, 1);
    `;

  const client = new Client();

  try {
    await client.connect();
    console.log('>>> connected to db...');
    await client.query(SQL);
    console.log('>>> inserted values...');
    await client.end();
    console.log('>>> done!');
  } catch (error) {
    console.error('Error populating tables...');
    console.error(error);
  }
}

main();
