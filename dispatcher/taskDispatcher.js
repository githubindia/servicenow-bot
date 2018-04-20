var config = require('../config');

module.exports = {
    "getTasks": function(serverRequest, serverResponse) {
        var session = serverRequest.session;
        if (session && session.passport && session.passport.user.accessToken) {
            var SNTask = serverRequest.app.get('snTask');
            var options = serverRequest.app.get('options');
            var snTask = new SNTask(config.instanceURL, session.passport.user.accessToken, options);
             snTask.getTasks(function(error, response, body) {
                //serverRequest.app.get('respLogger').logResponse(options, response, body);
                if (!error) {
                    if (response.statusCode == 200) {
                    	// the successful body message should contain all the tasks as a JSON message.
                        serverResponse.status(response.statusCode).send(body);
                    } else if (response.statusCode == 400) {
                        serverResponse.status(response.statusCode).send('The Task Tracker API is not found on this instance. Did you install the "My Work" Update Set?');
                    } else {
                        serverResponse.status(response.statusCode).send(
                            'Error occured while communicating with ServiceNow instance. ' + response.statusMessage);
                    }
                } else {
                	serverResponse.status(500).send(
                        'Error occured while communicating with ServiceNow instance. ');
                }
            });
        }
    }
}