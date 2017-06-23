// require express and other modules
var express = require('express');
var app = express();

// serve static files from static folder
app.use(express.static(__dirname + '/static'));

app.get('/landing.html', function(req, res) {
  res.sendFile('static/pages/landing.html' , { root : __dirname});
})

app.get('/about.html', function(req, res) {
  res.sendFile('static/pages/about.html' , { root : __dirname});
})

app.get('/css/main.css', function(req, res) {
  res.sendFile('static/assets/css/main.css' , { root : __dirname});
})

app.get('/js/main.js', function(req, res) {
  res.sendFile('static/assets/js/main.js' , { root : __dirname});
})

// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});
