CREATE DATABASE students;

CREATE TABLE IF NOT EXISTS users
   (id SERIAL PRIMARY KEY,
   firstname VARCHAR(100),
   lastname VARCHAR(100),
   age int,
	username VARCHAR(100),
   password VARCHAR(100),
	status varchar(100),
   verification_code varchar(6));
	
CREATE TABLE IF NOT EXISTS students
   (id SERIAL PRIMARY KEY,
   firstname VARCHAR(100),
   lastname VARCHAR(100),
   age int,
	section VARCHAR(100),
   address VARCHAR(250),
	email VARCHAR(100) UNIQUE NOT NULL,
	contact_number varchar(100));
