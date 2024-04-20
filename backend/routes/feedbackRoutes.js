// routes/feedback.route.js
const router = require('express').Router();
let Feedback = require('../models/feedback'); // Ensure the path is correct; it might be '../models/feedback.model'

// Get all feedbacks
router.route('/feedbacks/').get((req, res) => {
  Feedback.find()
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Add a new feedback
router.post('/feedbacks/add', (req, res) => {
  const { product, feedback, rating, status } = req.body;

  const newFeedback = new Feedback({
    product,
    feedback,
    rating: Number(rating),
    status: "pending" // Set default status if not provided
  });

  newFeedback.save()
    .then(() => res.json('Feedback added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a specific feedback
router.route('/:id').get((req, res) => {
  Feedback.findById(req.params.id)
    .then(feedback => res.json(feedback))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a specific feedback
router.route('/update/:id').put((req, res) => {
  Feedback.findById(req.params.id)
    .then(feedback => {
      feedback.product = req.body.product;
      feedback.feedback = req.body.feedback;
      feedback.rating = Number(req.body.rating);

      feedback.save()
        .then(() => res.json('Feedback updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get count of ratings for a specific product
router.route('/feedbacks/ratings/count/:productName').get((req, res) => {
    const productName = req.params.productName;
    Feedback.countDocuments({ product: productName })
      .then(count => {
        res.json({ product: productName, ratingCount: count });
        console.log(count)
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }); 
 

// Delete a specific feedback
router.route('/feedbacks/:id').delete((req, res) => {
  Feedback.findByIdAndDelete(req.params.id)
    .then(() => res.json('Feedback deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;