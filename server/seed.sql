drop table if exists battles;
drop table if exists pokemon;
drop table if exists trainers;

create table trainers (
  id serial primary key,
  first_name varchar(128),
  last_name varchar(128)
);

create table pokemon (
  id serial primary key,
  trainer_id integer references trainers default null,
  poke_name varchar(128) not null,
  poke_type varchar(255) not null,
  hp integer not null,
  attack integer not null
);

create table battles (
  id serial primary key,
  battleground varchar(128) not null,
  winning_trainer integer references trainers not null,
  losing_trainer integer references trainers not null
);

INSERT INTO "trainers" ("first_name","last_name")
VALUES
('Matt','Tengasantos'),
('Murderfel','Barbasa'),
('Json','Sewell'),
('Tony','Gaskell'),
('Brock','Lanoza'),
('Andrea','Takamiya'),
('Spencer','Toyama'),
('Jesse','Copeland'),
('Kent','Salcedo'),
('Manny','Pilande');

INSERT INTO "pokemon" ("trainer_id","poke_name","poke_type","hp", "attack")
VALUES
(2, 'Blastoise', 'Water', 100, 80),
(8, 'Alakazam', 'Psychic', 80, 70),
(1, 'Magikarp', 'Water', 5, 10),
(9, 'Charizard', 'Fire', 100, 80),
(10, 'Mewtwo', 'Psychic', 110, 90),
(1, 'Zubat', 'Flying', 10, 15),
(4, 'Dragonite', 'Dragon', 120, 80),
(5, 'Jynx', 'Psychic', 60, 60),
(3, 'Rhydon', 'Rock', 90, 75),
(6, 'Gyrados', 'Water', 125, 90),
(7, 'Pikachu', 'Electric', 75, 50),
(5, 'Ekans', 'Poison', 25, 40),
(null, 'Venasaur', 'Grass', 100, 70),
(1, 'Caterpie', 'Bug', 10, 10);


INSERT INTO "battles" ("battleground", "winning_trainer", "losing_trainer")
VALUES
('MIC', 2, 1),
('Koko Head', 10, 1),
('Pewter City', 6, 3),
('Vermilion City', 8, 4),
('Back Alley', 7, 5);



