'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

function FacebookReporter(name, url) {
    const pattern = /id="PagesLikesCountDOMID">.*?>(\d+)/;
    const reporterName = 'facebookReporter';

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

module.exports = FacebookReporter;
