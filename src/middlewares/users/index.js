const { check, validationResult } = require('express-validator');
const AppError = require('../../errors/appError');
const userService = require('../../services/userService');
const {ROLES} = require('../../constants/index')

const _nameRequired = check('name', 'Name required').not().isEmpty();
const _lastNameRequired = check('lastName', 'Lastname required').not().isEmpty();
const _emailRequired = check('email', 'email required').not().isEmpty();
const _emailValid= check('email', 'Email is Valid').isEmail();
const _emailExist = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new AppError('Email already exist in DB', 400)
        }
    }
);

const _optionalEmailValid= check('email', 'Email is Valid').optional().isEmail();
const _optionalEmailExist = check('email').optional().custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new AppError('Email already exist in DB', 400)
        }
    }
);

const _passwordRequired = check('password', 'password required').not().isEmpty();

const _roleValid = check('role').optional().custom(
    async (role = '') => {
   
        if(!ROLES.includes(role)) {
            throw new AppError('Invalid Role', 400)
        }
    }
);

const _dateValid = check('birthdate').optional().isDate({format: 'MM-DD-YYYY'});

const _idRequired = check('id').not().isEmpty();
const _idIsMongoDB = check('id').isMongoId();
const _idExist = check('id').custom(
    async (id = '') => {
        const userFound = await userService.findById(id);
        if(!userFound){
            throw new AppError('The ID does not exist in DB', 400)
        }
    }
);

const _validationResult = (req, res, next) => {
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        throw new AppError('Validation Errors', 400, errors.errors);   
    }
    next();
}

const postRequestValidations = [
    _nameRequired,
    _lastNameRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _passwordRequired,
    _roleValid,
    _dateValid,
    _validationResult
]

const putRequestValidations = [
    _idRequired,
    _idIsMongoDB,
    _idExist,
    _optionalEmailExist,
    _optionalEmailValid,
    _roleValid,
    _dateValid,
    _validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations
}