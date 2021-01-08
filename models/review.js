const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Review:
//  - body - string
//  - author - object id (ref User)
const ReviewSchema = new Schema({
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
module.exports = mongoose.model('Review', ReviewSchema);
