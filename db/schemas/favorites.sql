table favorites (
    user_id integer not null references users(id),
    recipe_id integer,
    recipe_name text,
    recipe_image text,
    recipe_source text
)