# Storefront-Backend

## Table of Contents

- [Description](#Description)
- [Instructions](#instructions)
- [Contributing](#contributing)

## Description

A Web Server Application written in TypeScript to serve a small E-commerce prototype.

## Instructions

1- Run 'npm i' before building and running the application.

2- Create a postgres database with the name 'store_front' and a test one with the name 'store_front_test'.

3- Here is a sample dotenv configurations:

HOST=127.0.0.1
DATABASE=store_front
TEST_DATABASE=store_front_test
PASSWORD=password123
BCRYPT_PASSWORD=Secret123
SALT_ROUNDS=10
TOKEN_SECRET=TokenSecret123
ENV=dev

4- You can use the scripts in the package.json file to build, test, lint, format and run the project.

5- When needing to run the test script, modify the ENV field to 'test' and change it back when you need to run the application.

Application will be running on localhost port '3000' by default 
Database will be running on localhost port '5432' by default

APIs and Database Schema are in the REQUIREMENTS.md file.

## Contributing

This repository is Storefront-Backend Application for Udacity Full Stack Javascript Developer.