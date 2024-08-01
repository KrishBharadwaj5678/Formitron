let mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/StudentRegistration")

// Connect to MongoDB
mongoose.connect('mongodb+srv://test:test1234@cluster0.h6ocrk9.mongodb.net/Student?retryWrites=true&w=majority&ssl=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

let Schema=mongoose.Schema({
    FirstName:'String',
    LastName:'String',
    Email:'String',
    Image:'String',
    DOB:'String',
    State:'String',
    Gender:'String'
})

module.exports=mongoose.model("form",Schema)
