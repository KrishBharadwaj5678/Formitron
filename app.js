let express=require('express');
let path=require("path");
let session=require("express-session");
let app=express()
let user=require("./usermodel");

// Form
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")
app.use(session({
    secret:"1krish421",
    saveUninitialized:true,
    resave:false,
    cookie:{
        secure:false,
        maxAge:3600000,
        sameSite:'strict'
    }
}))

// Main Page
app.get("/",(req,resp)=>{
    resp.render("index");
})

app.post("/",async(req,resp)=>{
    let {FirstName,LastName,Email,Image,DOB,State,Gender}=req.body;
    await user.create({
        FirstName,
        LastName,
        Email,
        Image,
        DOB,
        State,
        Gender
    })
    resp.redirect("/")
})

// Admin Login
app.get("/admin",(req,resp)=>{
    resp.render("admin",{
        valid_user:true
    })
})

// Checking Correct Admin
app.post("/admin",(req,resp)=>{
    let stored_username='__krishh__23';
    let stored_password='123';
    let {user_name,password}=req.body;
    if(stored_username==user_name && stored_password==password){
        // Creating a session with variable correct_user and if user has entered correct username and password then it is set to true
        req.session.correct_user=true
        resp.redirect("/show");
    }
    else{
        resp.render("admin",{
            valid_user:false
        });
    }  
})

// Read All User 
app.get("/show",async(req,resp)=>{
    // If user in session then perform this
    if(req.session.correct_user){
        let users=await user.find();
        resp.render("show",{
            users:users
        });
    }
    // If user not in session then show admin panel
    else{
        resp.redirect("admin");
    }
})

// Update User
app.get("/edit/:id",async(req,resp)=>{
    // If user in session then perform this
    if(req.session.correct_user){
        let fetchUserData=await user.findOne({_id:req.params.id});
        resp.render("edit",{
            data:fetchUserData
        })
    }
    // If user not in session then show admin panel
    else{
        resp.redirect('/admin');
    }
})

app.post("/edit/:id",async(req,resp)=>{
    let { FirstName,LastName,Email,Image,DOB,State,Gender}=req.body;
    await user.findOneAndUpdate(
        {_id:req.params.id},
        {
            FirstName,
            LastName,
            Email,
            Image,
            DOB,
            State,
            Gender
        },
        {new:true}
    );
    resp.redirect("/show");
})

// Delete User
app.get("/delete/:id",async(req,resp)=>{
    // If user in session then perform this
    if(req.session.correct_user){
        await user.findOneAndDelete({_id:req.params.id});
        resp.render("delete")
    }
    // If user not in session then show admin panel
    else{
        resp.redirect('/admin');
    }
})

app.listen(2300,()=>{
    console.log("Listening to Port 2300");
})