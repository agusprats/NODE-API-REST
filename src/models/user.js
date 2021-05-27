const mongoose = require('mongoose');
const uniqueValidator =require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name Required']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname Required']
    },
    email: {
        type: String,
        required: [true, 'Email Required'],
        unique: true,
        index: true
    },
    birthdate: Date,
    password: {
        type: String,
        required: [ true, 'Password Required']
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    enable: {
        type: Boolean,
        required: true,
        default: true
    }
    },
    {timestamps: true}
);
userSchema.plugin(uniqueValidator, {message: 'already exist in the DB'} );
userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('users', userSchema);

