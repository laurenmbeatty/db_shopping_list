$(document).ready(function () {
    event.preventDefault();
    //var name = "";

    //function to make .ajax call to connect server-side
    //function sendNoteToServer() {
    //    var formData = $(".assignmentForm").serialize();
    //    $.ajax({
    //        type: "POST",
    //        url: "/shopping/add",
    //        data: formData
    //    }).done(function (response){
    //        console.log('Success!');
    //    })
    //}
    //clicking on the New Liszt heading opens up a text box, and New Liszt fades
    $(".toAppend").on('click', function () {
        $("input").addClass("show-input").fadeIn("slow").focus();
        $(".toAppend").fadeOut(1000);
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

            //clicking on checkbox removes list item with animation and puts focus back in text box
            $("li").on("click", function() {

                var name = $(this).text();
                $.ajax({
                    type: "DELETE",
                    url: "/shopping/remove/" + name
                }).done(function(response){
                    console.log("deleted");
                });
                $(this).animate({
                    opacity: 0.0,
                    paddingLeft: '+=40'
                }, 500, function() {
                    $(this).remove();
                });
                $("input").focus();
            });
            return false;
        }
    });

});