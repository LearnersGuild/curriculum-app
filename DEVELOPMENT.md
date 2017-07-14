# DEVELOPMENT

[![CircleCI](https://circleci.com/gh/GuildCrafts/curriculum.svg?style=svg)](https://circleci.com/gh/GuildCrafts/curriculum)

## Dev Environment Setup


Install and run Node v8.1.2


#### Creating your `.env` file

create a `.env` file like this:

```
PORT=3233
DATABASE_URL=postgres://deadlyicon@localhost:5432/lg-curriculum
IDM_BASE_URL=http://idm.learnersguild.dev
JWT_PUBLIC_KEY="SEE IDM SETUP"
```

_NOTE: you can set `DISABLE_IDM=1` to disable authentication to IDM_


#### Setup the Postgresql Database

```sh
createdb lg-curriculum
npm run migrate
```


#### Start the server in development mode

```sh
npm run dev
```


## Continuous Integration

https://circleci.com/gh/GuildCrafts/curriculum
