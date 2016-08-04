'use strict';

const request = require('request'),
    GenericHttpReporter = require('./genericHttpReporter');

function MeetupReporter(name, url) {
    const pattern = /class="D_count">\((\d+)\)/;
    const reporterName = 'meetupReporter';

    this.report = () => {
        const reporter = new GenericHttpReporter(pattern, `${url}members/`);

        return reporter.getCount()
            .then(count => {
                return {
                    name: `${reporterName} (${name})`,
                    count
                }
            })
    };
}

module.exports = MeetupReporter;
