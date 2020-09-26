INSERT INTO dads (first_name, last_name, email, hash)
VALUES ($1, $2, $3, $4)
RETURNING first_name, last_name, email;