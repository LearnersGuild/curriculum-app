var http = require('http')
var cheerio = require('cheerio')


function parseArgs(args){
  http.get("http://www.imdb.com/find?ref_=nv_sr_fn&q="+args+"&s=all", function(resp){
    resp.on('data', function(chunk){
      const $ = cheerio.load(chunk)
      $('.findSection').first().find('.result_text').each(function(i, element) {
        console.log($(this).text());
      })
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
}

parseArgs(process.argv.slice(2)[0]);
