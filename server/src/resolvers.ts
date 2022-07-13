import Db, { DbTweet, DbUser } from './db';
import { Resolvers } from './resolvers-types.generated';
import mutationTwitterResolver from './resolvers/Mutation';
import queryTwitterResolvers from './resolvers/Query';
import trendTwitterResolver from './resolvers/Trend';
import tweetTwitterResolver from './resolvers/Tweet';
import userTwitterResolver from './resolvers/User';

export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbTweetToFavoriteCountMap: Record<string, number>;
  dbUserCache: Record<string, DbUser>;
}

const resolvers: Resolvers<TwitterResolverContext> = {
  Query: queryTwitterResolvers,
  Mutation: mutationTwitterResolver,
  Tweet: tweetTwitterResolver,
  User: userTwitterResolver,
  Trend: trendTwitterResolver,
};

export default resolvers;
