const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Homes = require('../models/homes');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const app = express();

app.get('/homes', (req, res) => {

    Homes.find({}, (err, homes) => {
        var homesMap = {};

        homes.forEach((homes) => {
            homesMap[homes._id] = homes;
        });

        res.send(homesMap);
    });
});

app.post('/homes', (req, res) => {

    let body = req.body;
    console.log("ESTE ES EL BODY", body);

    let home = new Homes({
        home_name: body.home_name,
        home_owner: body.home_owner,
        home_address: body.home_address,
        home_mts: body.home_mts,
        home_value: body.home_value,
        home_predial: body.home_predial
    });


    home.save((err, homesDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: homesDB
        });
    });
});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {


    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });



});



module.exports = app;