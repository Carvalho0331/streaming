const express = require("express")
const app = express()
const multer = require("multer")
const handlebars = require("express-handlebars")
const mongoose = require("mongoose")
const path = require("path")
require("./models/video")
const Video = mongoose.model("video")


mongoose.connect("mongodb+srv://salimo_carvalho:salimo_carvalho@cluster0.lokg7eq.mongodb.net/").then(()=>{
    console.log("banco de dados conectado com sucesso")
}).catch(()=>{
    console.log("Falha ao se conectar ao Banco de dados")
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const nomeFile = req.body.nome
        console.log(nomeFile)
        const ext = file.originalname.split('.').pop()
        
        cb(null, file.originalname = nomeFile+"."+ext)
    }
})

app.use("/uploads", express.static("uploads"))

const upload = multer({ storage })

app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/upload", (req, res) => {
    res.render("upload")
})

app.post("/uploadVideo", upload.single("uploadVideo"), (req, res) => {
    
    const novoVideo = {
        nome:req.file.path,
        path:req.file.filename
    }

    new Video(novoVideo).save().then((videos)=>{
        console.log("Upload feito com sucesso")
        res.redirect("/videos")
    }).catch(()=>{
        console.log("Falha ao salvar ao banco de dados")
    })
})



app.get("/videos", (req,res)=>{
    Video.find().lean().then((videos)=>{
        res.render("painelvideo", {videos:videos})
    })
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Servidor Rodando")

})
