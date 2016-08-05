'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

class InstagramReporter extends GenericHttpReporter {
    constructor(name, url) {
        super(/followed_by": \{"count": (\d+)/, url, name);
    }
}

module.exports = InstagramReporter;
