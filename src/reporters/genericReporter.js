'use strict';

'use strict';

const request = require('request');

class GenericReporter {
    constructor(name) {
        this.name = name;
    }

    getCount() {
        throw new Error('Implement me, returning a promise.');
    };

    report() {
        return this.getCount()
            .then(count => {
                return {
                    name: `${this.constructor.name} (${this.name})`,
                    count
                }
            });
    }
}

module.exports = GenericReporter;
