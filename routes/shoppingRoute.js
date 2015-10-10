var express = require('express');
var router = express.Router();
var todo = require("../models/shoppingModel.js");

//TODO need to GET POST DELETE

router.post('/add', function(request, response, next){
    var listItem =new todo(req.body);
    listItem.save(function(err){
        if(err){
            console.log("Post", err);
            response.send("Cannot post data");
        }
        console.log("Saved!", listItem);
        response.send(200);
    })
});
//router.get('/note/:name?', function(request, response, next){
//    var name = request.params.name;
//    console.log("Added note: " + name);
//});

module.exports = router;