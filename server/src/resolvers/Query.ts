import { TwitterResolverContext } from '../resolvers';
import { QueryResolvers } from '../resolvers-types.generated';
import { trendTransform, tweetTransform } from '../transforms';

const queryTwitterResolvers: QueryResolvers<TwitterResolverContext> = {
  currentUser: (_, __, { db }) => {
    const [firstUser] = db.getAllUsers();
    if (!firstUser) {
      throw new Error(
        'currentUser was requested, but there are no users in the database'
      );
    }
    return firstUser;
  },
  suggestions: (_, __, { db }) => {
    return db.getAllSuggestions();
  },
  tweets: (
    _parent,
    _args,
    { db, dbTweetCache, dbTweetToFavoriteCountMap, dbUserCache }
  ) => {
    db.getAllUsers().forEach((user) => {
      dbUserCache[user.id] = user;
    });
    db.getAllFavorites().forEach((favorite) => {
      const count = dbTweetToFavoriteCountMap[favorite.tweetId] || 0;
      dbTweetToFavoriteCountMap[favorite.tweetId] = count + 1;
    });
    return db.getAllTweets().map((tweet) => {
      dbTweetCache[tweet.id] = tweet;
      return tweetTransform(tweet);
    });
  },
  trends: (_, __, { db }) => {
    return db.getAllTrends().map(trendTransform);
  },
};
export default queryTwitterResolvers;
