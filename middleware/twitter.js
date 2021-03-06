const Twit = require('twit');
const dateHelper = require('../helpers/dates.js');

const twitter = (config) => {
  const twit = new Twit(config);

  const getUser = () => twit
    .get('account/settings')
    .then(user => user.data.screen_name)
    .then(handle => twit.get('users/show', { screen_name: handle }))
    .then(userData => ({
      id: userData.data.id_str,
      handle: userData.data.screen_name,
      profImg: userData.data.profile_image_url_https,
      bannerImg: userData.data.profile_banner_url,
    }));

  const getSenderImg = userId => twit.get('users/show', { user_id: userId }).then(sender => sender.data.profile_image_url_https);

  const getTimeline = () => twit.get('statuses/home_timeline', { count: 20 }).then(result => result.data.map(tweet => ({
    name: tweet.user.name,
    handle: tweet.user.screen_name,
    profImg: tweet.user.profile_image_url_https,
    text: tweet.text,
    time: dateHelper.formatDate(tweet.created_at),
    countRT: tweet.retweet_count,
    countFav: tweet.favorite_count,
  })));

  const getFriends = () => twit.get('friends/list', { count: 20 }).then(result => result.data.users.map(friend => ({
    name: friend.name,
    handle: friend.screen_name,
    profImg: friend.profile_image_url_https,
  })));

  const onlyUniqueIds = (ids, message) => {
    const id = message.message_create.sender_id;
    if (!ids.includes(id)) ids.push(id);
    return ids;
  };

  const getMessages = () => twit.get('direct_messages/events/list', { count: 20 }).then((messageList) => {
    const uniqueIds = messageList.data.events.reduce(onlyUniqueIds, []);

    return Promise.all(
      // First, map sender id to img url
      uniqueIds.map(id => getSenderImg(id).then(img => ({
        [id]: img,
      }))),
    ).then((senderImgs) => {
      // Then transform arr into a single object of id: imgUrl pairs
      const senderIdAndImg = Object.assign({}, ...senderImgs);

      return messageList.data.events.map(message => ({
        senderId: message.message_create.sender_id,
        text: message.message_create.message_data.text,
        time: dateHelper.formatDate(parseInt(message.created_timestamp, 10)),
        senderImg: senderIdAndImg[message.message_create.sender_id],
      }));
    });
  });

  const postTweet = status => twit.post('statuses/update', { status }).then(tweet => ({
    name: tweet.data.user.name,
    handle: tweet.data.user.screen_name,
    profImg: tweet.data.user.profile_image_url_https,
    text: tweet.data.text,
    time: dateHelper.formatDate(tweet.data.created_at),
    countRT: tweet.data.retweet_count,
    countFav: tweet.data.favorite_count,
  }));

  const getData = () => Promise.all([getTimeline(), getFriends(), getMessages(), getUser()]);

  return {
    getData,
    postTweet,
  };
};

module.exports = twitter;
