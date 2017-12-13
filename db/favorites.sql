select * from favorites
where user_id = $1
order by recipe_name asc