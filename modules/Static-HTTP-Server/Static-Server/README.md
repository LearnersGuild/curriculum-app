# Static Server

## Description

Create a HTTP server that serves a static folder.

The directory structure of the static folder should resemble this structure
```bash
static
├── assets
│   ├── css
│   │   └── main.css
│   └── js
│       └── main.js
└── pages
    ├── about.html
    └── landing.html
```

## Specs

- Express server should run at port 3000
- Navigating to `http://localhost:3000/about.html` should serve the file `static/pages/about.html`
- Navigating to `http://localhost:3000/landing.html` should serve the file `static/pages/landing.html`
- Navigating to `http://localhost:3000/css/main.css` should serve the file `static/assets/css/main.css`
- Navigating to `http://localhost:3000/js/main.js` should serve the file `static/assets/js/main.css`
- Pages `about.html` and `landing.html` load the files `main.css` and `main.js`
