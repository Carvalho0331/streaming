const mongoose = require("mongoose")
const Schema = mongoose.Schema



const Video = new Schema({
    nome:{
        type:String
    },
    path:{
        type:String
    },
    data:{
        type:Date,
        default:Date.now()
    }
})


mongoose.model("video", Video)