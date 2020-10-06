INSERT INTO user_info (profile_pic, zipcode, user_id)
VALUES ($1, $2, $3)
RETURNING profile_pic, zipcode
