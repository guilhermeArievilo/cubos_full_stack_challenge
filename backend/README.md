<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description
Backend NodeJS built with the NestJS framework

## Prerequisites
- OpenSSL - To generate the public and private keys used in the authentication process
- Docker (optional) - To start the application's database container
- Node.js

## Project Setup

```bash
#Install the dependencies
$ npm install

# prisma
$ npx prisma generate
$ npx prisma migrate dev
```

## Steps before starting the application

### Generate RSA keys
1. Create the keys folder if it doesn't exist:
```bash
$ mkdir -p ./resources/keys
```
2. Generate the private key
```bash
$ openssl genrsa -out ./resources/keys/private.pem 2048
```
3. Generate the public key
```bash
$ openssl rsa -in ./resources/keys/private.pem -pubout -out ./resources/keys/public.pem
```

### Start the database container
```bash
$ docker-compose up -d
```

### Configure environment variables

- Create a `.env` file in the root of the project
```bash
DATABASE_URL=postgresql_database_url
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test
```