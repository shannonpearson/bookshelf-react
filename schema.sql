DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;
 
DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
    id int NOT NULL AUTO_INCREMENT,
    isbn integer NOT NULL,
    title varchar(50) NOT NULL,
    author varchar(50) NULL DEFAULT NULL,
    description varchar(500) NULL DEFAULT NULL,
    pages integer NULL DEFAULT NULL,
    genre varchar(20) NULL DEFAULT NULL,
    year integer NULL DEFAULT NULL,
    PRIMARY KEY (ID)
);


DROP TABLE IF EXISTS interested;

CREATE TABLE interested (
    id int NOT NULL AUTO_INCREMENT,
    isbn integer NOT NULL,
    title varchar(50) NOT NULL,
    author varchar(50) NULL DEFAULT NULL,
    description varchar(500) NULL DEFAULT NULL,
    pages integer NULL DEFAULT NULL,
    genre varchar(20) NULL DEFAULT NULL,
    year integer NULL DEFAULT NULL,
    PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS shelf; 

CREATE TABLE shelf (
    id int NOT NULL AUTO_INCREMENT,
    isbn integer NOT NULL,
    title varchar(50) NOT NULL,
    author varchar(50) NULL DEFAULT NULL,
    description varchar(500) NULL DEFAULT NULL,
    pages integer NULL DEFAULT NULL,
    genre varchar(20) NULL DEFAULT NULL,
    year integer NULL DEFAULT NULL,
    PRIMARY KEY (ID)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
