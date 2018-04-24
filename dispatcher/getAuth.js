var config = require('../config');

var accessToken;
module.exports = {
    "getAuth": function(request, response) {
        var session = request.session;
        if(session && session.passport && session.passport.user.accessToken) {
            accessToken = session.passport.user.accessToken;
            // response.redirect('https://www.messenger.com/closeWindow/?display_text=Authenticated');
            response.redirect('../index.html');
        }
    }
}