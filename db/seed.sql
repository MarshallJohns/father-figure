 CREATE TABLE dads(
  id SERIAL  PRIMARY KEY,
  first_name VARCHAR(25),
  last_name VARCHAR(25),
  email VARCHAR(30),
  hash TEXT
 );

CREATE TABLE user_info (
    id SERIAL PRIMARY KEY,
    profile_pic TEXT,
    zipcode INT,
    user_id INT REFERENCES dads(id)
);

CREATE TABLE jokes(
    joke_id SERIAL PRIMARY KEY,
    joke_text TEXT,
    user_id  INT REFERENCES dads(id)
);