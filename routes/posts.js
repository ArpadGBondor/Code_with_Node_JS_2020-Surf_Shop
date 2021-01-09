const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/index');
const {
  postIndex,
  postNew,
  postCreate,
  postShow,
  postEdit,
  postUpdate,
  postDelete
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
router.get('/', asyncErrorHandler(postIndex));

// GET    new     /posts/new
router.get('/new', postNew);

// POST   create  /posts
router.post('/', asyncErrorHandler(postCreate));

// GET    show    /posts/:id
router.get('/:id', asyncErrorHandler(postShow));

// GET    edit    /posts/:id/edit
router.get('/:id/edit', asyncErrorHandler(postEdit));

// PUT    update  /posts/:id
router.put('/:id', asyncErrorHandler(postUpdate));

// DELETE destroy /posts/:id
router.delete('/:id', asyncErrorHandler(postDelete));

module.exports = router;
