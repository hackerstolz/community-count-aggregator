'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

function InstagramReporter(name, url) {
    const pattern = /followed_by": \{"count": (\d+)/;
    const reporterName = 'instagramReporter';

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

module.exports = InstagramReporter;
