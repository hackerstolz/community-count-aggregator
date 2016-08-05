'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

class FacebookReporter extends GenericHttpReporter {
    constructor(name, url) {
        super(/id="PagesLikesCountDOMID">.*?>(\d+)/, url, name);
    }
}

module.exports = FacebookReporter;
