const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require("passport")



router.get("/registo", (req, res) => {
    return res.render("usuario/registo")
})

router.post("/registo/feito", (req, res) => {
    const Novousuarios = {
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    }



    if (Novousuarios.password != Novousuarios.passwordConfirm) {
        req.flash("error_msg", "As senhas deve ser iguais")
       return res.redirect("/usuario/registo")
    }


    bcrypt.genSalt(10, (erro, salt) => {
        bcrypt.hash(Novousuarios.password, salt, (erro, hash) => {
            if (erro) {
                req.flash("error_msg", "Houve um erro ao tentar salvar")
                return res.redirect("/")
            } else {
                Novousuarios.password = hash
                Usuario.findOne({ email: req.body.email }).lean().then((user) => {
                    if (user) {
                        req.flash("error_msg", "Por favor o email encontra-se registado na base de dados")
                        return res.render("usuario/registo")
                    } else {
                        new Usuario(Novousuarios).save().then(() => {
                            req.flash("success_msg", "Usuario registado com sucesso")
                            return res.render("usuario/login")
                        }).catch(() => {
                            req.flash("error_msg", "houve um erro ao tentar logar o usuario")
                            return res.redirect("/usuario/registo")
                        })

                    }
                }).catch(() => {
                    req.flash("error_msg", "Houve um erro ao tentar tecnico")
                    return res.redirect("/usuario/registo")

                })


            }
        })
    })

})

router.get("/login", (req, res) => {
    return res.render("usuario/login")
})


router.post("/login/feito", (req, res, next) => {
    passport.authenticate(("local"), {
        failureRedirect: "/usuario/login",
        successRedirect: "/",
        failureFlash: true
    })(req, res, next)
})


module.exports = router
