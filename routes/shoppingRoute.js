var express = require('express');
var router = express.Router();
var todo = require("../models/shoppingModel.js");


router.get('/:name?', function(request, response, next){
    var name = request.params.name;
    console.log("the name is: ", name);

    if(name){
        todo.findOne({name: name}, function(err, todo){
            response.json(todo);
        });
    }else{
        todo.find({}, function(err, todo){
            if(err) {
                console.log("get request", err);
            }
            response.json(todo);
        })
    }
});


router.post('/add', function(request, response, next){
    var listItem =new todo(request.body);
    console.log("List item is: ", listItem);
    listItem.save(function(err){
        if(err){
            console.log("Post", err);
            response.send("Cannot post data");
        }
        console.log("Saved!", listItem);
        response.sendStatus(200);
    })
});


router.delete('/remove/:name', function(request, response, next){
    var name = request.params.name;
    console.log(name);
    todo.findOne({name:name}, function(err, todo){
        if(err){
            console.log("delete error");
            next(err);
        }else{
            todo.remove(function(err){
                if(err) throw err;
            })
        }
    });

});

module.exports = router;