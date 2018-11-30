const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema(
  {
  username: String,
  password: String,
  email: String,
  avatar: String,
  bio: String,
  favAnime: [{type: Schema.Types.ObjectId, ref: 'Anime'}],
  favList: [{type: Schema.Types.ObjectId}],
  reviews: [{type: Schema.Types.ObjectId, ref: 'review'}],
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;