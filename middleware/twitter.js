const Twit = require('twit');
const dateHelper = require('../helpers/dates.js');

const twitter = (config) => {
  const twit = new Twit(config);

  const getUser = () => twit
    .get('account/settings')
    .then(user => user.data.screen_name)
    .then(handle => twit.get('users/show', { screen_name: handle }))
    .then(userData => ({
      handle: userData.data.screen_name,
      profImg: userData.data.profile_image_url_https,
    }));

  const getSenderImg = userId => twit.get('users/show', { user_id: userId }).then(sender => sender.data.profile_image_url_https);

  const processMessage = message => getSenderImg(message.message_create.sender_id).then(senderImgUrl => ({
    senderId: message.message_create.sender_id,
    text: message.message_create.message_data.text,
    hoursAgo: dateHelper.hoursDiff(parseInt(message.created_timestamp, 10)),
    senderImg: senderImgUrl,
  }));

  const getTimeline = () => twit.get('statuses/home_timeline', { count: 5 }).then(result => result.data.map(tweet => ({
    name: tweet.user.name,
    handle: tweet.user.screen_name,
    imageProf: tweet.user.profile_image_url_https,
    text: tweet.text,
    hoursAgo: dateHelper.hoursDiff(tweet.created_at),
    countRT: tweet.retweet_count,
    countFav: tweet.favorite_count,
  })));

  const getFriends = () => twit.get('friends/list', { count: 5 }).then(result => result.data.users.map(friend => ({
    name: friend.name,
    handle: friend.screen_name,
    imageProf: friend.profile_image_url_https,
  })));

  const getMessages = () => twit.get('direct_messages/events/list').then((messageList) => {
    const messageProms = messageList.data.events.map(processMessage);
    return Promise.all(messageProms);
  });

  return {
    getTimeline,
    getFriends,
    getMessages,
    getUser,
  };
};

module.exports = twitter;
