-- DROP DATABASE
DROP DATABASE IF EXISTS kanban_db;

-- CREATE DATABASE
CREATE DATABASE kanban_db;

\c kanban_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,           
    username VARCHAR(255) UNIQUE,   
    password VARCHAR(255),           -- Hashed password
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically set creation time
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Automatically set last update time
);

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL, 
    description TEXT,
    assignedUserId INTEGER,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (assignedUserId) REFERENCES users(id)
);