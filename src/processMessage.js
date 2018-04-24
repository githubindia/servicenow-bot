const request = require('request');
const FACEBOOK_ACCESS_TOKEN = 'EAAc6hI7VvPwBANp3BZAgcztmOwZCUmHrhBvUi0EZAOn2Byhq6i2jjiqdIHUcNZBZADgj5HZAXpCzl962Nhi6ou23blwFOZCQosStTY3tGPZAzCxGkQAPgOdpjHSMxIqK5f2mUq8ovFZCveHwZAVbF6ZB4yqjlZCZCCpWvdnf0iTnbrUizmQZDZD';
const API_AI_TOKEN = 'd786ef841ad7471a978e218ca532df82'; // silly-name-maker agent.
const apiAiClient = require('apiai')(API_AI_TOKEN);

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    var apiaiSession = apiAiClient.textRequest(message, {sessionId: senderId});
    //console.log(JSON.stringify(apiaiSession));
    apiaiSession.on('response', (response) => {
        //console.log(JSON.stringify(response));
        // const result = response.result.fulfillment.speech;
        // response.queryResult.fulfillmentMessages.forEach(function(element){
        //     arr.push()
        // })
            sendTextMessage(senderId, response.result.fulfillment.messages);     
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};
