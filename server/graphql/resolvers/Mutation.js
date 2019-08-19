const { ApolloError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const User = require('../../database/models/User');
const Deck = require('../../database/models/Deck');
const Comment = require('../../database/models/Comment');

const MutationResolvers = {
  Mutation: {
    createUser: async (_, args) => {
      try {
        const { userDetails } = args;

        const detailsExist = await User.findOne({
          $or: [{ email: userDetails.email }, { username: userDetails.username }]
        });

        if (detailsExist) {
          throw new ApolloError(`User with that email or username already exists.`, 'USER_CREDENTIALS_EXIST');
        }

        const newUser = new User({
          ...userDetails,
          decks: []
        });

        newUser.password = await bcrypt.hash(userDetails.password, 12);
        const savedUser = await newUser.save();

        const token = jwt.sign({ userId: savedUser._id, email: savedUser._doc.email }, 'somesupersecretkey');

        return {
          currentUserId: savedUser._id,
          token: token,
          expirationTime: new Date(new Date().getTime() + 3600000).toISOString()
        };
      } catch (error) {
        return error;
      }
    },

    editUser: async (_, args, context) => {
      try {
        const { currentUserId } = context.authenticationStatus;
        const { newDetails } = args;

        const updatedUser = await User.findByIdAndUpdate(
          currentUserId,
          {
            ...newDetails
          },
          { new: true }
        );

        if (!updatedUser) {
          throw new ApolloError('Error updating user.', 'ERROR_UPDATING_USER');
        }

        return { ...updatedUser._doc, id: updatedUser._doc._id };
      } catch (error) {
        return error;
      }
    },

    deleteUser: async (_, args, context) => {
      try {
        const { currentUserId } = context.authenticationStatus;
        const { password } = args;
        const matchedUser = await User.findById(currentUserId);

        if (!matchedUser) {
          throw new ApolloError('User could not be found.', 'USER_NOT_FOUND');
        }

        const passwordCorrect = await bcrypt.compare(password, matchedUser.password);

        if (!passwordCorrect) {
          throw new ApolloError('Password not correct.', 'PASSWORD_INCORRECT');
        }

        const success = await User.findByIdAndDelete(currentUserId);

        if (!success) {
          throw new ApolloError('Database error.', 'ERROR_DELETING_USER');
        }

        return true;
      } catch (error) {
        return error;
      }
    },

    changePassword: async (_, args, context) => {
      try {
        // Find current user by their ID.
        const { currentUserId } = context.authenticationStatus;
        const { currentPassword, newPassword, confirmationPassword } = args;

        const matchedUser = await User.findById(currentUserId);

        if (!matchedUser) {
          throw new ApolloError('User not found.', 'USER_NOT_FOUND');
        }

        // Check that the current password is correct.
        const passwordCorrect = await bcrypt.compare(currentPassword, matchedUser.password);

        if (!passwordCorrect) {
          throw new ApolloError('Password incorrect.', 'PASSWORD_INCORRECT');
        }

        // Check that the two version of the new password given match (this will be check on the client side too).
        if (newPassword !== confirmationPassword) {
          throw new ApolloError('Passwords do not match.', 'UNMATCHED_PASSWORDS');
        }

        // Otherwise - good to go. Update the user's new password.
        matchedUser.password = await bcrypt.hash(newPassword, 12);
        await matchedUser.save();

        return {
          ...matchedUser._doc,
          password: null
        };
      } catch (error) {
        return error;
      }
    },

    createDeck: async (_, args, context) => {
      try {
        const { currentUserId } = context.authenticationStatus;
        const { deckDetails } = args;

        const matchedUser = await User.findById(currentUserId);

        if (!matchedUser) {
          throw new ApolloError('User could not be found.', 'USER_NOT_FOUND');
        }

        if (deckDetails.commander) {
          // Check if the commander card ID exists in Scryfall.
          const commander = await axios.get(`http://api.scryfall.com/cards/${deckDetails.commander}`);

          if (!commander) {
            throw new ApolloError('Commander not found.', 'COMMANDER_NOT_FOUND');
          }
        }

        const newDeck = new Deck({
          ...deckDetails,
          owner: currentUserId,
          cardList: [],
          sideboard: [],
          comments: []
        });

        if (deckDetails.commander) {
          // this will the scryfall ID of the commander
          newDeck.commander = deckDetails.commander;
          newDeck.cardList.push({
            scryfallId: deckDetails.commander,
            mainDeckCount: 1,
            sideboardCount: 0
          });
        }

        const savedDeck = await newDeck.save();

        if (!savedDeck) {
          throw new ApolloError('Error creating new deck.', 'ERROR_CREATING_DECK');
        }

        matchedUser.decks.push(savedDeck._id);

        await matchedUser.save();

        return { ...savedDeck._doc, id: savedDeck._doc._id };
      } catch (error) {
        return error;
      }
    },

    editDeck: async (_, args) => {
      try {
        const { deckId, newDetails } = args;

        const updatedDeck = await Deck.findByIdAndUpdate(
          deckId,
          {
            ...newDetails
          },
          { new: true }
        );

        if (!updatedDeck) {
          throw new ApolloError('Error updating deck.', 'ERROR_UPDATING_DECK');
        }

        return { ...updatedDeck._doc, id: updatedDeck._doc._id };
      } catch (error) {
        return error;
      }
    },

    deleteDeck: async (_, args) => {
      try {
        const { deckId } = args;

        const matchedDeck = await Deck.findByIdAndDelete(deckId);

        if (!matchedDeck) {
          throw new ApolloError('Could not find Deck.', 'DECK_NOT_FOUND');
        }

        const deckOwner = await User.findById(matchedDeck.owner);

        deckOwner.decks = deckOwner.decks.filter(deck => {
          return !deck.equals(matchedDeck._id);
        });

        const success = await deckOwner.save();

        if (success) {
          return true;
        }

        return false;
      } catch (error) {
        return error;
      }
    },

    updateCardList: async (_, args) => {
      try {
        const { deckId, cardList } = args;

        const matchedDeck = await Deck.findById(deckId);

        if (!matchedDeck) {
          throw new ApolloError('Deck not found.', 'DECK_NOT_FOUND');
        }

        matchedDeck.cardList = cardList;

        await matchedDeck.save();

        return true;
      } catch (error) {
        return error;
      }
    },

    createComment: async (_, args, context) => {
      try {
        const { currentUserId } = context.authenticationStatus;
        const { deckId, commentText } = args;

        const matchedDeck = await Deck.findById(deckId);
        const matchedUser = await User.findById(currentUserId);

        if (!matchedUser) {
          throw new ApolloError('User could not be found.', 'USER_NOT_FOUND');
        }

        if (!matchedDeck) {
          throw new ApolloError('Deck could not be found.', 'DECK_NOT_FOUND');
        }

        const newComment = new Comment({
          author: currentUserId,
          relatedDeck: deckId,
          text: commentText
        });

        const savedComment = await newComment.save();

        matchedDeck.comments.push(newComment);
        await matchedDeck.save();

        matchedUser.comments.push(newComment);
        await matchedUser.save();

        return savedComment._doc;
      } catch (error) {
        return error;
      }
    },

    editComment: async (_, args) => {
      const { commentId, newText } = args;

      const updatedComment = await Comment.findByIdAndUpdate(commentId, { text: newText }, { new: true });

      if (!updatedComment) {
        throw new ApolloError('Comment could not be found.', 'COMMENT_NOT_FOUND');
      }

      return { ...updatedComment._doc, id: updatedComment._doc._id };
    },

    deleteComment: async (_, args) => {
      try {
        const { commentId } = args;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
          throw new ApolloError('Could not delete comment.', 'COMMENT_NOT_FOUND');
        }

        const author = await User.findById(deletedComment.author);

        if (!author) {
          throw new ApolloError('Could not find author.', 'USER_NOT_FOUND');
        }

        author.comments = author.comments.filter(comment => {
          return !comment.equals(deletedComment._id);
        });

        await author.save();

        const relatedDeck = await Deck.findById(deletedComment.relatedDeck);

        if (!relatedDeck) {
          throw new ApolloError('Could not find deck.', 'DECK_NOT_FOUND');
        }

        relatedDeck.comments = relatedDeck.comments.filter(comment => {
          return !comment.equals(deletedComment._id);
        });

        await relatedDeck.save();

        return true;
      } catch (error) {
        return error;
      }
    }
  }
};

module.exports = MutationResolvers;
