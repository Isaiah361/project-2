const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema(
  {
  username: String,
  password: String,
  email: String,
  avatar: String,
  bio: String,
  watched: [{type: Schema.Types.ObjectId}],
  wishList: [{type: Schema.Types.ObjectId}],
  favAnime: [{type: Schema.Types.ObjectId}],
  favList: [{type: Schema.Types.ObjectId}],
  reviews: [{type: Schema.Types.ObjectId, ref: 'review'}],
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;