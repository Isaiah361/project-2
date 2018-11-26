const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const watchListSchema = new Schema({
    name: String,
    Description: String,
    anime: [{type: Schema.Types.ObjectId}],
    author: String,
    rating: String,
    reviews: [{type: Schema.Types.ObjectId}],
  });

const WatchList = mongoose.model('WatchList', watchListSchema);


module.exports = WatchList;