'use strict';

const FacebookReporter = require('./reporters/facebook'),
    MeetupReporter = require('./reporters/meetup');

function CommunityCountAggregator() {
    const reports = [
        new FacebookReporter('Gründerbar', 'https://www.facebook.com/gruenderbar.de'),
        new FacebookReporter('Hackerstolz', 'https://www.facebook.com/hackerstolz'),
        new FacebookReporter('Hackschool', 'https://www.facebook.com/hackerschule'),
        new MeetupReporter('Mannheim', 'http://www.meetup.com/Hackschool-Mannheim/'),
        new MeetupReporter('Karlsruhe', 'http://www.meetup.com/Hackschool-KA/'),
    ];

    this.report = () => {
        const promises = reports.map(report => report.report());

        Promise.all(promises)
            .then(results => {
                results.forEach(result => console.log(`${result.name}: ${result.count}`));
            });
    };
}

const aggregator = new CommunityCountAggregator();
aggregator.report();
