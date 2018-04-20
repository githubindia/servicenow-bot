config = {};

config.instanceURL = 'https://dev27552.service-now.com';

// OAuth Configuration 
config.oauth = {};
config.oauth.clientID = 'ef3bfe8626211300aab6710572aa3810';
config.oauth.clientSecret = 'kb!a*RhY48';
config.oauth.authURL = config.instanceURL + '/oauth_auth.do';
config.oauth.tokenURL = config.instanceURL + '/oauth_token.do';
config.oauth.callbackURL = 'https://e9a959bb.ngrok.io/auth/provider/callback';

module.exports = config;