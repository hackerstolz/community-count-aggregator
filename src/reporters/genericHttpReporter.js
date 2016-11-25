'use strict';

'use strict';

const request = require('request');

class GenericHttpReporter {
    constructor(pattern, url, name) {
        this.pattern = pattern;
        this.url = url;
        this.name = name;
        this.headers = {
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'en-US',
            'Cookie': 'noscript=1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
        }
    }

    getCount() {
        return new Promise((resolve, reject) => {
            request({
                url: this.url,
                headers: this.headers
            }, (error, response, body) => {
                if (error) {
                    return reject(error);
                }

                const count = this.extractCount(body);

                if (!count || typeof count !== 'number') {
                    return reject(`Could not extract count for ${this.url}`);
                }

                resolve(count);
            });
        });
    };

    report() {
        return this.getCount()
            .then(count => {
                return {
                    name: `${this.constructor.name} (${this.name})`,
                    count
                }
            });
    }

    extractCount(body) {
        const match = this.pattern.exec(body);

        if (match === null) {
            return;
        }

        return parseInt(match[1].replace(',', ''), 10);
    }
}

module.exports = GenericHttpReporter;
