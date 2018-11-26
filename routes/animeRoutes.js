const express = require('express');
const router  = express.Router();
const axios  = require('axios');
const Anime = require("../models/Anime");


router.get("/anime", (req, res, next)=>{
  axios.get("https://kitsu.io/api/edge/anime/")
  .then((infoFromAPI)=>{
    console.log(infoFromAPI.data.results);
   res.render('Anime/animeList', {anime: infoFromAPI.data})
  })
  .catch((err)=>{
    next(err)
  })
})





module.exports = router;