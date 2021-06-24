module.exports =(req,res) =>
{
  upload(req,res , function(err)
  {
    if(err){
    console.log(err)
    return res.end("something is happening")}
    else {
      console.log(req.file.path)

      var filename = req.file.filename

      var imageDetails = new imageModel
      ({
        image_name:filename
      })
     
      // save to DB 
      imageDetails.save(function(err,doc)
      {
        if(err) throw err;
      })
    }
    // res.redirect("/result") //
  })
}
