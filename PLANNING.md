# Inventory App

This is an inventory inventory mangement app project completed as a part of the Odin Project. I am setting up this app to track an inventory of books.

## Database

The database for this app should have three tables: titles, authors, and genres. Below is a rough idea for the schema of each table

**titles**

- id INT PRIMARY KEY
- title VARCHAR (255)
- pages INT
- genre_id FOREIGN KEY
- author_id FOREIGN KEY

**authors**

- id PRIMARY KEY
- first_name VARCHAR (255)
- last_name VARCHAR (255)

**genre**

- id PRIMARY KEY
- genre VARCHAR (255)

## App features

Users in the app should be able to...

- Visit an app landing page
- See all items in inventory
  - View singular items
- View all genres
  - See items in specific genres

### Routes

**GET routes**

- /
- /titles (SHOULD SHOW ALL TITLES IN DATABASE)
  - /titles/:id (SHOULD SHOW A SINGLE TITLE)
- /genres (SHOULD SHOW ALL GENRES IN DATABASE)
  - /genres/:id (SHOULD SHOW ALL TITLES IN A SINGLE GENRE)
- /authors
  - /authors/:id

**Other routes**

- /add (POST -- SHOULD ADD A NEW TITLE TO DATABASE AND RESPECTIVE GENRE/AUTHOR IS NEEDED)
- /delete/:id (DELETE -- SHOULD DELETE SPECIFIC TITLE)
- /update/:id (PUT -- SHOULD UPDATE SPECIFIC TITLE)
