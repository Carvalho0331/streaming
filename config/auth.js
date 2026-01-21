const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const Usuario = mongoose.model("usuarios")
require("../models/usuario")

module.exports = function(passport) {

    passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {

        Usuario.findOne({ email }).then(user => {
            if (!user) {
                return done(null, false, { message: "A conta não existe" });
            }

            bcrypt.compare(password, user.password, (erro, batem) => {
                if (batem) return done(null, user);
                else return done(null, false, { message: "Senha incorreta" });
            });
        }).catch(err => done(err));
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Usuario.findById(id)
            .then(user => done(null, user))
            .catch(err => done(err, null));
    });
}
