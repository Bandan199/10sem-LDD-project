const mongoose = require('mongoose');


//connection DB
mongoose.connect("mongodb+srv://Bandan:qwerty1234@cluster0.knubg.mongodb.net/TLD?retryWrites=true&w=majority",
{

  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,


})

var db = mongoose.connection

db.on('error', console.error.bind(console,'connection error'))

db.once('open', function callback(){
  console.log("DB connected")
})



// schemas 
const dbSchema = new mongoose.Schema(
    {
      image_name: String,
      date: {type: Date , default: Date.now}
    });


    const uploadModel = mongoose.model('image_upload_filed', dbSchema);

    module.exports = uploadModel;