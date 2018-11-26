const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const animeSchema = new Schema({
    tital: String,
    image: String,
    synopsis: String,
    episodeCount: String,
    status: String,
    averageRating: String,
    reviewRating: String,
    ageRating: String,
    startDate: String,
    reviews: [{type: Schema.Types.ObjectId}],
  });

const Anime = mongoose.model('Anime', animeSchema);


module.exports = Anime;