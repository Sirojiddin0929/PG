CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(55) NOT NULL,
    email VARCHAR(55) NOT NULL UNIQUE,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(200) NOT NULL,
    address VARCHAR(55) NOT NULL
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(55) NOT NULL,
    content TEXT NOT NULL, 
    slug VARCHAR(55) NOT NULL,
    user_id INT REFERENCES users(id)
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INT REFERENCES posts(id),
    user_id INT REFERENCES users(id)
);


