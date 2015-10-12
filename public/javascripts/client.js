$(document).ready(function () {
    event.preventDefault();

    //This function will add items in database to screen, but I didn't really want to use it
    //Also, the delete function doesn't really work with these, but DOES work with items that I add
    //I designed the app to be not really a way to store a list, just make it and use it

    //var getData = function(){
    //    $.ajax({
    //        type: "GET",
    //        url: "/shopping"
    //    }).done(function(response){
    //        console.log("This is the response: ", response);
    //        for(var i=0; i<response.length; i++){
    //            var $appendList = $("<li class='sortableItem'>" + "<button class='btn-xs check-box'>" +
    //                "<span class='glyphicon glyphicon-ok'></span></button>" + response[i].name + "</li>");
    //            $(".userList").append($appendList);
    //
    //        }
    //    });
    //};



    $(".toAppend").on('click', function () {
        $("input").addClass("show-input").fadeIn("slow").focus();
        $(".toAppend").fadeOut(1000);
        //getData();
    });

    //on keystroke "enter," get text input value and append to ul;
    //empties text box, sends console.log with item name to server
    $("input").keypress(function (e) {

        if (e.which == 13) {
            var formData = $("input").val();
            console.log("This is the form data: ", formData);
            var sendData={name:formData};

            $.ajax({
                type: "POST",
                url: "/shopping/add",
                dataType: "text",
                data: sendData
            }).done(function (response){
                console.log("Got a response!", response);
                getData();
            });
            var getData = function(){
                $.ajax({
                    type: "GET",
                    url: "/shopping/" + formData
                }).done(function(response){
                    console.log("This is the response: ", response);
                });
            };

            var $text = $("input:text");
            //sendNoteToServer();
            var $newListItem = $("<li class='sortableItem'>" + "<button class='btn-xs check-box'>" +
                "<span class='glyphicon glyphicon-ok'></span></button>" + $text.val() + "</li>");
            $(".userList").append($newListItem);
            $text.val('');


            return false;
        }
    });

    var name;
    //clicking on checkbox removes list item with animation and puts focus back in text box
    $(document).on("click", "li", function() {
        name = "";
        console.log("Almost done!");
        name = $(this).text();
        console.log(name);

        $(this).animate({
            opacity: 0.0,
            paddingLeft: '+=40'
        }, 500, function() {
            $(this).remove();
        });
        $("input").focus();
        //this deletes item from database
        $.ajax({
            type: "DELETE",
            url: "/shopping/remove/" + name
        }).done(function(response){
            console.log("deleted");
        });

    });

});

