const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      profile_image: {
        type: String,
        
      },
      auth_key: {
        type: String,
        default: '',
      },
}, { timestamps: true });

module.exports = mongoose.model("Login", authSchema);
