# node-express-api

![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/igorwanbarros/node-express-api?style=for-the-badge&logo=github&logoColor=white "Commits")
![GitHub repo size](https://img.shields.io/github/repo-size/igorwanbarros/node-express-api?style=for-the-badge&logo=github&logoColor=white "Repo Size")
![GitHub language count](https://img.shields.io/github/languages/count/igorwanbarros/node-express-api?style=for-the-badge&logo=tsnode&logoColor=white "Languages")
![GitHub forks](https://img.shields.io/github/forks/igorwanbarros/node-express-api?style=for-the-badge&logo=github&logoColor=white "Forks")
![Github open issues](https://img.shields.io/github/issues/igorwanbarros/node-express-api?style=for-the-badge&logo=github&logoColor=white "Issues")
![Github coverage](https://img.shields.io/github/actions/workflow/status/igorwanbarros/node-express-api/github.actions.yml?style=for-the-badge&logo=githubactions&logoColor=white&label=coverage)

This project aims to create an API using the express framework (node js).

## What is expected from this project?

Creation of an API (REST) to register products and orders.

![Overview](docs/overview.png "Overview")

## Prerequisites

``` cli
```

## Installation

Clone the repository

``` cli
    git clone https://github.com/igorwanbarros/node-express-api.git
```

Install node dependencies:

```cli
    npm install
```

Up the server

```cli
    // development mode
    npm run dev

    // production mode
    npm run build && npm run start
```

If you use docker as a development tool, use the following steps:

Up the containers:

```cli
    docker-compose up --build

    // or use `make build`
```

## Running

Up the containers:

``` cli
    // with docker-compose
    docker-compose up --build

    // or

    make build
    // or `make cli`  if you don't need to recreate.
```

## Database

Use ![prisma ORM](https://www.prisma.io/).

```cli
    npx prisma generate

    npx prisma db push
```

> If you use docker as a development tool, use the following steps

```cli
    docker ps
    // get te container ID
```

With the container ID, run the following command to access the container:

```cli
    docker exec -it <container-id> sh
```

After accessing the container, execute the prism commands to generate the tables and schema:

```cli
    npx prisma generate

    npx prisma db push
```

## Tests

``` cli
```

## License

This project is under GNU GENERAL PUBLIC LICENSE - see the [LICENSE](LICENSE) file for details.
