select image_url from recipes
join favorites on recipe.id = favorites.recipe_id
join users on users.id = favorites.user_id
where favorites.user_id = users.id & favorites.recipe_id = recipes.id