# Movie Search CLI

## Exercise

Write a Node.js script called `movie-search-cli.js` that takes a `search term` as the first argument, and prints the names of the movies in the console which match that search term.

Example usage
```
$ node imdb.js findingnemo
 Finding Nemo (2003)
 Finding Nemo (2003) (Video Game)
 Finding Nemo (2001) (TV Episode)
 Finding Dory (2016)
 Finding Nemo Submarine Voyage (2007) (Short)
 Finding Nemo: Studio Tour of Pixar (2003) (Video)
 Finding Nemo Attraction & Stage Show (2007) (TV Episode)
```

Requirements:
- [ ] Use Node.js's `http` module to make a request to imdb.com
- [ ] Use the [cheerio library](https://github.com/cheeriojs/cheerio) to extract contents from the HTML page.


Hints:
- IMDB search url for the example above : `http://www.imdb.com/find?ref_=nv_sr_fn&q=findingnemo&s=all`. Replace `findingnemo` with the dynamic search term.

