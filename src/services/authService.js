const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const AppError = require('../errors/appError');
const config = require('../config')

const login = async(email, password) => {
    try{

        const user = await userService.findByEmail(email);
        if(!user){
            throw new AppError('Email / Password Authentication Failed... Try again', 401);
        }

        if(!user.enable){
            throw new AppError('Authentication Failed... User disabled', 401);
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if(!validatePassword){
            throw new AppError('Email / Password Authentication Failed... Try again', 401);
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

const validToken = async (token) => {

    try{
    //validar que el token llegue como parametro
    if(!token){
        throw new AppError('Authentication failed! Token required', 401);
    }
    //validar que sea un token integro
    let id;
    try{
        const obj = jwt.verify(token, config.auth.secret); 
        id = obj.id;
    }catch(verifyError){
        throw new AppError('Authentication failed! Invalid Token', 401);
    }
    
    //Si el token pudo abrirse, que el id corresponda a un usuario en BD
    const user = await userService.findById(id);
    if(!user){
        throw new AppError('Authentication failed! User not found', 401);
    }
    //Si el usuario existe, que este habilitado
    if(!user.enabled){
        throw new AppError('Authentication failed! User disabled', 401);
    }
    //retornar el usuario
    return user;

    }catch(err){
        throw err;
    }
    
}
const validRole = (user, ...roles) => {
    if(!roles.includes(user.role)){
    throw new AppError('Authorization failed! User without the privilege', 403);
    }
    return true;
}

_encrypt =(id) => {
    return jwt.sign({id}, config.auth.secret , {expiresIn: config.auth.ttl});
}

module.exports = {
    login,
    validToken,
    validRole
}