'use strict';

const FB = require('fb');

class FacebookAuthentication {
    constructor(options) {
        this.validateOptions(options);

        this.options = options;
        this.accessToken = void 0;
    }

    authenticate() {
        return new Promise((resolve, reject) => {
            FB.api('oauth/access_token', {
                client_id: this.options.clientId,
                client_secret: this.options.clientSecret,
                grant_type: 'client_credentials'
            }, result => {
                if (!result || result.error) {
                    return reject(!result ? 'error occured' : result.error);
                }

                this.accessToken = result.access_token;
                resolve();
            });
        });
    }

    validateOptions(options) {
        if (!options) {
            throw new Error('Options not set.');
        }

        if (!options.clientId) {
            throw new Error('ClientId not set.');
        }

        if (!options.clientSecret) {
            throw new Error('ClientSecret not set.');
        }
    }
}

module.exports = FacebookAuthentication;
