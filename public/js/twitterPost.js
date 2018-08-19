(function twitterPost() {
  function buildTweet(tweetData, nodeToClone) {
    const tweetClone = nodeToClone.cloneNode(true);
    const time = tweetClone.querySelector('strong.app--tweet--timestamp');
    const avatarContainer = tweetClone.querySelector('a.app--tweet--author .app--avatar');
    const avatarImg = tweetClone.querySelector('a.app--tweet--author .app--avatar img');
    const name = tweetClone.querySelector('a.app--tweet--author h4');
    const text = tweetClone.querySelector('p');
    const rtCount = tweetClone.querySelector('a.app--retweet strong');
    const favCount = tweetClone.querySelector('a.app--like strong');

    time.innerText = tweetData.time;
    avatarContainer.style = `background-image: url(${tweetData.profImg})`;
    avatarImg.setAttribute('src', tweetData.profImg);
    name.innerText = tweetData.name;
    text.innerText = tweetData.text;
    rtCount.innerText = tweetData.countRT;
    favCount.innerText = tweetData.countFav;

    return tweetClone;
  }

  function attachTweet(tweet) {
    const tweetList = document.querySelector('ul.app--tweet--list');
    const recentTweet = tweetList.firstChild;
    const newTweet = buildTweet(tweet, recentTweet);

    tweetList.insertBefore(newTweet, recentTweet);
  }

  function createTweet(url = '', data = {}) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(tweetData => attachTweet(tweetData))
      .catch((e) => {
        throw new Error(e);
      });
  }

  function submitTweet(e) {
    e.preventDefault();
    // TODO: This should be sanitized IRL
    const tweetBox = document.getElementById('tweet-textarea');
    const content = tweetBox.value;

    if (content) {
      createTweet('http://localhost:3000/tweet', { content });
      tweetBox.value = '';
    }
  }

  const tweetBtn = document.querySelector('.app--tweet button');

  tweetBtn.addEventListener('click', submitTweet);
}());
