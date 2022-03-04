//Requiring express module(package):
const express = require('express');

//Including the file:
const db = require('./config/mongoose');

//Require the ToDo Model:
const toDo = require('./Models/todo');
// 'toDo' will be used to populate/ interact with our database

//requiring moment:
// const moment = require('moment');

//'requiring' our own module (This module is created by us, i.e we haven't installed it)
const date = require(__dirname + "/date.js");

const app = express();
const port = 0803;

app.set('view engine', 'ejs');

// importing 'path' module:
const path = require('path');
//setting the view path:
app.set('views', path.join(__dirname, 'views'));

//acessing the static files(Css, Js):
app.use(express.static('assets'));

//parsing data from browser:
app.use(express.urlencoded({extended: true}));

var todoList = [];


app.get('/', function(req, res){

    var today = date.getDate();
    // console.log(today);
    //to fetch all the documents in our collection:
    toDo.find({}, function(err, tasks){
        if (err) {
            console.log('Error in fetching documents from Db!');
            return;
        }

        //rendering to our home page:
        return res.render('home', {
            todo_list: tasks,
            todaysDate: today
        });
    })

})

app.post('/addTask', function(req, res){
    console.log(req.body);

    //Inserting into our database:
    toDo.create({
        task: req.body.userContent,
        date: Date.now()
    }, function(err, task){
        if (err) {
            console.log('Error in inserting data into db!');
            return;
        }

        console.log('task', task);
        return res.redirect('/');
    });

})


app.get('/removeTask/:id', function(req, res){
    // console.log(req.params);

    let id = req.params.id;
    toDo.findByIdAndDelete(id, function(err){
        if (err) {
            console.log('Error in deleting the task!');
            return;
        }

        console.log('Item deleted successfully!');
    })
    
    return res.redirect('/');
})


//Updating the tasks:
app.get('/edit/:id', function(req, res){
    //console.log(req.params);

    const id = req.params.id; //getting the id of the element to be updated!

    var today = date.getDate();

    //rendering a new page in which one can edit the task:
    toDo.find({}, function(err, tasks){
        res.render('todoEdit', {
            todo_list: tasks,
            idToBeUpdated: id,
            todaysDate: today
        });
    })

})

app.post('/edit/:id', function(req, res){
    console.log(req.params.id);

    const updateTaskOfId = req.params.id;
    toDo.findByIdAndUpdate(updateTaskOfId, {
        task: req.body.userContent, date: Date.now()
    }, function(err){
        if (err) {
            console.log('Error in updating content!');
            return;
        }

        return res.redirect('/');
    });

})

app.get('/about', function(req, res){
    return res.render('about');
})




app.listen(port, function(err){
    if (err) {
        console.log(`Error: ${err}`);
        return;
    }

    console.log(`Server is running on port ${port}`);
})