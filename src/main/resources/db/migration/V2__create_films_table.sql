DROP TABLE IF EXISTS films;
CREATE TABLE films (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  img_url TEXT NOT NULL,
  year INTEGER NOT NULL,
  genre_id INTEGER NOT NULL REFERENCES genres(id)
);