'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

class FlickrReporter extends GenericHttpReporter {
    constructor(name, url) {
        super(/(\d+) Follower/, url, name);
    }
}

module.exports = FlickrReporter;
