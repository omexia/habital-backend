const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();



app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: "Internal Server Error"
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }


        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED,
         { expiresIn: process.env.CADUCIDAD_TOKEN });

         res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });

    /*let usuarioDB = body.usuario;
    usuarioDB = {
        nombre:"Hector Jeronimo",
        role:"ADMIN_ROLE"
    };
    console.log("CADUCIDAD_TOKEN", process.env.CADUCIDAD_TOKEN);
    let token = jwt.sign({
        usuario: usuarioDB
    }, process.env.SEED,
     { expiresIn: process.env.CADUCIDAD_TOKEN });*/

    

});







module.exports = app;