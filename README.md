# JULO Mini Wallet API - Backend

## Stacks
- NodeJS:  16.6.0
- Framework: Express
- ORM: Prisma
- DB: SQLite

## Prerequsite
Make sure NodeJS version 16.6.0 is installed

## How to Install
0. Clone this repo
1. `cd <cloned_dir>`
2. `npm i`
3. `cp env.example .env`
4. fill your .env settings with these
```
DEFAULT_PORT=80
DEFAULT_BASE_API_PATH="/api"
DEFAULT_SECRET="mysecret"
SERVER_NAME="Julo Express"

DATABASE_URL="file:./dev.db"
```

## How to run
1. `npm run migrate`
2. `npm run generate`
3. `npm run seed`
4. `npm run start`

