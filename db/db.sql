CREATE TABLE Publisher(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(50)
	);

CREATE TABLE Genre(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(50)
    );
   
CREATE TABLE Tags(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(50)
    );

CREATE TABLE Game(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(50),
    description varchar(200),
    price double,
    release_date date
    );

CREATE TABLE Game_Tags(
    id int AUTO_INCREMENT PRIMARY KEY,
    game_id int,
    tag_id int,
    FOREIGN KEY(game_id) REFERENCES game(id),
    FOREIGN KEY(tag_id) REFERENCES tags(id)
    );
    
CREATE TABLE Game_Genre(
    id int AUTO_INCREMENT PRIMARY KEY,
    game_id int,
    genre_id int,
    FOREIGN KEY(game_id) REFERENCES game(id),
    FOREIGN KEY(genre_id) REFERENCES genre(id)
    );
    
CREATE TABLE Game_Publisher(
    id int AUTO_INCREMENT PRIMARY KEY,
    game_id int,
    publisher_id int,
    FOREIGN KEY(game_id) REFERENCES game(id),
    FOREIGN KEY(publisher_id) REFERENCES publisher(id)
    );