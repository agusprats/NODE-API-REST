const express = require('express');
const authService = require('../services/authService');
const Success = require('../handlers/successHandler');
const {request, response} = require('express');

const login = async(req = request, res = response, next) => {

    const {email, password} = req.body;
    try{
        res.json(new Success(await authService.login(email, password)));

    }catch(error){
        next(error);
 }
}

module.exports = { 
    login
}

/*Esta capa controller, se encarga de Obtener los datos del request, y de lo que devuelva 
la capa Servicio, pasar los datos al Response. O pasarle al Handler de Express el error */