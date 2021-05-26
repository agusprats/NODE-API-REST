const express = require('express');
const User = require('../models/user');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllUsers = async (req, res, next) => {
   // throw new Error('Error de testeo de handler');
   try{
        const users = await User.find();
        res.status(200).json(users);
   }catch (err){
        next(err);
   }
};


const createUser = async (req, res, next) => {
    try{
        let user = req.body;
        user = await User.create(user);

        const result = {
        message: 'User created',
        user
        }
        res.status(201).json(result);
}catch (err){
        next(err);
    }   
};

const updateUser = async (req, res, next) => {
    try{
        const {id} = req.params;
        let user = req.body;
        user._id = id;
    
        await User.updateOne(user)
        const result = {
            message: 'User updated',
            user
        }
        res.status(200).json(result);
    }catch (err){
        next(err);
    } 
};

const updatePartialUser = (req, res, next)=>{
    try{
        const result = {
            message: 'User updated with patch'
        }
        res.status(200).json(result);
    }catch (err){
        next(err);
    } 
};

const deleteUser = async (req, res, next) => {
    try{
        const {id} = req.params;
    const user = await User.findById(user);
    user.remove();
    //o bien const id = req.params.id;
    const result = {
        message: `User with id: ${id} Deleted`
    }
    res.json(result);
    }catch (err){
        next(err);
    }  
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser
}