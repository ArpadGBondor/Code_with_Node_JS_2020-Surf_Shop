const Post = require('../models/post');
const debug = require('debug')('surf-shop:controllers/posts');

module.exports = {
  async getPosts(req,res,next) {
    let posts = await Post.find({});
    res.render('posts/index',{posts});
  }
}
