-- DROP DATABASE IF EXISTS perntodo;
CREATE DATABASE pern - todo;

\ c pern - todo;

-- Create a new table named todo
-- add 3 columns -> first one is key , second for todo text and third for completed status
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    completed VARCHAR(255)
);

-- Inserting a row with description: 'get a job' and completed: 'false' (id will be auto assigned)
INSERT INTO
    todo (description, completed)
VALUES
    ('Get a job', 'false')