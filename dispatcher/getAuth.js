var config = require('../config');

module.exports = {
    "getAuth": function(request, response) {
        var session = request.session;
        if(session && session.passport && session.pssport.user.accessToken) {
            
        }
    }
}