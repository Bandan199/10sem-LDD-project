const express = require('express');

const router = express.Router();

router.get("/", async (req, res) => {
    console.log("index HIT started")
    res.render('index');
  
  })

  
  
  router.get("/result", (req, res, next) => {
  
    console.log("result hit sucess");
    res.render('result');
  
  })
  
  


  
  

  module.exports =router;