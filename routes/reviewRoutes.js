const express = require('express');
const router  = express.Router();
const Anime = require("../models/anime");
const Reviews = require("../models/reviews");


router.get('/anime/:theIdThing/edit',isLoggedIn, (req, res, next)=>{
  Reviews.findById(req.params.theIdThing)
  .then((theReview)=>{
    canEdit = false
    // if(req.user){
      console.log(req.user, theReview )
    if(String(req.user.username === String(theReview.author))){
      console.log(req.user, theReview )
      canEdit = true
     }
  // }
   res.render('Anime/editReview', {theReview: theReview, canEdit: canEdit})
  })
  .catch((err)=>{
      next(err);
  })
});

router.post('/anime/:id/update', (req, res, next)=>{
  Reviews.findByIdAndUpdate(req.params.id,  {rating: req.body.rating, review: req.body.review})
  .then(()=>{
      res.redirect('/anime');
  })
  .catch((err)=>{
      next(err)
  })
})
router.post('/anime/:id/delete', (req, res, next)=>{
  Reviews.findByIdAndRemove(req.params.id)
  .then(()=>{
      res.redirect('/anime')
  })
  .catch((err)=>{
      next(err);
  })
})


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}
module.exports = router;