'use strict';

const request = require('request');

class TwitterAuthentication {
    constructor(options) {
        this.validateOptions(options);

        this.options = options;
        this.accessToken = void 0;
    }

    authenticate() {
        const encodedAuthorizationHeader = new Buffer(`${this.options.consumerKey}:${this.options.consumerSecret}`).toString('base64');

        return new Promise((resolve, reject) => {
            request({
                method: 'POST',
                url: 'https://api.twitter.com/oauth2/token',
                form: {
                    'grant_type': 'client_credentials'
                },
                headers: {
                    'Authorization': `Basic ${encodedAuthorizationHeader}`
                }
            }, (error, response, body) => {
                if (error) {
                    return reject(error);
                }

                this.accessToken = JSON.parse(body).access_token;
                resolve();
            })
        });
    }

    validateOptions(options) {
        if (!options) {
            throw new Error('Options not set.');
        }

        if (!options.consumerKey) {
            throw new Error('ConsumerKey not set.');
        }

        if (!options.consumerSecret) {
            throw new Error('ConsumerSecret not set.');
        }
    }
}

module.exports = TwitterAuthentication;
