# Movie Search API


## Skills

- Can use Express to handle an HTTP `GET`
- Can define routes in Express that follow the Restful Routing pattern
- Can make HTTP requests from Node using the `request-promise` Node package
- Can render json in response to an HTTP request, in Express
- Can effectively use Promises in JavaScript

## Description

Using Express, create a web server that exposes a Movie Search HTTP API which
fetches results by scraping `imdb.com`.

The api should have the following routes
```
request: GET /api/imdb/search/:query
response: {"movies": [{name: "<movie-name>", year: "<year-released>"}]}
```

## Specs

- app uses Express to handle API requests
- http requests to IMDB are made using [request-promise](https://github.com/request/request-promise)
- use the [cheerio library](https://github.com/cheeriojs/cheerio) to extract contents from the HTML page.
- response header `content-type` is `application/json`
- any requests under the `/api/` namespace should render `JSON`

## Example Request

Doing a `GET` to `/api/search/findingnemo` should render something like:

```json
{
  "movies":[
    {"name": "Finding Nemo", "year": "2003"},
    {"name": "Finding Nemo", "year": "2003"},
    {"name": "Finding Nemo", "year": "2001"},
    {"name": "Finding Dory", "year": "2016"},
    {"name": "Finding Nemo Submarine Voyage", "year": "2007"},
    {"name": "Finding Nemo: Studio Tour of Pixar ", "year": "2003"},
    {"name": "Finding Nemo Attraction & Stage Show", "year": "2007"}
  ]
}
```

## Hints

- Sample IMDB search url : `http://www.imdb.com/find?ref_=nv_sr_fn&q=findingnemo&s=all`. Replace `findingnemo` with the dynamic search term.

## Stretch Goal

If you've done the
[Movie Search CLI](../Movie-Search-CLI) or
[Movie Search CLI With Promises](../Movie-Search-CLI-With-Promises) module,
go back and refactor one of those to use your HTTP API instead of scraping
itself.
