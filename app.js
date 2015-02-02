var express = require('express');
var post = require('./routes/posts');

var app = express()


// Blog Entry List
app.get('/', post.findAll);
app.get('/post/:id' post.findById);

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
