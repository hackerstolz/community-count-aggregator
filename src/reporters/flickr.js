'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

function FlickrReporter(name, url) {
    const pattern = /(\d+) Follower/;
    const reporterName = 'flickrReporter';

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

module.exports = FlickrReporter;
