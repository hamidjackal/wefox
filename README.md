## Description

Challenge for wefox Senior Node.js developer position.

## Notes

- This is a http service with two modules: Users and AddressServices
- There is an .env file which I did not put in .gitignore so testing and working with the service becomes more easily(if you run the server with docker compose there would be no need for the .env file).

## Installation

```bash
$ npm install
```

## Running the app directly

```bash
# make sure the .env file is set correctly

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with docker

```bash
# set the POTGRES_URI inside the .env file to "db"
# run the ./setup.sh file
$ ./setup.sh sh

# or directly run the below docker commands
$ docker-compose build
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test:unit

# integration tests
$ npm run test:integration
```

## Documentation

The postman documents are available in ./documents directory

## Stay in touch

- Author - Hamid Tehrani
- Company - Wefox
- Email - hamid.tehrani2003@gmail.com
