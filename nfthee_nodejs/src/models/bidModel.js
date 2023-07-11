const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidSchema = new Schema({
  bidder: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  },
  bid_status: {
    type: String,
    enum: ['Bid', 'Cancelled', 'Accepted', 'Sold', 'Rejected'],
  },
  bid_price: {
    type: Number,
    required: true,
  },
  nftId: {
    type: mongoose.Schema.ObjectId,
    ref: 'nft',
  },
  orderId: {
    type: mongoose.Schema.ObjectId,
    ref: 'order',
  },
  sCreated: {
    type: Date,
    default: Date.now,
  },
  bid_deadline: Number,
  bid_quantity: Number,
},
{ toJSON: { virtuals: true } })
bidSchema.virtual('timeSinceCreated').get(function() {
  const now = new Date();
  const diff = now - this.sCreated;
  const diffInSeconds = Math.round(diff / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.round(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.round(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.round(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  return this.sCreated.toLocaleDateString();
});


module.exports = mongoose.model('bid', bidSchema);