CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`done` integer NOT NULL,
	`priority` text DEFAULT 'normal' NOT NULL
);
