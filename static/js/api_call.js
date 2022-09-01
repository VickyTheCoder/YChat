function join_click(){
    var username = $("#username").val();
    var password = $("#password").val();
    var mobile = $("#mobile").val();
    var data = {"username": username, "password": password, "mobile": mobile};
    $.ajax({
        url: "join",
        method: "POST",
        data: data,
        success: function(response){
            if (response['status'] == "Account Created"){
                alert(response['status']);
                $("#signup_div").fadeOut();
                $("#chatrooms_div").show();
            }
            else{
                $("#status").text(response['status']);
            }
        },
        error: function(request, status, error){
            console.log(request)
            $("#status").text(status+":"+error);
        }
    });
}

function choose_chatroom(){
    $.ajax({
        url: "getChatRooms",
        method: 'GET',
        success: function(response){
            chatrooms = response['chatrooms'];
            for(i=0; i<chatrooms.length;i++){
                // $('#chattable').append(`<tr>${chatrooms[i][0]}<tr>`);
                $("#chattable > tbody").append(`<tr><td>${chatrooms[i][0]}</td><td>${chatrooms[i][1]}</td><td>${chatrooms[i][2]}</td><td><a href="chatroom/${chatrooms[i][0]}" target="_blank">View</a></td></tr>`);
                console.log(chatrooms[i][0]);
                $("#choose_chatroom_btn").prop('disabled', true);
            }
        }
    });
}