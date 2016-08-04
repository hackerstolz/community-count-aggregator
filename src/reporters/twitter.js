'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

function TwitterReporter(name, url) {
    const pattern = /class="UserProfileHeader-statCount">(\d+)/;
    const reporterName = 'twitterReporter';

    this.report = () => {
        const reporter = new GenericHttpReporter(pattern, url);

        return reporter.getCount()
            .then(count => {
                return {
                    name: `${reporterName} (${name})`,
                    count
                }
            })
    };
}

module.exports = TwitterReporter;
