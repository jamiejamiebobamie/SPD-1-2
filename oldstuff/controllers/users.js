const express = require('express');
const app = express();
const Review = require('../models/review');
const Comment = require('../models/comment')
//
//module.exports = function(app, Review) {
//
//    //root route
//    app.get('/', (req, res) => {
//        Review.find()
//           .then(reviews => {
//             res.render('reviews-index', { reviews: reviews });
//           })
//           .catch(err => {
//             console.log(err);
//           })
//    });
//
//    // NEW review form
//    app.get('/reviews/new', (req, res) => {
//      res.render('reviews-new', {});
//  });
//
//    // CREATE NEW review
//    app.post('/reviews', (req, res) => {
//      Review.create(req.body).then((review) => {
//        console.log(review);
//        res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
//      }).catch((err) => {
//        console.log(err.message);
//      })
//  });
//
//    // SHOW A single review by clicking on the title link in index
//    app.get('/reviews/:id', (req, res) => {
//      Review.findById(req.params.id).then((review) => {
//        res.render('reviews-show', { review: review })
//      }).catch((err) => {
//        console.log(err.message);
//      })
//  });
//
//    // EDIT a review by clicking on the edit link in the shown review
//    app.get('/reviews/:id/edit', (req, res) => {
//      Review.findById(req.params.id, function(err, review) {
//        res.render('reviews-edit', {review: review});
//      })
//  });
//
//    // UPDATE... does this replace EDIT? ...guess not...
//    app.put('/reviews/:id', (req, res) => {
//      Review.findByIdAndUpdate(req.params.id, req.body)
//        .then(review => {
//          res.redirect(`/reviews/${review._id}`)
//        })
//        .catch(err => {
//          console.log(err.message)
//        })
//    });
//
//    // DELETE one review from the delete button on the "shown" review page
//    app.delete('/reviews/:id', function (req, res) {
//      console.log("DELETE review")
//      Review.findByIdAndRemove(req.params.id).then((review) => {
//        res.redirect('/');
//      }).catch((err) => {
//        console.log(err.message);
//      })
//  });
//
//
//
//
//}

//when i comment out the root route in app.js, this does not work


// WAY #2
//phylis does it this way below

    //root route
    app.get('/', (req, res) => {
        Review.find()
           .then(reviews => {
             res.render('reviews-index', { reviews: reviews });
           })
           .catch(err => {
             console.log(err);
           })
    });

    // NEW review form
    app.get('/reviews/new', (req, res) => {
      res.render('reviews-new', {});
  });

    // CREATE NEW review
    app.post('/reviews', (req, res) => {
      Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
      }).catch((err) => {
        console.log(err.message);
      })
  });


  // SHOW A single review by clicking on the title link in index, WITH COMMENTS!!!
  app.get('/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id).then(review => {
      // fetch its comments
      Comment.find({ reviewId: req.params.id }).then(comments => {
        // respond with the template with both values
        res.render('reviews-show', { review: review, comments: comments })
      })
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
  });


    // EDIT a review by clicking on the edit link in the shown review
    app.get('/reviews/:id/edit', (req, res) => {
      Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review});
      })
  });

    // UPDATE... does this replace EDIT? ...guess not...
    app.put('/reviews/:id', (req, res) => {
      Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
          res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
          console.log(err.message)
        })
    });

    // DELETE one review from the delete button on the "shown" review page
    app.delete('/reviews/:id', function (req, res) {
      console.log("DELETE review")
      Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
      }).catch((err) => {
        console.log(err.message);
      })
  });

module.exports = app;
