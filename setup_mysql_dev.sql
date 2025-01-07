-- This is the database setup file for the project - VolunConnect
-- To prepare a MySQL server for the VolunConnect project
-- User: VolunConnect_admin_app_dev
-- User password: VolunConnect_admin_app_pass
-- Host: localhost
-- database name : VolunConnect_dev_dp

-- Create the database
CREATE DATABASE IF NOT EXISTS VolunConnect_dev_dp;

-- Create the user
CREATE USER IF NOT EXISTS 'VolunConnect_admin_app_dev'@'localhost' IDENTIFIED BY '@1!Volunteer';


-- Grant that user all privileges on the VolunConnect_dev_dp database.
-- and grant SELECT privileges on the performance_schema database.

GRANT ALL PRIVILEGES ON taskwise_dev_dp.* TO 'VolunConnect_admin_app_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'VolunConnect_admin_app_dev'@'localhost';


FLUSH PRIVILEGES;
