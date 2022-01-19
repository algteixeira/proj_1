# proj_1

This is the a project that i'm doing for Compasso UOL fast track program.
With this project you can have something like a government system where you can
registrate cities and then cadastrate people, vinculating them to existent cities in the
database!



## Authors

- [@algteixeira](https://www.github.com/algteixeira)


## Features

- CRUD for people (registrate a new person, update it's name, get by ID, get with queries and delete someone)
- CRUD for cities (registrate a new city and get cities by their name or state)
- Feature tests
- page&limit pagination scheme


## Used technologies

**Server:** 
- Node v14.17.4
- Express v4.17.2
- TypeORM v0.2.41
- Reflect-Metadata v0.1.13
- POSTGRES v8.7.1

**Tests:**
- Jest v27.4.7
- Supertest v6.2.1

**Client:**
- - SwaggerUI v4.3.0


## How to run

Clone the project

```bash
  git clone https://github.com/algteixeira/proj_1
```

Go to the project directory

```bash
  cd proj_1
```

Install dependencies

```bash
  yarn install
```

Customize ormconfig.json in order to adapt it to your database configuration
Don't forget to create your own local databases!

```javascript
  {
    "name": "default",
    "type": "postgres",
    "host": "your_host",
    "port": "your_db_port",
    "username": "your_user",
    "password": "your_pwd",
    "database": "your_db_name"
  }
  /* KEEP ALL OTHER CONFIGURATIONS THE SAME */

```

Start the server

```bash
  yarn start
```

...Or in dev mode

```bash
  yarn dev
```

...To test use

```bash
  yarn test
```

...Additional info
```bash
  it runs at port 3000 (or env.proccess.PORT if passed)
```


## Documentation

To plot the documentation just run the following command in your browser while server is running

```bash
  http://localhost:3000/api-docs/
```
