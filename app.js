const express = require('express');
const twitter = require('./middleware/twitter.js');
const config = require('./config.js');

const app = express();
const t = twitter(config);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
  t.getData().then((data) => {
    const [timeline, friends, messages, user] = data;

    res.render('index', {
      timeline,
      friends,
      messages,
      user,
    });
  });
});

app.listen(3000, () => console.log('The Express server is running at http://localhost:3000'));
