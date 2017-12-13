delete from favorites
where user_id = $1 and recipe_id = $2;

select * from favorites 
where user_id = $1