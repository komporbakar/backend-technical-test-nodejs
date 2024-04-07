# Database DDL

- ### Create Database

```raw
CREATE DATABASE take_home_test
```

- ### Create Table Users

```raw
CREATE TABLE `users` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(256) NOT NULL,
	`first_name` VARCHAR(50) NOT NULL,
	`last_name` VARCHAR(50) NOT NULL,
	`password` VARCHAR(256) NOT NULL,
	`profile_image` VARCHAR(256) NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
)
```

- ### Create Table Balance

```raw
CREATE TABLE `balance` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`user_id` INT(100) NOT NULL,
	`amount` INT(20) NOT NULL,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
)
```

- ### Create Table Banner

```raw
CREATE TABLE `banner` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`banner_name` VARCHAR(256) NOT NULL,
	`banner_image` VARCHAR(256) NOT NULL,
	`description` VARCHAR(256) NOT NULL,
	PRIMARY KEY (`id`)
)
```

- ### Create Table Services

```raw
CREATE TABLE `services` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`service_code` VARCHAR(50) NOT NULL,
	`service_name` VARCHAR(256) NOT NULL,
	`service_icon` VARCHAR(256) NOT NULL,
	`service_tariff` INT(20) NOT NULL,
	PRIMARY KEY (`id`)
)
```

- ### Create Table Transaction

```raw
CREATE TABLE `transaction` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
    `user_id` INT(100) NOT NULL,
	`invoice_number` VARCHAR(50) NOT NULL,
	`transaction_type` VARCHAR(256) NOT NULL,
	`description` VARCHAR(256) NOT NULL,
	`total_amount` INT(20) NOT NULL,
	`created_on` TIMESTAMP(6) NULL DEFAULT NULL,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
)
```
