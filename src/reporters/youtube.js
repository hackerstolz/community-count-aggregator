'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

function YoutubeReporter(name, url) {
    const pattern = /aria-label="(\d+) subscribers"/;
    const reporterName = 'youtubeReporter';

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

module.exports = YoutubeReporter;
