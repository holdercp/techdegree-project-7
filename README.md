# Twitter Interface

## How to Get up and Running

1. From your console run `npm install` to install necessary dependencies. You can also just run `npm install --only=production` if you do not want to install the dev dependencies.
1. Create a `config.js` file and place it in the project root. Inside this file, store you Twitter keys and tokens. It should look something like this:

```javascript
module.exports = {
  consumer_key: "[your consumer key]",
  consumer_secret: "[your consumer secret]",
  access_token: "[your access token]",
  access_token_secret: "[your token secret]"
};
```

---

## Project Requirements

### Set up a new Express project in the provided app.js file

You will need to create the following files:

- A package.json file that includes your project’s dependencies.
- A Jade/Pug template file to display tweets and messages
- A config.js file that will contain your application’s authentication code
- A .gitignore file to add your config. js and node_modules/ folder to.

- [x] _Complete_

### Create a new Twitter application

This will generate the keys and access tokens you need to authenticate your application so it can communicate with the Twitter API. You can find a link to a tutorial on how to do this in the project resources. Please note that while the tutorial says to create a Twitter dev account at dev.twitter.com, the url to create a Twitter dev account is now https://apps.twitter.com/

- [x] _Complete_

### Use and interact with the Twitter API

To use and interact with the Twitter API, you’ll need to set up a way to give the Twitter API the set of keys and access tokens that were generated when you create your Twitter app. It’s a good idea to use an npm module to help you with this part. For this project, you’ll use an npm module called Twit. You can find a link in the project resources. Be sure to look through the documentation and familiarize yourself with how it works.

Create a file called config.js. In this file, you’ll assign an object literal to the module.exports object, as shown in the Twit documentation. The object literal should have the following properties with their corresponding values from your Twitter application account:

- consumer_key
- consumer_secret
- access_token
- access_token_secret

Import this config.js code into your app.js file to authenticate your application so you can request data from the Twitter API.
NOTE: The config.js file must be listed in the .gitignore file so it won’t be committed to your github repository. This will prevent your keys and tokens from getting posted publicly to GitHub. It is very important that you do NOT upload any of your personal API keys / secrets / passwords to Github or other publicly accessible place. When your project is reviewed, the project reviewer will use their own config file.

- [x] _Complete_

### Make a Pug/Jade template for the main page

The template should have spaces for:

- your 5 most recent tweets
- your 5 most recent friends
- your 5 most recent direct messages

It should also include your personal Twitter name and profile image at the top of the screen.
Styling is not the important part of this project. Craft your template markup to take advantage of the CSS we’ve provided you. Knowing how to work with someone else’s styles is a very important skill as a full-stack developer. Pay attention to class names, inheritance, and so on. Try to avoid element types that are not used in the provided HTML and CSS files.

- [x] _Complete_

### Handle requests and routes using Node and Express

Using Node and Express, request the data you need from Twitter’s API, render it in your template, and send it to the client at the “/” route. Please avoid using Express generator to set up this project. It will be good practice to set up a simple Express app yourself!
Each rendered result must include all of the information seen in the sample layout:

#### Tweets

- message content
- number of retweets
- number of likes
- date tweeted
- Friends
- profile image
- real name
- screen name

- [x] _Complete_

#### Messages

- message body
- date the message was sent
- time the message was sent

- [x] _Complete_

NOTE: Twitter API Update: The Twitter API now asks that API users no longer target direct_messages, but rather direct_messages/events/list. The problem is that this only targets DMs in the last thirty days. So if your user doesn't have 5 DMs in the last thirty days, and your app is expecting 5 DMs, then your app will throw an error, likely crash, and not load to the page. As a developer, the way to deal with this would be to use a conditional to check that the DMs exist before trying to doing something with them. If there are less than 5 DMs available, then all you can do is print what's available. And if you can figure out how to print a "Direct Message unavailable or does not exist" placeholder message in lieu of the missing DMs, then all the better.

NOTE: You don’t have to display direct messages as a back and forth conversation. Displaying only sent or received messages is fine.

Make sure the application actually renders your correct Twitter information by running it on your local machine and comparing it to your recent Twitter activity.

### Extra Credit

To get an "exceeds" rating, you can expand on the project in the following ways:

#### Post a new Tweet

- [x] Add a section to the bottom of your page that allows a user to post a new tweet. The new tweet should display without having to manually refresh the page.

#### Error page

- [x] Add an error page to your application, so that if the user navigates to a non-existent route, the user will see a friendly message rendered, instead of the default error code.

#### Custom background image

- [x] Include your personal background image from Twitter as a background for the page header. In the data, the property that stores this image is called profile_banner_url.
