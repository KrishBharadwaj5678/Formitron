let mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/StudentRegistration")

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