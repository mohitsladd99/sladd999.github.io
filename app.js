const express=require("express")
const bodyparser=require("body-parser")
var lodash=require("lodash");
var  posttitle;

const app=express()
const bloguserdata=[{
    title:"home work",
    textdata:"In literary theory, a text is any object that can be, whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing. It is a coherent set of signs"
}];



app.use(bodyparser.urlencoded({extended:true}));


const para = "ype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


app.set("view engine","ejs")
app.use(express.static("public"))



app.get("/",(req,res)=>{
     res.render("home",{para:para,title:"Home",userdata:bloguserdata,single:posttitle})
})



app.get("/contact",(req,res)=>{
    res.render("contact",{para:para,title:"Contact"})
})


app.get("/about",(req,res)=>{
    res.render("about",{para:para,title:"About us"})
})


app.get("/compose",(req,res)=>{
    res.render("compose",{title:"Compose Notes"})
})

app.post("/compose",(req,res)=>{
    const blogdata={
        title:req.body.title,
        textdata:req.body.textdata
    };

    bloguserdata.push(blogdata);



    res.redirect("/")
})





app.get("/post/:postname",(req,res)=>{
     posttitle=lodash.lowerCase(req.params.postname);
    // console.log(posttitle);

  bloguserdata.forEach((data)=>{

    const subtitle=lodash.lowerCase(data.title)
    if(subtitle==posttitle){
        console.log("match found")
        res.render("post",{title:data.title,para:data.textdata});
    }else{
        console.log("match is not find")
    }
   
 
  });


})


 
app.listen(80,()=>{
    console.log("server is started")
})