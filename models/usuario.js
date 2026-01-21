const mongoose = require("mongoose")
const Schema =  mongoose.Schema



const usuarios = new Schema({
    nome:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    passwordConfirm:{
        type:String
    }
})



mongoose.model("usuarios", usuarios)