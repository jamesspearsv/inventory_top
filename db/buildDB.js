const { Client } = require('pg');
require('dotenv').config();

async function main() {
  const SQL = `
    CREATE TABLE IF NOT EXISTS authors(
    author_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author_name VARCHAR (100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS genres(
    genre_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre_name VARCHAR (100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS books(
    book_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    genre_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
    );
    `;

  const client = new Client();

  try {
    await client.connect();
    console.log('>>> connected to db...');
    await client.query(SQL);
    console.log('>>> created tables...');
    await client.end();
    console.log('>>> done!');
  } catch (error) {
    console.error('Error building tables...');
    console.error(error);
  }
}

main();
