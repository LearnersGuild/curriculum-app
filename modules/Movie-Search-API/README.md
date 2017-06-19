# Movie Search API


## Skills

- Can use Express to handle an HTTP `GET`
- Can define routes in Express that follow the Restful Routing pattern
- Can make HTTP requests from Node using the `request-promise` Node package
- Can render json in response to an HTTP request, in Express
- Can effectively use Promises

## Description

Create a Movie Search API which uses Express, and fetches movies from IMDB API.

The api should have the following routes
```
request: GET /api/imdb/search/:query
response: {"movies": [{name: "<movie-name>", year: "<year-released>"}]}
```

## Specs
- [ ] express server adhering to the API
- [ ] http requests to IMDB are made using [request-promise](https://github.com/request/request-promise)
- [ ] response header `content-type` is `application/json`

## Example requests

```
GET /api/imdb/search/findingnemo
=> {"movies":[{"name": "Finding Nemo", "year": "2003"},
              {"name": "Finding Nemo", "year": "2003"},
              {"name": "Finding Nemo", "year": "2001"},
              {"name": "Finding Dory", "year": "2016"},
              {"name": "Finding Nemo Submarine Voyage", "year": "2007"},
              {"name": "Finding Nemo: Studio Tour of Pixar ", "year": "2003"},
              {"name": "Finding Nemo Attraction & Stage Show", "year": "2007"}]}
```

Hints:
- Sample IMDB search url : `http://www.imdb.com/find?ref_=nv_sr_fn&q=findingnemo&s=all`. Replace `findingnemo` with the dynamic search term.

