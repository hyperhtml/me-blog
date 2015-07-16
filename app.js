var express = require('express');
var post = require('./routes/posts');
var exphbs  = require('express-handlebars');
var config = require('./config');

var app = express()

var passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
        clientID:     config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://brycecarr.me/auth/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          return done(null, profile);
        });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use( passport.initialize());
app.use( passport.session());

// Setup Handlebars Templating
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Blog Entry List
app.get('/', post.findAll);
app.get('/post/:id', post.findById);

app.get('/admin', ensureAuthenticated, function(req,res){
    res.render('admin', { user: req.user});
});

/* Google Auth */
app.get('/auth/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

app.get( '/auth/google/callback',
    	passport.authenticate( 'google', {
    		successRedirect: '/',
    		failureRedirect: '/login'
}));


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/google');
}


var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
