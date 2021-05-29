const express = require('express');
const userService = require('../services/userService');
const Success = require('../handlers/successHandler');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllUsers = async (req, res, next) => {
   // throw new Error('Error de testeo de handler');
   try{
        const users = await userService.findAll(req.query.filter, req.query.options);
        res.json(new Success(users));
   }catch (err){
        next(err);
   }
};


const createUser = async (req, res, next) => {
    try{
        let user = req.body;
        user = await userService.save(user);

        res.status(201).json(new Success(user));
}catch (err){
        next(err);
    }   
};

const updateUser = async (req, res, next) => {
    try{
        const {id} = req.params;
        let user = req.body;
    
        const userUpdated = await userService.update(id, user);

        res.status(200).json(new Success(userUpdated));
    }catch (err){
        next(err);
    } 
};

const getById = async (req, res, next)=>{
    try{
        const user = await userService.findById(req.params.id);
        
        res.status(200).json(new Success(user));
    }catch (err){
        next(err);
    } 
};

const deleteUser = async (req, res, next) => {
    try{
        const {id} = req.params;
        const user = await userService.remove(id);  
    //o bien const id = req.params.id;

    res.json(new Success(user));
    }catch (err){
        next(err);
    }  
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    getById,
    deleteUser
}