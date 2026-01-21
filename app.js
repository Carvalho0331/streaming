const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
require("./models/usuario")
const usuario = require("./routes/usuario")
const passport = require("passport")
const path = require("path")
const flash = require("connect-flash")
const session = require("express-session")
const bodyParser = require("body-parser")

// Configuração do Passport
require("./config/auth")(passport)


app.use(session({
    secret:"carvalho@02",
    resave:true,
    saveUninitialized:true,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash('error')
    next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.engine("handlebars", handlebars.engine({defaultLayout:"main"}))
app.set("view engine", "handlebars")


app.use(express.static(path.join(__dirname,"./public")))


app.engine("handlebars", handlebars.engine({defaultLayout:"main"}))
app.set("view engine", "handlebars")

app.get("/", (req,res)=>{
    res.render("usuario/login")
})



app.use("/usuario", usuario)

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Servidor Rodando")

})
