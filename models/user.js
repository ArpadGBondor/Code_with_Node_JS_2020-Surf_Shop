const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
// User
//  - email - string
//  - password - string <-- will be automnaticly added by passport
//  - username - string <-- will be automnaticly added by passport
//  - image - string
//  - posts - array of objects ref Post
const UserSchema = new Schema({
  email: String,
  image: { url: String, public_id: String }
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
