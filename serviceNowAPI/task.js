module.exports = Task;

function Task(snInstanceURL, accessToken, options) {
    this.snInstanceURL = snInstanceURL;
    this.accessToken = accessToken;
    this.options = options;
}

// Returns the tasks assigned to user.
Task.prototype.getTasks = function (callBack) {
    var request = require('request');
    //request.debug = this.options.verbose;
    request({
        baseUrl: this.snInstanceURL,
        method: 'GET',
        // This uri is a part of myTasks service.
        uri: 'api/now/table/incident',
        json: true,
        // Set the cookie to authenticate the request.
        auth: {
            bearer: this.accessToken
        }

    }, function (err, response, body) {
        callBack(err, response, body);
    });
}