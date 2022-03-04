const mongoose = require('mongoose');

//Defining a Schema:
const todoSchema = new mongoose.Schema({
    task :{
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    }
})

//Creating our model:
const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;