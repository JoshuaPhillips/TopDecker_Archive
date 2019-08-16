const { ApolloError } = require('apollo-server');

const User = require('../../database/models/User');
const Deck = require('../../database/models/Deck');

const CommentResolvers = {
  Comment: {
    author: async parent => {
      try {
        const matchedUser = await User.findById(parent.author);

        if (!matchedUser) {
          throw new ApolloError('User could not be found.', 'USER_NOT_FOUND');
        }

        return matchedUser.Doc;
      } catch (error) {
        return error;
      }
    },

    relatedDeck: async parent => {
      try {
        const matchedDeck = await Deck.findById(parent.relatedDeck);

        if (!matchedDeck) {
          throw new ApolloError('Deck could not be found.', 'DECK_NOT_FOUND');
        }

        return matchedDeck._doc;
      } catch (error) {
        return error;
      }
    }
  }
};

module.exports = CommentResolvers;
