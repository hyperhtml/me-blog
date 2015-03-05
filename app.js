var express = require('express');
var post = require('./routes/posts');
var exphbs  = require('express-handlebars');

var app = express()

var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
    returnURL: 'http://brycecarr.me/auth/google/return',
    realm: 'http://brycecarr.me/'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
      console.log('user', user)
    });
    console.log("Auth",identifier, profile, done);
  }
));

// Setup Handlebars Templating
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Blog Entry List
app.get('/', post.findAll);
app.get('/post/:id', post.findById);

/* Google Auth */
app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/return',
  passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
  }));


var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
