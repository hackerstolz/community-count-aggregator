'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

class SlackReporter extends GenericHttpReporter {
    constructor(name, url) {
        super(/<b class="total">(\d+)/, url, name);
    }
}

module.exports = SlackReporter;
