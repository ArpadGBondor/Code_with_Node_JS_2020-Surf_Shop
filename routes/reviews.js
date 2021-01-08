const express = require('express');
const router = express.Router({ mergeParams: true});

// RESTful routing:
  // GET    index   /posts/:id/reviews
  // GET    new     /posts/:id/reviews/new
    // We don't need separate page to write a review, we will do it from the post page
  // POST   create  /posts/:id/reviews
  // GET    show    /posts/:id/reviews/:id
    // We don't need to show reviews one by one
  // GET    edit    /posts/:id/reviews/:id/edit
  // PUT    update  /posts/:id/reviews/:id
  // DELETE destroy /posts/:id/reviews/:id

// GET    index   /posts/:id/reviews
router.get('/', (req, res, next) => {
  res.send('INDEX /posts/' + req.params.id + '/reviews');
});

// GET    new     /posts/:id/reviews/new
  // We don't need separate page to write a review, we will do it from the post page

// POST   create  /posts/:id/reviews
router.post('/', (req, res, next) => {
  res.send('CREATE /posts/' + req.params.id + '/reviews');
});

// GET    show    /posts/:id/reviews/:id
  // We don't need to show reviews one by one

// GET    edit    /posts/:id/reviews/:id/edit
router.get('/:review_id/edit', (req, res, next) => {
  res.send('EDIT /posts/' + req.params.id + '/reviews/' + req.params.review_id + '/edit');
});

// PUT    update  /posts/:id/reviews/:id
router.put('/:review_id', (req, res, next) => {
  res.send('UPDATE /posts/' + req.params.id + '/reviews/' + req.params.review_id);
});

// DELETE destroy /posts/:id/reviews/:id
router.delete('/:review_id', (req, res, next) => {
  res.send('DELETE /posts/' + req.params.id + '/reviews/' + req.params.review_id);
});

module.exports = router;
