'use strict';

const FacebookReporter = require('./reporters/facebook');

function CommunityCountAggregator() {
    const reports = [
        new FacebookReporter('Gründerbar', 'https://www.facebook.com/gruenderbar.de'),
        new FacebookReporter('Hackerstolz', 'https://www.facebook.com/hackerstolz'),
        new FacebookReporter('Hackschool', 'https://www.facebook.com/hackerschule')
    ];

    this.report = () => {
        const promises = reports.map(report => report.getCount());

        Promise.all(promises)
            .then(results => {
                results.forEach(result => console.log(`${result.name}: ${result.count}`));
            });
    };
}

const aggregator = new CommunityCountAggregator();
aggregator.report();
