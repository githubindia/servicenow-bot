var express = require('express');
var app = express();
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var router = express.Router();
var config = require('./config');
var taskDispatcher = require('./dispatcher/taskDispatcher');
var getAuthorization = require('./dispatcher/getAuth');
// var loginDispatcher = require('./dispatcher/loginDispatcher');
var snTask = require('./serviceNowAPI/task');
var session = require('client-sessions');

var port = process.env.PORT || 3000;

app.use(session({
    cookieName: 'session',
    secret: 'af*asdf+_)))==asdf afcmnoadfadf',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

app.use(passport.initialize());

passport.use('provider', new OAuth2Strategy({authorizationURL: config.oauth.authURL,tokenURL:config.oauth.tokenURL,clientID:config.oauth.clientID,clientSecret:config.oauth.clientSecret,callbackURL:config.oauth.callbackURL}, function(accessToken, refreshToken, profile, done) {
    var tokenInfo = {};
    tokenInfo.accessToken = accessToken;
    tokenInfo.refreshToken = refreshToken;
    tokenInfo.profile = profile;
    console.log(tokenInfo);
    done(null, tokenInfo);
    })
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});
app.set('snTask', snTask);
// Register dispatchers for different types of requests. This application receives following 
// types of http requests from browser.
// router.post('/login', loginDispatcher.login);
router.get('/tasks', taskDispatcher.getTasks);
// router.get('/task/:taskid/comments', taskDispatcher.getComments);
// router.post('/task/:taskid/comments', taskDispatcher.addComment);
// router.delete('/logout', function(req, res) {
//     req.session.destroy();
//     res.end("Deleted");
// });
// Passport Routes
router.get('/auth/provider', passport.authenticate('provider'));
router.get('/auth/provider/callback', passport.authenticate('provider', { successRedirect: 'https://www.messenger.com/closeWindow/?display_text=Authenticated', failureRedirect: '/login'}));

app.use(router);

app.listen(port);