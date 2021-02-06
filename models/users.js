const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usersSchema = new Schema({
    // id: mongoose.id, 
    username: String,
    password: String,
    cubes: [{ type: Schema.Types.ObjectId, ref: 'Cube'}]
});

const User = mongoose.model('User', usersSchema);


module.exports = User;