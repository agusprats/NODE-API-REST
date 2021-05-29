const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const AppError = require('../errors/appError');
const config = require('../config')

const login = async(email, password) => {
    try{

        const user = await userService.findByEmail(email);
        if(!user){
            throw new AppError('Email / Password Authentication Failed... Try again', 400);
        }

        if(!user.enable){
            throw new AppError('Authentication Failed... User disabled', 400);
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if(!validatePassword){
            throw new AppError('Email / Password Authentication Failed... Try again', 400);
        }
        const token = _encrypt(user._id);

        return{
            token,
            user: user.name,
            role: user.role
        }


    }catch(error){
        throw error;
    }
}

_encrypt =(id) => {
    return jwt.sign({id}, config.auth.secret , {expiresIn: config.auth.ttl});
}

module.exports = {
    login
}