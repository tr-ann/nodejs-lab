DROP DATABASE IF EXISTS	`insta_db`;
CREATE DATABASE `insta_db` DEFAULT CHARACTER SET utf8;

USE `insta_db`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
	`id` 					INTEGER 			auto_increment,
	`login` 			VARCHAR(100) 	NOT NULL UNIQUE,
	`first_name` 	VARCHAR(100) 	NOT NULL,
	`last_name` 	VARCHAR(100) 	NOT NULL,
	`password` 		VARCHAR(100) 	NOT NULL,
	`deleted_at`	TIMESTAMP			,

	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
	`id` 			INTEGER 			auto_increment,
	`name` 		VARCHAR(100) 	NOT NULL,

	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles` (
	`id` 				INTEGER 	auto_increment,
	`user_id` 	INTEGER 	NOT NULL,
	`role_id` 	INTEGER 	DEFAULT 1,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `requests`;
CREATE TABLE `requests` (
	`id` 				INTEGER 	auto_increment,
	`user_id` 	INTEGER 	NOT NULL UNIQUE,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
	`id` 					INTEGER 			auto_increment,
	`owner_id` 		INT 					NOT NULL,
	`description` TEXT 					NOT NULL,
	`image` 			VARCHAR(255)	,
	`created_at` 	TIMESTAMP			,
	`updated_at` 	TIMESTAMP			,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
	`id` 					INTEGER 	auto_increment,
	`user_id` 		INTEGER 	NOT NULL,
	`post_id` 		INTEGER 	NOT NULL,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
	`id` 			INTEGER 			auto_increment,
	`name` 		VARCHAR(255) 	NOT NULL UNIQUE,
	
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `posts_tags`;
CREATE TABLE `posts_tags` (
	`id` 			INTEGER auto_increment,
	`post_id` INTEGER NOT NULL,
	`tag_id` 	INTEGER NOT NULL,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `refresh_tokens` (
	`id`		INTEGER auto_increment PRIMARY KEY,
	`token`	VARCHAR(500) NOT NULL UNIQUE
);

INSERT INTO `roles` (`name`) VALUES
("authorized user"),
("admin");