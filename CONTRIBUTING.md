# CONTRIBUTING

## Just want to comment?

Please make a pull request.

## Dev Environment Setup

create a `.env` file like this:

```
PORT=3233
DATABASE_URL=postgres://deadlyicon@localhost:5432/lg-curriculum
IDM_BASE_URL=http://idm.learnersguild.dev
JWT_PUBLIC_KEY="SEE IDM SETUP"
```

```sh
createdb lg-curriculum
```

```sh
npm run dev
```

