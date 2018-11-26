const express = require('express');
const router  = express.Router();
const axios  = require('axios');
const Anime = require("../models/Anime");


router.get("/anime", (req, res, next)=>{
  axios.get("https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0")
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




module.exports = router;