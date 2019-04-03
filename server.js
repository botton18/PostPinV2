var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/postpin')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var User = require('./model/user');

app.get('/users' , function(request, response){
    User.find({}, function(error, users){
        if(error) {
            response.status(500).send('error getting users');
        } else {
            response.send(users)
        }
    })
})

app.post('/users', function(request, response){
    var user = new User();
    console.log(request)
    user.userName = request.body.userName;
    user.password = request.body.password;
    user.email = request.body.email;
    user.save(function(error, savedUser){
        if(error) {
            response.status(500).send("Cannot save product ");
        } else {
            response.send(savedUser);
        }

    })
})

app.delete('/users', function(request,response){
    var user = request.body.userName;
    User.remove({"userName": user}, function(error, userdeleted) {
        if(error) {
            response.status(500).send("Cannot find and delete user ");
        } else {
            response.send(userdeleted);
        }
    })
});

app.listen(3001, function() {
    console.log('listening to port 3001');
});