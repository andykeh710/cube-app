const mogoose = require('mongoose');
const Schema = mongoose.Schema;


const usersSchema = new Schema({
    id: mogoose.id, 
    username: String,
    password: String,
});

const User = mogoose.mosdel('User', usersSchema);


module.exports = User;