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
                //$("#chatrooms_div").show();
                $("#login_div").show();
                
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

function login_click(){
    var username = $("#username2").val();
    var password = $("#password2").val();
    var data = {"username": username, "password": password,};
    $.ajax({
        url: "login",
        method: "POST",
        data: data,
        success: function(response){
            if (response['status'] == true){
                alert(response['status']);
                $("#login_div").fadeOut();
                $("#chatrooms_div").show();
            }
            else{
                $("#status2").text("Unknown User");
            }
        },
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
                row = `<tr><td>${chatrooms[i][0]}</td>`
                row += `<td>${chatrooms[i][1]}</td>`
                row += `<td>${chatrooms[i][2]}</td>`
                row += `<td><button onclick="getChatRoom(${chatrooms[i][0]})">View</button></td></tr>`
                $("#chattable > tbody").append(row);
                console.log(chatrooms[i][0]);
                $("#choose_chatroom_btn").prop('disabled', true);
            }
        }
    });
}

function getChatRoom(chatroom_number){
    console.log(chatroom_number);
    $('#chatroom').show();
    //need add a table to see the members of the group
    $('#populate').html(chatroom_number);
}