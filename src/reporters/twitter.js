'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

class TwitterReporter extends GenericHttpReporter {
    constructor(name, url) {
        super(/followers"><b class="UserProfileHeader-statCount">(\d+)/, url, name);
    }
}

module.exports = TwitterReporter;
