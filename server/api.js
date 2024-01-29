var express=require("express")
var mongoClient=require("mongodb").MongoClient;
var cors=require("cors");

var constring="mongodb://127.0.0.1:27017"
let app=express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/",(request,response)=>{
    response.send("<h1>To-Do</h1>")
})

app.get("/admin",(req,res)=>{
    mongoClient.connect(constring).then((clientobject)=>{
        var database=clientobject.db("videoplayerdb");
        database.collection("tbladmin").find({}).toArray().then((document)=>{
            res.send(document);
            res.end()
        })
    })
})
app.get("/user",(req,res)=>{
    mongoClient.connect(constring).then(clientobject=>{
        var database=clientobject.db("videoplayerdb");
        database.collection("tbluser").find({}).toArray().then(document=>{
            res.send(document);
            res.end();
        })
    })
})
//Inserting user
app.post("/adduser",(req,res)=>{
    var userDetails={
       "user_id":req.body.user_id,
       "user_name":req.body.user_name,
       "password":req.body.password,
       "email":req.body.email,
       "mobile":parseInt(req.body.mobile)    
    }
    mongoClient.connect(constring).then(clientobject=>{
        var database=clientobject.db("videoplayerdb");
        database.collection("tbluser").insertOne(userDetails).then(()=>{
            console.log("User Registered.")
            res.redirect("/user");
            res.end()
        }) 
    })
})
//getting all categories
app.get("/categories",(req,res)=>{
    mongoClient.connect(constring).then(clientobject=>{
        var database=clientobject.db("videoplayerdb");
        database.collection("tblcategories").find({}).toArray().then(document=>{
            res.send(document);
            res.end();
        })
    })
})
//add category
app.post("/addcategory",(req,res)=>{
    let newCategory={
        "category_id":parseInt(req.body.category_id),
        "category_name":req.body.category_name
    }
    mongoClient.connect(constring).then(clientobject=>{
        var database=clientobject.db("videoplayerdb");
        database.collection("tblcategories").insertOne(newCategory).then(()=>{
            console.log("new category inserted");
            res.redirect("/categories")
            res.end();
        })
    
    })
})

//getting all videos
app.get("/videos",(req,res)=>{
    mongoClient.connect(constring).then(clientobject=>{
        var database=clientobject.db("videoplayerdb");
        database.collection("tblvideos").find({}).toArray().then(document=>{
            res.send(document);
            res.end();
        })
    })
})
//getting specific video
app.get("/videos/:videoid",(req,res)=>{
    let id=parseInt(req.params.videoid);
    mongoClient.connect(constring).then(clientobject=>{
        var database=clientobject.db("videoplayerdb");
        database.collection("tblvideos").find({video_id:id}).toArray().then((document)=>{
            res.send(document);
            res.end();
        })
    })
})
//adding new video
app.post(`/addvideo`,(req,res)=>{
    let newVideo={
        "video_id":parseInt(req.body.video_id),
        "title":req.body.title,
        "url":req.body.url,
        "likes":parseInt(req.body.likes),
        "dislikes":parseInt(req.body.dislikes),
        "comments":req.body.comments,
        "category_id":parseInt(req.body.category_id)
    }
    mongoClient.connect(constring).then(clientobject=>{
        var database=clientobject.db("videoplayerdb");
        database.collection("tblvideos").insertOne(newVideo).then(()=>{
            console.log("new video added")
            res.redirect("/videos")
            res.end();
        })
    })
})
//updating video
app.put(`/editvideo/:videoid`,(req,res)=>{
    let id=parseInt(req.params.videoid);
    
    mongoClient.connect(constring).then(clientobject=>{
        var database=clientobject.db("videoplayerdb");
        //updateOne({},{$set:{}})
        database.collection("tblvideos").updateOne({video_id:id},{$set:{
            "video_id":parseInt(req.body.video_id),
            "title":req.body.title,
            "url":req.body.url,
            "likes":parseInt(req.body.likes),
            "dislikes":parseInt(req.body.dislikes),
            "comments":req.body.comments,
            "category_id":parseInt(req.body.category_id)
         }}).then(()=>{ 
            console.log("Video Updated");
            res.end();
        })
    })
})
//deleting video
app.delete("/deletevideo/:videoid",(req,res)=>{
    let id=parseInt(req.params.videoid);
    mongoClient.connect(constring).then(clientobject=>{
        var database=clientobject.db("videoplayerdb");
        database.collection("tblvideos").deleteOne({video_id:id}).then(()=>{
            console.log("Video deleted");
            res.end();
        })
})
})
app.listen(4400)
console.log(`server started : http://127.0.0.1:4400`)
