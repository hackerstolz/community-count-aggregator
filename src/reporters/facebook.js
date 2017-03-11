'use strict';

const GenericReporter = require('./genericReporter');
const FB = require('fb');

class FacebookReporter extends GenericReporter {
    constructor(facebookAuthentication, name, pageId) {
        super(name);

        this.facebookAuthentication = facebookAuthentication;
        this.pageId = pageId;
    }

    getCount() {
        return new Promise((resolve, reject) => {
            FB.setAccessToken(this.facebookAuthentication.accessToken);
            FB.api(
                `/${this.pageId}?fields=fan_count`,
                response => {
                    if (response && !response.error) {
                        return resolve(response.fan_count);
                    }

                    reject(response.error);
                }
            );
        });
    }
}

module.exports = FacebookReporter;
