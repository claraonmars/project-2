CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
firstname TEXT,
lastname TEXT,
email TEXT,
username TEXT,
password TEXT,
CONSTRAINT UC_users UNIQUE (username, email)
);

CREATE TABLE IF NOT EXISTS posts(
post_id SERIAL PRIMARY KEY,
user_id INTEGER,
category TEXT,
location TEXT,
selectedTime TEXT,
details TEXT,
postedAt TIMESTAMPTZ

);

CREATE TABLE IF NOT EXISTS schedule(
id SERIAL PRIMARY KEY,
user_id INTEGER,
post_id INTEGER,
accept_time TIMESTAMP
);