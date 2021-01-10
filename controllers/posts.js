const Post = require('../models/post');
const debug = require('debug')('surf-shop:controllers/posts');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
  // GET    index   /posts
  async postIndex(req,res,next) {
    // find all posts
    let posts = await Post.find({});
    res.render('posts/index',{posts});
  },

  // GET    new     /posts/new
  postNew(req,res,next) {
    res.render('posts/new');
  },

  // POST   create  /posts
  async postCreate(req,res,next) {
    req.body.post.images = [];
    for (const file of req.files) {
      let image = await cloudinary.v2.uploader.upload(file.path);
      req.body.post.images.push({
        url: image.secure_url,
        public_id: image.public_id
      });
    }
    let post = await Post.create(req.body.post);
    res.redirect(`/posts/${post.id}`);
  },

  // GET    show    /posts/:id
  async postShow(req,res,next) {
    let post = await Post.findById(req.params.id);
    res.render('posts/show',{post});
  },

  // GET    edit    /posts/:id/edit
  async postEdit(req,res,next) {
    let post = await Post.findById(req.params.id);
    res.render('posts/edit',{post});
  },

  // PUT    update  /posts/:id
  async postUpdate(req, res, next) {
    // Handle any deletion of existing images

    // Handle upload any new images



    // req.body.post.images = [];
    // for (const file of req.files) {
    //
    //   let image = await cloudinary.v2.uploader.upload(file.path);
    //   req.body.post.images.push({
    //     url: image.secure_url,
    //     public_id: image.public_id
    //   });
    // }



    let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
    res.redirect(`/posts/${post.id}`);
  },

  // DELETE destroy /posts/:id
  async postDelete(req, res, next) {
    let post = await Post.findByIdAndRemove(req.params.id);
    res.redirect('/posts');
  }

}
