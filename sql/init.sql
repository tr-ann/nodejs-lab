DROP DATABASE IF EXISTS	`insta_db`;
CREATE DATABASE `insta_db`;

USE `insta_db`;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
	`id` INTEGER auto_increment,
	`login` VARCHAR(100) NOT NULL UNIQUE,
	`password` VARCHAR(100) NOT NULL,
	`is_deleted` BOOL DEFAULT FALSE,

	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
	`id` INTEGER auto_increment,
	`name` VARCHAR(100) NOT NULL,

	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `UserRoles`;
CREATE TABLE `UserRoles` (
	`id` INTEGER auto_increment,
	`user_id` INTEGER NOT NULL,
	`role_id` INTEGER NOT NULL,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
);

DROP TABLE IF EXISTS `DeleteRequest`;
CREATE TABLE `DeleteRequest` (
	`id` INTEGER auto_increment,
	`user_id` INTEGER NOT NULL UNIQUE,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Posts`;
CREATE TABLE `Posts` (
	`id` INTEGER auto_increment,
	`owner_id` INT NOT NULL,
	`creation_date` TIMESTAMP NOT NULL,
	`description` TEXT NOT NULL,
	`image` VARCHAR(255),
	`is_edited` BOOL DEFAULT FALSE,
	`is_deleted` BOOL DEFAULT FALSE,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`owner_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Likes`;
CREATE TABLE `Likes` (
	`id` INTEGER auto_increment,
	`user_id` INTEGER NOT NULL,
	`post_id` INTEGER NOT NULL,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Tags`;
CREATE TABLE `Tags` (
	`id` INTEGER auto_increment,
	`name` VARCHAR(255) NOT NULL UNIQUE,
	
	PRIMARY KEY (`id`),
);

DROP TABLE IF EXISTS `PostTags`;
CREATE TABLE `PostTags` (
	`id` INTEGER auto_increment,
	`post_id` INTEGER NOT NULL,
	`tag_id` INTEGER NOT NULL,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (`tag_id`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);