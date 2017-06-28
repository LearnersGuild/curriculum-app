# Movie Search CLI

## Exercise

Write a Node.js script called `movie-search-cli.js` that takes a `search term` as the first argument, and prints the names of the movies in the console which match that search term.

Example usage
```
$ node imdb.js "findingnemo"
 Finding Nemo (2003)
 Finding Nemo (2003) (Video Game)
 Finding Nemo (2001) (TV Episode)
 Finding Dory (2016)
 Finding Nemo Submarine Voyage (2007) (Short)
 Finding Nemo: Studio Tour of Pixar (2003) (Video)
 Finding Nemo Attraction & Stage Show (2007) (TV Episode)
```

Specs:
- [ ] use Node.js's `http` module to make a request to imdb.com
- [ ] use the [cheerio library](https://github.com/cheeriojs/cheerio) to extract contents from the HTML page.
- [ ] functions are tested with mocha and chai

Hints:
- IMDB search url for the example above : `http://www.imdb.com/find?ref_=nv_sr_fn&q=findingnemo&s=all`. Replace `findingnemo` with the dynamic search term.

Resources:
- [Trevor's walkthrough of a (partial) solution](https://zoom.us/recording/play/AYFYw3AK0BmdqDDxL2c_zi64-VqNnWDMHpgr-iCDesweL8SRD8qIVaKpqbEpfEuO). (WARNING: This video contains spoilers! You may want to work on this on your own first before watching this)
