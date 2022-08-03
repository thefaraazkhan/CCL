-- DROP DATABASE IF EXISTS perntodo;
CREATE DATABASE pern - todo;

\ c pern - todo;

-- Create a new table named todo
-- add 2 columns -> first one is key and second for todo text
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

-- Inserting a row with text 'get a job' (id will be auto assigned)
INSERT INTO
    todo (description)
VALUES
    ('Get a job')