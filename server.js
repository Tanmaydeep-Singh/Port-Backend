const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const path = require('path')







const app = express(); //Creating our app




app.set('view engine', 'ejs'); //EJS
app.use(express.static("views"));

app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))


app.use(bodyParser.urlencoded({extended:true})); //Remember to use bodyparser for the passage of the data in ejs

mongoose.connect("mongodb+srv://Tanmaydeep:tanmay@cluster1.vcm3w.mongodb.net/newDB", {useNewUrlParser:true});//Connecting with mongoose


// mongoose.connect("mongodb://localhost:27017/newDB", {useNewUrlParser:true});//Connecting with mongoose

const userSchema= {//Creating a schema
    email: String,
    password: String
};

const schemaForBlog={//Schema for blogs
    title: String,
    content:String,
    date:String
};



// initiallizing razerpay
var instance = new Razorpay({
    key_id: 'rzp_test_ZEMKSdLvHMDmpu',
    key_secret: 's6YOCIdw3iN1rER2lAEyYaQl',
  });

//   instance.payments.fetch(paymentId)







const User = new mongoose.model("User", userSchema); //For email
const Writer = new mongoose.model("Writer", schemaForBlog); //For blogs


app.get("/",(req,res)=>{
    res.render('index');
});


app.get("/about",(req,res)=>{
    res.render('about');
});


app.get("/projects",(req,res)=>{
    res.render('projects');
});




app.get("/blog",(req,res)=>{
    Writer.find({}, function(err, newData){
        res.render("blog", {
          posts:newData
        });
    });
});

app.get("/compose",(req,res)=>{
    res.render('compose'); 
});







// Getting data from contact for blog

app.post('/compose',(req,res)=>{

    postTitle= req.body.postTitle;
    postBody =  req.body.postBody;
    var d = Date();


    composenDate = d.substring(4,15);
    console.log(composenDate);

    
    const newData = new Writer({     
        title: postTitle,
        content: postBody,
        date: composenDate
    });

    // console.log(newData)
    

    newData.save()


    res.redirect('/blog');

});




app.get("/blog", function(req, res){   //Sending content to respective EJS files
   
    Writer.find({}, function(err, posts){
        res.render("home", {
          title: postTitle,
          body: postBody,
          date: composenDate

        });
    });
});



app.get('/posts/:postId', (req,res)=>{
    const requestedPostId = req.params.postId;

    console.log(requestedPostId);


    Writer.findOne({_id: requestedPostId}, function(err, post){

        // console.log(post);    


        

        res.render("post",
         {
            post:post,
          });
     
      });
})

app.get('/delete/:postId',(req,res)=>{

    const requestedPostId = req.params.postId;
     
    Writer.findOne({_id: requestedPostId}, function(err, post){
        post.remove();
        res.redirect('/blog');
    
    });




});




/////////////////////////////////////////////////////////////////


let port = process.env.PORT;
if( port == null || port =="")
{
    port='3000';
}
app.listen(port,console.log('Server Up')) 





// Here are some things to remember to make changes for the website on the heroku.
// 1. remember to update code accordingly to the github.
// 2 to add, use git add . [to add all].
// 3 to commit, use git commit -m ' COMMIT TEXT.'
// 4 to change thhe heroku repo, use heroku git:remote -a <NAME> 
// 5 Then use git push heroku master in terminal.
// 6 Remember to change toe name back to tanmaydee-singh.


//Use heroku login to login in terminal.





