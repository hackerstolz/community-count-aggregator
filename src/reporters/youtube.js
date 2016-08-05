'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

class YoutubeReporter extends GenericHttpReporter {
    constructor(name, url) {
        super(/aria-label="(\d+) subscribers"/, url, name);
    }
}

module.exports = YoutubeReporter;
