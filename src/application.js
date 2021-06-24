const express = require("express");

const hbs = require('hbs');

const multer = require('multer')

const axios = require('axios')
const fs = require('fs')
const cors = require('cors');

// call mongo file
const imageModel = require('../model/dbSchema')
const FormData = require('form-data')

const app = express();

app.use(express.static('public'))

app.set('view engine', 'hbs');

app.use(cors());

const port = process.env.PORT || 4000;


var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + "_" + Date.now() + "_" + file.originalname);
  },
});


var upload = multer({
  storage: Storage,
  filterFilter(req, file, cb) {
    if (!file.originalname.endWith('.jpg')) {
      return cb(new Error('please upload a jpg'))
    }

    cb(undefined, true)
  }
}).single("img_upload");





app.get('/', (req, res) => {
  res.render("index")
})




app.get('/result', (req, res) => {
  axios.get('http://ec2-54-80-182-246.compute-1.amazonaws.com:8080/')
    .then(result => {
      console.log(result.data)
    })
    .catch(err => {
      console.log(err)
    })

  res.render("result")
})



app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err)
      return res.end("something is happening")
    }
    else {


      var filename = req.file.filename

      var imageDetails = new imageModel
        ({
          image_name: filename
        })

      // save to DB 
      imageDetails.save(function (err, doc) {
        if (err) throw err;
      })




      const formData = new FormData();

      formData.append("file", fs.createReadStream(req.file.path))

      axios.post('http://ec2-54-80-182-246.compute-1.amazonaws.com:8080/uploadfile/',
        formData, {
        headers: formData.getHeaders()
      }).then(result => {
        console.log(result.data)

        res.render("result", {
          result: result.data
        }) //

      }).catch(err => {
        console.log(err)
        res.redirect("/result") //
      })

    }

  })

})



app.listen(port, () => {
  console.log('server is running');
})