-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'USERS'
-- tabla informacion usuarios
-- ---

DROP TABLE IF EXISTS `USERS`;
		
CREATE TABLE `USERS` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `usuario` INTEGER(50) NOT NULL DEFAULT NULL,
  `nombre` VARCHAR(50) NOT NULL DEFAULT 'NULL',
  `email` VARCHAR(50) NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
) COMMENT 'tabla informacion usuarios';

-- ---
-- Table 'POINTS'
-- Puntos actuales de cada jugador
-- ---

DROP TABLE IF EXISTS `POINTS`;
		
CREATE TABLE `POINTS` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_USERS` INTEGER NULL DEFAULT NULL,
  `puntos` INTEGER NOT NULL DEFAULT 500,
  PRIMARY KEY (`id`)
) COMMENT 'Puntos actuales de cada jugador';

-- ---
-- Table 'GAME_BINGO'
-- Jugadas de los usuarios en el juego Bingo
-- ---

DROP TABLE IF EXISTS `GAME_BINGO`;
		
CREATE TABLE `GAME_BINGO` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `fecha` DATETIME NOT NULL DEFAULT 'NULL',
  `id_GAMES` INTEGER NULL DEFAULT NULL,
  `id_USERS` INTEGER NULL DEFAULT NULL,
  `puntos_inicial` INTEGER NOT NULL DEFAULT NULL,
  `puntos_final` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'Jugadas de los usuarios en el juego Bingo';

-- ---
-- Table 'GAMES'
-- Informacion de los distintos juegos disponibles
-- ---

DROP TABLE IF EXISTS `GAMES`;
		
CREATE TABLE `GAMES` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `games` CHAR NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
) COMMENT 'Informacion de los distintos juegos disponibles';

-- ---
-- Table 'GAME_CARTAS'
-- Jugadas de los usuarios con el juego Cartas
-- ---

DROP TABLE IF EXISTS `GAME_CARTAS`;
		
CREATE TABLE `GAME_CARTAS` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_GAMES` INTEGER NULL DEFAULT NULL,
  `id_USERS` INTEGER NULL DEFAULT NULL,
  `puntos_inicial` INTEGER NOT NULL DEFAULT NULL,
  `puntos_final` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'Jugadas de los usuarios con el juego Cartas';

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `POINTS` ADD FOREIGN KEY (id_USERS) REFERENCES `USERS` (`id`);
ALTER TABLE `GAME_BINGO` ADD FOREIGN KEY (id_GAMES) REFERENCES `GAMES` (`id`);
ALTER TABLE `GAME_BINGO` ADD FOREIGN KEY (id_USERS) REFERENCES `USERS` (`id`);
ALTER TABLE `GAME_CARTAS` ADD FOREIGN KEY (id_GAMES) REFERENCES `GAMES` (`id`);
ALTER TABLE `GAME_CARTAS` ADD FOREIGN KEY (id_USERS) REFERENCES `USERS` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `USERS` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `POINTS` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `GAME_BINGO` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `GAMES` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `GAME_CARTAS` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `USERS` (`id`,`usuario`,`nombre`,`email`) VALUES
-- ('','','','');
-- INSERT INTO `POINTS` (`id`,`id_USERS`,`puntos`) VALUES
-- ('','','');
-- INSERT INTO `GAME_BINGO` (`id`,`fecha`,`id_GAMES`,`id_USERS`,`puntos_inicial`,`puntos_final`) VALUES
-- ('','','','','','');
-- INSERT INTO `GAMES` (`id`,`games`) VALUES
-- ('','');
-- INSERT INTO `GAME_CARTAS` (`id`,`id_GAMES`,`id_USERS`,`puntos_inicial`,`puntos_final`) VALUES
-- ('','','','','');