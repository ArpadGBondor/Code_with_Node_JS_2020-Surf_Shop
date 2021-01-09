const Post = require('../models/post');
const debug = require('debug')('surf-shop:controllers/posts');

module.exports = {
  async getPosts(req,res,next) {
    let posts = await Post.find({});
    res.render('posts/index',{posts});
  },

  getNewPost(req,res,next) {
    res.render('posts/new');
  },

  async postNewPost(req,res,next) {
    // use req.body to create a new Post
    let post = await Post.create(req.body);
    res.redirect(`/posts/${post.id}`);
  }
}
