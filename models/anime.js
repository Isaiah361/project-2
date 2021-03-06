const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const animeSchema = new Schema({
    title: String,
    idApi: String,
    image: String,
    synopsis: String,
    episodeCount: String,
    status: String,
    averageRating: String,
    ageRating: String,
    startDate: String,
    endDate: String,
    genres: String,
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  });

const Anime = mongoose.model('Anime', animeSchema);


module.exports = Anime;