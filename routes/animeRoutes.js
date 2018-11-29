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
    // console.log("....................", response.data.data.attributes)
    theTitle = response.data.data.attributes.titles.en
    if(!response.data.data.attributes.titles.en) {
      theTitle = response.data.data.attributes.titles.en_jp
    }
    Anime.findOne({title: theTitle}).populate('reviews')
    .then(animeFromDB => {
      data = {
        oneAnime: response.data.data.attributes,
        fromDB: false,
        theTitle: theTitle
      }
      console.log("[[[[[[[[[[[[[[[[[[[[[[[ ", theTitle);
      if(animeFromDB !== null) {
        // console.log("NOOOOOOOOOOOT NULLLLLLLL!!!!!!!!!!!")
        data.oneAnime = animeFromDB;
        data.fromDB = true;
      } 
      // console.log("------------------------- ", animeFromDB);
      // console.log("-----==================== ", response.data.data.attributes.titles.en, data.fromDB);
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
  // console.log("the title of the anime to add review to (((((((((((((((( ", req.body.title)
  Anime.findOne({title: req.body.title})
  .then(theAnime =>{
    // console.log("anime info before redirect to add review !!!!!!!!!!!!!!!!!!!!!!!", theAnime);
    if(theAnime !== null){
      // console.log("the anime is NOT null ???????????? ", theAnime);
      res.redirect(`/${theAnime._id}/addReview`)
    } else {
      // console.log("the anime IS null &&&&&&&&&&&&&&&&& ", theAnime);
      Anime.create(req.body)
      .then(theAnime =>{
        res.redirect(`/${theAnime._id}/addReview`)
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
    console.log("id for the anime prior to adding review <<<<<<<<<<<<<<<<<<<<<<< ", theAnime);
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
    author: req.user.username,
    rating: req.body.rating,
    review: req.body.review
  })
  .then(createdReview => {
    // console.log(">>>>>>>>>>>>>>>>>>>>>> ", createdReview);
    Anime.findById(req.params.id) 
      .then(animeFromDB => {
        // console.log("anime prior to pushing review ^^^^^^^^^^^^^^^^^ ", animeFromDB);
        animeFromDB.reviews.push(createdReview._id)
        // console.log("******************** ", animeFromDB);
        animeFromDB.save()
        .then(updatedAnime => {
          // console.log("############################# ", updatedAnime);
          res.redirect('/anime')
        })
        .catch(err => {
          next(err);
        })
      })
      .catch(err => {
        next(err);
      })
  }).catch(err => {
    next(err);
  })
})




module.exports = router;