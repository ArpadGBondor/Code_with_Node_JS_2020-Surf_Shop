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
    if (req.files) {
      for (const file of req.files) {
        let image = await cloudinary.v2.uploader.upload(file.path);
        req.body.post.images.push({
          url: image.secure_url,
          public_id: image.public_id
        });
      }
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
    // find the post by idea
    let post = await Post.findById(req.params.id);
    // check if there's any images for deletion
    if (req.body.deleteImages && req.body.deleteImages.length > 0) {
      // assign deleteImages from req.body to it's own variable
      let deleteImages = req.body.deleteImages;
      // loop over deleteImages
      for (const public_id of deleteImages) {
        // delete images from cloudinary
        await cloudinary.v2.uploader.destroy(public_id);
        // delete image from post.images
        for (const image of post.images) {
          if (image.public_id === public_id) {
            let index = post.images.indexOf(image);
            post.images.splice(index,1);
          }
        }
      }
    }
    // check if there are any new images for upload
    if (req.files) {
      for (const file of req.files) {
        // upload images
        let image = await cloudinary.v2.uploader.upload(file.path);
        // add images to post.images array
        req.body.post.images.push({
          url: image.secure_url,
          public_id: image.public_id
        });
      }
    }
    // update the post with any new properties
    for (const property in req.body.post) {
      post[property] = req.body.post[property];
    }
    // save the updated post into the db
    await post.save();
    // redirect to show page
    res.redirect(`/posts/${post.id}`);
  },

  // DELETE destroy /posts/:id
  async postDelete(req, res, next) {
    // find the post by idea
    let post = await Post.findById(req.params.id);
    // check if there's any images for deletion
    if (post.images.length > 0) {
      // loop over images
      for (const {public_id} of post.images) {
        // delete images from cloudinary
        await cloudinary.v2.uploader.destroy(public_id);
      }
    }
    await post.remove();
    // Images should be deleted from server
    res.redirect('/posts');
  }

}
