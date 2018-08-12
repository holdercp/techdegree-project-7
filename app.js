const express = require('express');
const twitter = require('./middleware/twitter.js');
const config = require('./config.js');

const app = express();
const t = twitter(config);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
  Promise.all([t.getTimeline(), t.getFriends(), t.getMessages()]).then((results) => {
    const [timeline, friends, messages] = results;

    res.render('index', { timeline, friends, messages });
  });
});

app.listen(3000, () => console.log('The Express server is running at http://localhost:3000'));
