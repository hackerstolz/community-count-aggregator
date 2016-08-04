'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

function SlackReporter(name, url) {
    const pattern = /<b class="total">(\d+)/;
    const reporterName = 'slackReporter';

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

module.exports = SlackReporter;
