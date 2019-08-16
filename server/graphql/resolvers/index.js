const QueryResolvers = require('./Query');
const MutationResolvers = require('./Mutation');
const UserResolvers = require('./User');
const DeckResolvers = require('./Deck');
const CommentResolvers = require('./Comment');

module.exports = {
  ...QueryResolvers,
  ...MutationResolvers,
  ...UserResolvers,
  ...DeckResolvers,
  ...CommentResolvers
};
