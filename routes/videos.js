const mongoose = require("mongoose")
const express = require("express")
const rounter = express.Router()
require("../models/usuario")
const Usuario = mongoose.model("usuarios")
const bycrypt = require("bcryptjs")
const passport = require("passport")

rounter.get("/", (req,res)=>{
    res.render("painelvideo")

    
})




module.exports = rounter