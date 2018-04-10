DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;
 
DROP TABLE IF EXISTS favorites;

CREATE TABLE books (
    id int NOT NULL AUTO_INCREMENT,
    isbn integer NOT NULL,
    title varchar(50) NOT NULL,
    author varchar(50) NULL DEFAULT NULL,
    description varchar(500) NULL DEFAULT NULL,
    pages integer NULL DEFAULT NULL,
    genre varchar(20) NULL DEFAULT NULL,
    year integer NULL DEFAULT NULL,
    cover varchar(150) NULL DEFAULT NULL,
    shelf enum('favorites', 'interested', 'myshelf'),
    PRIMARY KEY (id)
);

INSERT INTO books (isbn, title, author, description, pages, genre, year, shelf) VALUES ('0060850523', 'Brave New World', 'Aldous Huxley', 'O brave new world that has such people in it', '288', 'Science Fiction', '1932', 'favorites');

-- DROP TABLE IF EXISTS interested;

-- CREATE TABLE interested (
--     id int NOT NULL AUTO_INCREMENT,
--     isbn integer NOT NULL,
--     title varchar(50) NOT NULL,
--     author varchar(50) NULL DEFAULT NULL,
--     description varchar(500) NULL DEFAULT NULL,
--     pages integer NULL DEFAULT NULL,
--     genre varchar(20) NULL DEFAULT NULL,
--     year integer NULL DEFAULT NULL,
--     cover varchar(150) NULL DEFAULT NULL,
--     PRIMARY KEY (ID)
-- );

-- INSERT INTO interested (isbn, title, author, description, pages, genre, year) VALUES ('0679720218', 'The Plague', 'Albert Camus', 'Suffering, madness, compassion', '308', 'Fiction', '1947');

-- DROP TABLE IF EXISTS shelf; 

-- CREATE TABLE shelf (
--     id int NOT NULL AUTO_INCREMENT,
--     isbn integer NOT NULL,
--     title varchar(50) NOT NULL,
--     author varchar(50) NULL DEFAULT NULL,
--     description varchar(500) NULL DEFAULT NULL,
--     pages integer NULL DEFAULT NULL,
--     genre varchar(20) NULL DEFAULT NULL,
--     year integer NULL DEFAULT NULL,
--     cover varchar(150) NULL DEFAULT NULL,
--     PRIMARY KEY (ID)
-- );

-- INSERT INTO shelf (isbn, title, author, description, pages, genre, year) VALUES ('0393319293', 'Invisible Monsters', 'Chuck Palahniuk', 'Brandy Alexander, Queen Supreme', '304', 'Satire', '1999');


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
