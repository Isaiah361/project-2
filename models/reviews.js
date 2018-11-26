const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const reviewsSchema = new Schema({
    author: String,
    reviews: [{type: Schema.Types.ObjectId}],
    belongsTo: Schema.Types.ObjectId,
    rating: String,
  });

const Reviews = mongoose.model('Reviews', reviewsSchema);


module.exports = Reviews;