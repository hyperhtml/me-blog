var express = require('express');
var post = require('./routes/posts');
var exphbs  = require('express-handlebars');

var app = express()

// Setup Handlebars Templating
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Blog Entry List
app.get('/', post.findAll);
app.get('/post/:id', post.findById);

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
