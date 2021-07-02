DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    star_rating Integer NOT NULL,
    description TEXT,
    film_id INTEGER NOT NULL REFERENCES films(id)
);