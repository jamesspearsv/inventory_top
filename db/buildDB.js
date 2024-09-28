const { Client } = require('pg');
require('dotenv').config();

async function main() {
  const SQL = `
    CREATE TABLE IF NOT EXISTS authors(
    author_id INT PRIMARY KEY ALWAYS GENERATED AS IDENTITY,
    author_name VARCHAR (100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS genres(
    genre_id INT PRIMARY KEY ALWAYS GENERATED AS IDENTITY,
    genre_name VARCHAR (100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS titles(
    title_id INT PRIMARY KEY ALWAYS GENERATED AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    genre_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
    );
    `;
}

main();
