const { ApolloError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const querystring = require('querystring');

const User = require('../../database/models/User');
const Deck = require('../../database/models/Deck');

const filterCardData = require('../utils/filterCardData');
const generateSearchString = require('../utils/generateSearchString');
const uppercaseAlphaNumString = require('../utils/uppercaseAlphaNumString');

const QueryResolvers = {
  Query: {
    test: () => {
      return 'This is a test resolver.';
    },

    login: async (_, args) => {
      try {
        const { email, password } = args;
        const matchedUser = await User.findOne({ email: email });

        if (!matchedUser) {
          throw new ApolloError(`User could not be found with email ${email}.`, 'USER_NOT_FOUND');
        }

        const passwordMatches = await bcrypt.compare(password, matchedUser.password);

        if (!passwordMatches) {
          throw new ApolloError('Password Incorrect.', 'PASSWORD_INCORRECT');
        }

        const token = jwt.sign({ userId: matchedUser._id, email: matchedUser.email }, 'somesupersecretkey');

        if (!token) {
          throw new ApolloError('Error validating login.', 'TOKEN_GENERATION_ERROR');
        }

        return {
          currentUserId: matchedUser._id,
          token: token,
          expirationTime: new Date(new Date().getTime() + 3600000).toISOString()
        };
      } catch (error) {
        return error;
      }
    },

    // User-related Queries
    getUserById: async (_, __, context) => {
      try {
        const { currentUserId } = context.authenticationStatus;
        const matchedUser = await User.findById(currentUserId);

        if (!matchedUser) {
          throw new ApolloError(`No user found with User ID ${currentUserId}`, 'USER_NOT_FOUND');
        }

        return { ...matchedUser._doc, id: matchedUser._doc._id };
      } catch (error) {
        return error;
      }
    },

    // Deck-related Queries
    getAllDecks: async () => {
      try {
        return await Deck.find();
      } catch (error) {
        return error;
      }
    },

    getDeckById: async (_, args) => {
      try {
        const { deckId } = args;
        const matchedDeck = await Deck.findById(deckId);

        if (!matchedDeck) {
          throw new ApolloError('Deck not found.', 'DECK_NOT_FOUND');
        }

        return {
          ...matchedDeck._doc,
          id: matchedDeck._id
        };
      } catch (error) {
        return error;
      }
    },

    // Card-related Queries
    getRandomCard: async () => {
      try {
        const card = await axios.get(`https://api.scryfall.com/cards/random`);

        return filterCardData(card.data);
      } catch (error) {
        return error;
      }
    },

    getCardByScryfallId: async (_, args) => {
      try {
        const card = await axios.get(`https://api.scryfall.com/cards/${args.scryfallId}`);

        return filterCardData(card.data);
      } catch (error) {
        return error;
      }
    },

    searchCards: async (_, args) => {
      try {
        let url = args.url || '';

        if (!args.url) {
          url = 'https://api.scryfall.com/cards/search?q=(lang=en)';

          const searchString = generateSearchString(args.searchParams);
          url += querystring.escape(searchString);

          console.log(`QUERY_STRING: ${searchString}`);
          console.log(`API_URL: ${url}`);
          console.log(`RESULTS: https://www.scryfall.com/search?q=${querystring.escape(searchString)}`);
          console.log('------');
        }

        const response = await axios.get(url).catch(error => {
          const { status, statusText, data } = error.response;
          throw new ApolloError(`Error ${status}: ${statusText} - ${data.details}`, `SCRYFALL_ERROR_${status}`);
        });

        let results = response.data.data;

        const filteredResults = results.map(result => {
          return filterCardData(result);
        });

        return {
          cards: filteredResults,
          has_more: response.data.has_more,
          next_page: response.data.next_page || null,
          total_cards: response.data.total_cards || null
        };
      } catch (error) {
        return error;
      }
    },

    getAllSets: async () => {
      let sets = [];
      const response = await axios.get('https://api.scryfall.com/sets').catch(error => {
        throw new ApolloError('Could not connect to Scryfall API.', 'SCRYFALL_CONNECTION_ISSUE');
      });

      response.data.data.map(set => {
        if (set.set_type === 'core' || set.set_type === 'expansion') {
          sets.push({
            name: set.name,
            code: uppercaseAlphaNumString(set.code)
          });
        }
      });

      return sets;
    }
  }
};

module.exports = QueryResolvers;
