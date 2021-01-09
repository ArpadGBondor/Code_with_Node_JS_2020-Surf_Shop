const Post = require('../models/post');
const debug = require('debug')('surf-shop:controllers/posts');

module.exports = {
  async postIndex(req,res,next) {
    // find all posts
    let posts = await Post.find({});
    res.render('posts/index',{posts});
  },

  postNew(req,res,next) {
    res.render('posts/new');
  },

  async postCreate(req,res,next) {
    // use req.body to create a new Post
    let post = await Post.create(req.body.post);
    res.redirect(`/posts/${post.id}`);
  },

  async postShow(req,res,next) {
    // req.params.id contains the id
    let post = await Post.findById(req.params.id);
    res.render('posts/show',{post});
  },

  async postEdit(req,res,next) {
    // req.params.id contains the id
    let post = await Post.findById(req.params.id);
    res.render('posts/edit',{post});
  },

  async postUpdate(req, res, next) {
    let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
    res.redirect(`/posts/${post.id}`);
  },

  async postDelete(req, res, next) {
    let post = await Post.findByIdAndRemove(req.params.id);
    res.redirect('/posts');
  }

}
