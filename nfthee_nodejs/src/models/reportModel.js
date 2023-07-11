const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    nftId: {
      type: mongoose.Schema.ObjectId,
      ref: 'nft',
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
    action: {
      type: String,
      enum: ['Fake Collection', 'Explict', 'Spam', 'Other'], 
    },
    report_issue: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true } }
);

reportSchema.virtual('timeSinceCreated').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
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

  return this.createdAt.toLocaleDateString();
});

module.exports = mongoose.model('reportmodel', reportSchema);
