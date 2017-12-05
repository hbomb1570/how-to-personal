videos table (
    id serial primary key,
    video_name text,
    url text,
    tech_id integer not null references techniques(id)
)