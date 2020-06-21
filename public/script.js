
let socket = io();

$(function() {

    $('#loginBox').show();
    $('#ChatBox').hide();

    let msgBox = $('#msgBox');
    let msgList = $('#msgList');
    let msgSend = $('#msgSend');
    let defUserName = $('#defUserName');
    let UserName = $('#UserName');
    let LoginBtn = $('#LoginBtn');
    let Password = $('#Password');

    LoginBtn.click(()=>{
        socket.emit("Login",{
            inputVal: UserName.val(),
            inputPass: Password.val()
        });
    })

    socket.on("logged_in",()=>{
        $('#loginBox').hide();
        $('#ChatBox').show();
    })

    socket.on("logged_failed",()=>{
        window.alert("Incorrect Password or Username");
    })

    msgSend.click(()=>{
        socket.emit("send_msg",{
            to: defUserName.val(),
            message: msgBox.val()
        })
    })

    socket.on("rcv_msg",(data)=>{
        msgList.append('<li>'+`[${data.from}] : ${data.message}`+'</li>');
    })

})