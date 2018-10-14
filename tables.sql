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
locName TEXT,
locLat DECIMAL(38, 6),
locLong DECIMAL(38, 6),
selectedTime TEXT,
details TEXT,
postedAt TIMESTAMPTZ
distance INTEGER DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS schedule(
id SERIAL PRIMARY KEY,
user_id INTEGER,
post_id INTEGER,
accept_time TIMESTAMP,
readby BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS chat(
	id SERIAL PRIMARY KEY,
	currentuser_id INTEGER,
	otheruser_id INTEGER,
	chat TEXT
);