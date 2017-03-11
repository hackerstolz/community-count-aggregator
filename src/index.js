'use strict';

const FacebookAuthentication = require('./auth/facebookAuthentication'),
    TwitterAuthentication = require('./auth/twitterAuthentication'),
    FacebookReporter = require('./reporters/facebook'),
    MeetupReporter = require('./reporters/meetup'),
    TwitterReporter = require('./reporters/twitter'),
    InstagramReporter = require('./reporters/instagram'),
    FlickrReporter = require('./reporters/flickr'),
    YoutubeReporter = require('./reporters/youtube'),
    SlackReporter = require('./reporters/slack'),
    credentials = require('../credentials.json');

class CommunityCountAggregator {
    constructor() {
        this.facebookAuthentication = void 0;
        this.reports = void 0;
    }

    initialize() {
        this.reports = [
            new FacebookReporter(this.facebookAuthentication, 'Hackerstolz', '1591054301113415'),
            new FacebookReporter(this.facebookAuthentication, 'Hackschool', 'https://www.facebook.com/hackerschule'),
            new FacebookReporter(this.facebookAuthentication, 'Gründerbar', 'https://www.facebook.com/gruenderbar.de'),
            new TwitterReporter(this.twitterAuthentication, 'Hackerstolz', 'hackerstolz'),
            new TwitterReporter(this.twitterAuthentication, 'Gründerbar', 'gruenderbar'),
            new InstagramReporter('Hackerstolz', 'https://www.instagram.com/hackerstolz/'),
            new YoutubeReporter('Hackerstolz', 'https://www.youtube.com/channel/UCr_8g-nYnWR0GojfAvLsS1g'),
            new FlickrReporter('Hackerstolz', 'https://www.flickr.com/photos/hackerstolz/'),
            new SlackReporter('Hackerstolz Community', 'http://community.hackerstolz.de/'),
            new MeetupReporter('Mannheim', 'http://www.meetup.com/Hackschool-Mannheim/'),
            new MeetupReporter('Karlsruhe', 'http://www.meetup.com/Hackschool-KA/'),
            new MeetupReporter('Berlin', 'http://www.meetup.com/Hackschool-Berlin/'),
            new MeetupReporter('Women', 'http://www.meetup.com/HackerstolzWomen/'),
        ];
    }

    report() {
        const promises = this.reports.map(report => report.report());

        Promise.all(promises)
            .then(results => {
                results.forEach(result => console.log(`${result.name}: ${result.count}`));
            }, error => console.log(error));
    };

    authenticate() {
        this.facebookAuthentication = new FacebookAuthentication(credentials.facebook);
        this.twitterAuthentication = new TwitterAuthentication(credentials.twitter);

        return Promise.all([
            this.facebookAuthentication.authenticate(),
            this.twitterAuthentication.authenticate()
        ]);
    }
}

const aggregator = new CommunityCountAggregator();

aggregator.authenticate()
    .then(() => aggregator.initialize())
    .then(() => aggregator.report())
    .catch(err => console.error('Something went horribly wrong', err));
