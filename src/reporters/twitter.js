'use strict';

const GenericReporter = require('./genericReporter'),
    request = require('request');

class TwitterReporter extends GenericReporter {
    constructor(twitterAuthentication, name, handle) {
        super(name);

        this.handle = handle;
        this.twitterAuthentication = twitterAuthentication;
    }

    getCount() {
        return new Promise((resolve, reject) => {
            request({
                url: `https://api.twitter.com/1.1/users/show.json?screen_name=${this.handle}&user_id=${this.handle}`,
                headers: {
                    'Authorization': `Bearer ${this.twitterAuthentication.accessToken}`
                }
            }, (error, response, body) => {
                if (error) {
                    return reject(error);
                }

                resolve(JSON.parse(body).followers_count);
            });
        });
    }
}

module.exports = TwitterReporter;
