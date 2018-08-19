const express = require('express');
const bodyParser = require('body-parser');
const twitter = require('./middleware/twitter.js');
const config = require('./config.js');

const app = express();
const t = twitter(config);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res, next) => {
  t.getData()
    .then((data) => {
      const [timeline, friends, messages, user] = data;

      res.render('index', {
        timeline,
        friends,
        messages,
        user,
      });
    })
    .catch(() => {
      const err = new Error('Whoops! Something went wrong.');
      err.status = 500;
      next(err);
    });
});

app.post('/tweet', (req, res) => {
  t.postTweet(req.body.content).then((tweet) => {
    res.send(tweet);
  });
});

app.use((req, res, next) => {
  const err = new Error('Are you lost?');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status >= 100 && err.status < 600 ? err.status : 500);
  res.render('error', { error: err });
});

app.listen(3000, () => console.log('The Express server is running at http://localhost:3000'));
