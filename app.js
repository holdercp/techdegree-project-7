const express = require('express');
const Twit = require('twit');
const config = require('./config.js');
const util = require('./utilities.js');

const app = express();
const twit = new Twit(config);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
  const timelineP = twit.get('statuses/home_timeline', { count: 5 });
  const followersP = twit.get('friends/list', { count: 5 });

  Promise.all([timelineP, followersP])
    .catch((err) => {
      console.log(err);
    })
    .then((result) => {
      const timeline = result[0].data.map(tweet => ({
        name: tweet.user.name,
        handle: tweet.user.screen_name,
        imageProf: tweet.user.profile_image_url_https,
        text: tweet.text,
        hoursAgo: util.hoursDiff(tweet.created_at),
        countRT: tweet.retweet_count,
        countFav: tweet.favorite_count,
      }));

      const friends = result[1].data.users.map(friend => ({
        name: friend.name,
        handle: friend.screen_name,
        imageProf: friend.profile_image_url_https,
      }));

      res.render('index', { timeline, friends });
    });
});

app.get('/test', (req, res) => {
  twit
    .get('friends/list', { count: 5 })
    .catch((err) => {
      res.send(err);
    })
    .then((result) => {
      res.send(result.data);
    });
});

app.listen(3000, () => console.log('The Express server is running at http://localhost:3000'));
