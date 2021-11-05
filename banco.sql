CREATE DATABASE projeto_teste;

USE projeto_teste;
CREATE TABLE cargo (id INT NOT NULL auto_increment, nome VARCHAR(100) NOT NULL, PRIMARY KEY(id));

INSERT INTO cargo (nome) VALUES ('Analista de Requisitos');
INSERT INTO cargo (nome) VALUES ('Desenvolvedor Sênior');
INSERT INTO cargo (nome) VALUES ('Desenvolvedor Pleno');
INSERT INTO cargo (nome) VALUES ('Desenvolvedor Júnior');
INSERT INTO cargo (nome) VALUES ('DBA');
INSERT INTO cargo (nome) VALUES ('Tester');

CREATE TABLE colaborador (id INT NOT NULL auto_increment, nome VARCHAR(100) NOT NULL, salario FLOAT NOT NULL, primary key(id));
INSERT INTO colaborador (nome, salario) VALUES ('Alan Turing', 4180);
INSERT INTO colaborador (nome, salario) VALUES ('Edsger Dijkstra', 3657.5);
INSERT INTO colaborador (nome, salario) VALUES ('Katherine Johnson', 3657.5);
INSERT INTO colaborador (nome, salario) VALUES ('Mary Kenneth Keller', 5225);
INSERT INTO colaborador (nome, salario) VALUES ('Hedy Lamarr', 6792.5);
INSERT INTO colaborador (nome, salario) VALUES ('Ada Lovelace', 4702.5);
INSERT INTO colaborador (nome, salario) VALUES ('Linus Torvalds', 5225);
INSERT INTO colaborador (nome, salario) VALUES ('Niklaus Wirth', 3657.5);
INSERT INTO colaborador (nome, salario) VALUES ('Radia Perlman', 3657.5);
INSERT INTO colaborador (nome, salario) VALUES ('Grace Hopper', 4180);

ALTER TABLE cargo ADD tipo CHAR(1) NOT NULL;
ALTER TABLE cargo ADD deleted_at VARCHAR(25);
ALTER TABLE cargo ADD salario_minimo FLOAT NOT NULL;
ALTER TABLE cargo ADD salario_maximo FLOAT NOT NULL;

UPDATE cargo SET tipo = 'A', salario_minimo = 3135, salario_maximo = 7315 WHERE nome = 'Analista de Requisitos';
UPDATE cargo SET tipo = 'A', salario_minimo = 3135, salario_maximo = 7315 WHERE nome = 'Tester';
UPDATE cargo SET tipo = 'I', salario_minimo = 3135, salario_maximo = 7315 WHERE nome = 'DBA';
UPDATE cargo SET tipo = 'D', salario_minimo = 3135, salario_maximo = 4180 WHERE nome = 'Desenvolvedor Júnior';
UPDATE cargo SET tipo = 'D', salario_minimo = 4702.5, salario_maximo = 5747.5 WHERE nome = 'Desenvolvedor Pleno';
UPDATE cargo SET tipo = 'D', salario_minimo = 6270, salario_maximo = 7315 WHERE nome = 'Desenvolvedor Sênior';

ALTER TABLE colaborador ADD id_cargo INT;
ALTER TABLE colaborador ADD deleted_at VARCHAR(25);
ALTER TABLE colaborador ADD FOREIGN KEY (id_cargo) REFERENCES cargo(id);

UPDATE colaborador SET id_cargo = 6 WHERE nome = 'Alan Turing';
UPDATE colaborador SET id_cargo = 4 WHERE nome = 'Edsger Dijkstra';
UPDATE colaborador SET id_cargo = 4 WHERE nome = 'Katherine Johnson';
UPDATE colaborador SET id_cargo = 3 WHERE nome = 'Mary Kenneth Keller';
UPDATE colaborador SET id_cargo = 2 WHERE nome = 'Hedy Lamarr';
UPDATE colaborador SET id_cargo = 1 WHERE nome = 'Ada Lovelace';
UPDATE colaborador SET id_cargo = 3 WHERE nome = 'Linus Torvalds';
UPDATE colaborador SET id_cargo = 4 WHERE nome = 'Niklaus Wirth';
UPDATE colaborador SET id_cargo = 4 WHERE nome = 'Radia Perlman';
UPDATE colaborador SET id_cargo = 6 WHERE nome = 'Grace Hopper';

ALTER TABLE colaborador CHANGE COLUMN id_cargo id_cargo INT NOT NULL;