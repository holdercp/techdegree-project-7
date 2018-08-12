const Twit = require('twit');
const dateHelper = require('../helpers/dates.js');

const twitter = (config) => {
  const twit = new Twit(config);

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

  const getMessages = () => twit.get('direct_messages/events/list').then(result => result.data.events.map(message => ({
    senderId: message.message_create.sender_id,
    text: message.message_create.message_data.text,
    hoursAgo: dateHelper.hoursDiff(parseInt(message.created_timestamp, 10)),
  })));

  return { getTimeline, getFriends, getMessages };
};

module.exports = twitter;
