const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const reviewsSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    review: String,
    rating: String,
  });

const Reviews = mongoose.model('Review', reviewsSchema);


module.exports = Reviews;