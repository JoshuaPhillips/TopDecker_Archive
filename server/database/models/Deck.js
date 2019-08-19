const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardListSchema = new Schema({
  scryfallId: {
    type: String,
    required: true
  },
  mainDeckCount: {
    type: Number,
    required: true,
    default: 0
  },
  sideboardCount: {
    type: Number,
    required: true,
    default: 0
  }
});

const deckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  format: {
    type: String,
    required: true,
    enum: ['standard', 'modern', 'commander']
  },
  commander: {
    type: String
  },
  cardList: [cardListSchema],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Deck', deckSchema);
