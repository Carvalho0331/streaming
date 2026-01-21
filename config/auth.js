const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


const Usuario = mongoose.model("usuarios")
require("../models/usuario")


module.exports = function (passport) {
    passport.use(new LocalStrategy({ usenameField: "email", passwordField: "password" }, (email, password, done) => {

        Usuario.findOne({ email: email }).then((user) => {
            if (!user) {
                return done(null, false, { message: "A conta nao existe" })
            }

            bcrypt.compare(password, user.password, (erro, batem) => {
                console.log(password)
                console.log(user.password)
                if (batem) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: "password incorreta" })
                }
            })
        })
    }))



    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, user)).then((user)=>{
            done(err,user)
        })
    })
}