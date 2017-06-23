// require express and other modules
var express = require('express');
var app = express();
var rp = require('request-promise');
var cheerio = require('cheerio');


app.get('/api/imdb/search/:term', function(req, res) {
  var term = req.params.term;
  var options = {
    uri: 'http://www.imdb.com/find?ref_=nv_sr_fn&q='+term+'&s=all',
    transform: function(body) {
      return cheerio.load(body);
    }
  }
  rp(options)
    .then(function($) {
      var json = {"movies": []};

      $('.findSection').first().find('.result_text').each(function(i, element) {
         var name = $(this).find('a').text();
         var text = $(this).text()

         var regExp = /\(([^)]+)\)/;
         var year = regExp.exec(text);

         json.movies.push({"name": name, "year": year[1]})
       })
      res.json(json);
    })
})

// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});
