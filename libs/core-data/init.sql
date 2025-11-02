CREATE USER blameable_data_admin WITH PASSWORD 'password';

-- add ability to create shadow db's for migrations
ALTER USER blameable_data_admin CREATEDB;

CREATE DATABASE blameable_data OWNER blameable_data_admin;
