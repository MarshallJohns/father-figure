UPDATE user_info
SET profile_pic = $2, zipcode = $3
WHERE user_id = $1;