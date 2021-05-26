const express = require('express');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllUsers = (req, res) => {
   // throw new Error('Error de testeo de handler');
    const users = [
        {
            id:1,
            name: 'Agus'
        },
        {
            id: 2,
            name: 'Andy'
        }
    ]
    res.status(200).json(users);
};

const createUser = (req, res) => {

    const user = req.body;
    const result = {
        message: 'User created',
        user
    }
    res.status(201).json(result);
};

const updateUser = (req, res) => {
    const {id} = req.params;
    const user = req.body;
    user.id = id;
    const result = {
        message: 'User updated',
        user
    }
    res.status(200).json(result);
};

const updatePartialUser = (req, res)=>{
    const result = {
        message: 'User updated with patch'
    }
    res.status(200).json(result);
};

const deleteUser = (req, res)=> {
    const {id} = req.params;
    //o bien const id = req.params.id;
    const result = {
        message: `User with id: ${id} Deleted`
    }
    res.json(result);
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser
}