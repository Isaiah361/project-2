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
    
    res.render('Anime/animeDetails', {oneAnime: response.data.data})
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
  
  const theReview = new Reviews({
    rating: req.body.rating,
    review: req.body.review
  })
  theReview.save() 
  Anime.findById(req.params.id).populate('author')
  .then((theAnime)=>{
    theAnime.reviews.push(theReview)
    theAnime.save()
    res.redirect('/anime')
  })
  .catch((err)=>{
    next(err)
  })
  // console.log(theAnime)
  // .then(()=>{

  // })
})




module.exports = router;