table favorites (
    id serial primary key,
    user_id integer not null references users(id),
    recipe_id text references recipes(id)
)