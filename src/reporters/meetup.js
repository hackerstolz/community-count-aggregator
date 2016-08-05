'use strict';

const GenericHttpReporter = require('./genericHttpReporter');

class MeetupReporter extends GenericHttpReporter {
    constructor(name, url) {
        super(/class="D_count">\((\d+)\)/, `${url}members/`, name);
    }
}

module.exports = MeetupReporter;
