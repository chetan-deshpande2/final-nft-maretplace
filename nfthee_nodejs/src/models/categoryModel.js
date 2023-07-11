const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required:true
    },
    icon: {
        type: String,
        default:''
    },
    description: {
        type: String,
        default:''
    },
    status: {
        type: Number,
        default: 0
    },
  
}, { timestamps: true ,versionKey:false});

module.exports = mongoose.model("category", categorySchema);

