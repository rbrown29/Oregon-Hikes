const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
         type: String, 
         required: [true, 'Please provide a username'],
     },
    password: { 
        type: String, 
        required: [true, 'Please provide a password'], 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;