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
-- Table 'PLAYS'
-- Jugadas de cada usuario
-- ---

DROP TABLE IF EXISTS `PLAYS`;
		
CREATE TABLE `PLAYS` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `fecha` DATETIME NOT NULL DEFAULT 'NULL',
  `id_USERS` INTEGER NULL DEFAULT NULL,
  `puntos_inicial` INTEGER NOT NULL DEFAULT NULL,
  `puntos_final` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'Jugadas de cada usuario';

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `POINTS` ADD FOREIGN KEY (id_USERS) REFERENCES `USERS` (`id`);
ALTER TABLE `PLAYS` ADD FOREIGN KEY (id_USERS) REFERENCES `USERS` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `USERS` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `POINTS` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `PLAYS` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `USERS` (`id`,`usuario`,`nombre`,`email`) VALUES
-- ('','','','');
-- INSERT INTO `POINTS` (`id`,`id_USERS`,`puntos`) VALUES
-- ('','','');
-- INSERT INTO `PLAYS` (`id`,`fecha`,`id_USERS`,`puntos_inicial`,`puntos_final`) VALUES
-- ('','','','','');