const Deck = require('../../database/models/Deck');

const UserResolvers = {
  User: {
    password: () => null,

    decks: async parent => {
      try {
        return await Deck.find({ owner: parent._id });
      } catch (error) {
        return error;
      }
    },

    comments: async parent => {
      try {
        return await Comment.find({ author: parent._id });
      } catch (error) {
        return error;
      }
    }
  }
};

module.exports = UserResolvers;
