'use strict';

const request = require('request');

function FacebookReporter(name, url) {
    const pattern = /id="PagesLikesCountDOMID">.*?>(\d+)/;
    const headers = {
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US',
        'Cookie': 'noscript=1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
    };

    this.name = 'facebookReporter';

    this.getCount = () => {
        return new Promise((resolve, reject) => {
            request({
                url, headers
            }, (error, response, body) => {
                if (error) {
                    return reject(error);
                }

                const count = extractCount(body);

                if (!count) {
                    return reject(`Could not extract count for ${url}`);
                }

                resolve({
                    name: `${this.name} (${name})`,
                    count
                });
            });
        });
    };

    function extractCount(body) {
        const match = pattern.exec(body);

        if (match === null) {
            return;
        }

        return parseInt(match[1], 10);
    }
}

module.exports = FacebookReporter;
