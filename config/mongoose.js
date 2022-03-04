//requiring 'mongoose' library (as it's a package)
const mongoose = require('mongoose');

//making connection with the database named todo_db:
mongoose.connect('mongodb://localhost:27017/todo_db');

mongoose.connection.on('error', console.log.bind('Error connecting to db!'));

mongoose.connection.once('open', function(){
    console.log('Successfully connected to the Db!');
})