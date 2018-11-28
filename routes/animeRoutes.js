const express = require('express');
const router  = express.Router();
const axios  = require('axios');
const Anime = require("../models/anime");
const Reviews = require("../models/reviews");


router.get("/anime", (req, res, next)=>{
  axios.get("https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=")
  .then((infoFromAPI)=>{ 
    // console.log(('=-=-=-=-=-=-=-=-=-=',infoFromAPI.data.data[0]));
   res.render('Anime/animeList', {anime: infoFromAPI.data.data})
  })
  .catch((err)=>{
    next(err)
  })
})


router.get('/anime/:id', (req, res, next)=>{
  
  axios.get(`https://kitsu.io/api/edge/anime/${req.params.id}`)
  .then((response)=>{
    Anime.findOne({title: response.data.data.attributes.titles.en}).populate('reviews')
    .then(animeFromDB => {
      data = {
        oneAnime: response.data.data.attributes,
        fromDB: false
      }
      if(animeFromDB !== null) {
        console.log("NOOOOOOOOOOOT NULLLLLLLL!!!!!!!!!!!")
        data.oneAnime = animeFromDB;
        data.fromDB = true;
      } 
      console.log("------------------------- ", animeFromDB);
      console.log("-----==================== ", response.data.data.attributes.titles.en, data.fromDB);
      res.render('Anime/animeDetails', data)
    })
    .catch(err => {
      next(err);
    })    
  })
  .catch((err)=>{
    next(err)
  })
})

router.post('/animeAdd',  (req, res, next)=>{
  Anime.findOne({title: req.body.title})
  .then(theAnime =>{
    if(theAnime !== null){
      res.redirect(`${theAnime.id}/addReview`)
    }else{
      Anime.create(req.body)
      .then(theAnime =>{
        res.redirect(`${theAnime.id}/addReview`)
      })
      .catch((err)=>{
        next(err)
      })
    }
  })
  .catch((err)=>{
    next(err)
  })
})


router.get('/:id/addReview', (req, res, next)=>{
  Anime.findById(req.params.id)
  .then((theAnime)=>{
    res.render("Anime/animeReview", {theAnime: theAnime})

  })

  // console.log("--------=======-------", req.params.id)
     
})
router.post('/:id/addReview', (req, res, next)=>{
  console.log("--------=======-------", req.params.id)
  
  // const theReview = new Reviews({
  //   rating: req.body.rating,
  //   review: req.body.review
  // })
  Reviews.create({
    author: req.user._id,
    rating: req.body.rating,
    review: req.body.review
  })
  .then(createdReview => {
    console.log(">>>>>>>>>>>>>>>>>>>>>> ", createdReview)
    Anime.findByIdAndUpdate(req.params.id, {$push: {reviews: createdReview._id}})
      .then(updatedAnime => {
        console.log("******************** ", updatedAnime);
        res.redirect('/anime')
      })
      .catch(err => {
        next(err);
      })
  }).catch(err => {
    next(err);
  })
})




module.exports = router;