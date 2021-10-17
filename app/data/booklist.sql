DROP TABLE IF EXISTS book;
CREATE TABLE book (
	id int PRIMARY KEY, 
	title VARCHAR (40) UNIQUE NOT NULL,
    author VARCHAR (48) UNIQUE NOT NULL,
    yearPublished int not null,
    publisher VARCHAR (40) NOT NULL,
    pageCount int not null,
    mspr DECIMAL(5,2) NOT NULL
);

INSERT INTO book(id, title, author, yearPublished, publisher, pageCount, mspr) VALUES
	(1, 'Rich Dad Poor Dad', 'Robert T. Kiyosaki', 2017, 'Plata Publishing', 336, 10.00),
    (2, 'The Weekday Vegetarians', 'Jenny Rosenstrach', 2021, 'Clarkson Potter PUblishers', 256, 29.90),
    (3, 'Braiding Sweetgrass', 'Robin Wall Kimmerer', 2014, 'Milkweed Editions', 390, 16.56),
    (4, 'Little Women', 'Louisa May Alcott', 2004, 'Barnes&Noble', 528, 8.95)
;