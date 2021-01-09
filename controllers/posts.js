const Post = require('../models/post');
const debug = require('debug')('surf-shop:controllers/posts');

module.exports = {
  async getPosts(req,res,next) {
    // find all posts
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
  },

  async showPost(req,res,next) {
    // req.params.id contains the id
    let post = await Post.findById(req.params.id);
    res.render('posts/show',{post});
  }


}
