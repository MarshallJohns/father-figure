 CREATE TABLE dads(
  id SERIAL  PRIMARY KEY
  first_name VARCHAR(25)
  last_name VARCHAR(25)
  email VARCHAR(30)
  hash TEXT
 )

Table "user_info" {
  "id" int [pk, increment]
  "profile_pic" TEXT
  "zipcode" INT
  "user_id" INT
}

Table "jokes" {
  "joke_id" int [pk, increment]
  "joke_text" TEXT
  "user_id" INT
}