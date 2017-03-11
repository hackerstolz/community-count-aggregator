# community-count-aggregator
Very simple Node.js app to aggregate the count of social media followers.

## Prerequisites

Due to a better and better protection of Facebook and Twitter site grabbing, we decided to use a Facebook and Twitter app for grabbing data.
Since committing the real credentials would be a bad idea, the repository does not run out-of-box anymore. You'll need to add a file 
`credentials.json` in the root of this repository with the following content:

```json
{
  "facebook": {
    "clientId": "Your Client Id",
    "clientSecret": "Your Client Secret"
  },
  "twitter": {
    "consumerKey": "Your Consumer Key",
    "consumerSecret": "Your Consumer Secret"
  }
}
```

After that, the Community Count Aggregator is ready for work!

## Usage

Execute `npm start` to get all social media followers for Hackerstolz.
