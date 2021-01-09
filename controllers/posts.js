const Post = require('../models/post');
const debug = require('debug')('surf-shop:controllers/posts');

module.exports = {
  getPosts(req,res,next) {
    res.send('INDEX /posts controller');
  }
}
