const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/index');
const {
  getPosts,
  getNewPost,
  postNewPost,
  showPost,
  getEditPost
} = require('../controllers/posts');

// RESTful routing:
  // GET    index   /posts
  // GET    new     /posts/new
  // POST   create  /posts
  // GET    show    /posts/:id
  // GET    edit    /posts/:id/edit
  // PUT    update  /posts/:id
  // DELETE destroy /posts/:id

// GET    index   /posts
router.get('/', errorHandler(getPosts));

// GET    new     /posts/new
router.get('/new', getNewPost);

// POST   create  /posts
router.post('/', errorHandler(postNewPost));

// GET    show    /posts/:id
router.get('/:id', errorHandler(showPost));

// GET    edit    /posts/:id/edit
router.get('/:id/edit', errorHandler(getEditPost));

// PUT    update  /posts/:id
router.put('/:id', (req, res, next) => {
  res.send('UPDATE /posts/' + req.params.id);
});

// DELETE destroy /posts/:id
router.delete('/:id', (req, res, next) => {
  res.send('DELETE /posts/' + req.params.id);
});

module.exports = router;
