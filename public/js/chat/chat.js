$(document).ready(function() {
    var socket =io();
    var paramOne = $.deparam(window.location.pathname);
    var newParam = paramOne.split('.');
    swap(newParam,0,1);
    var paramTwo = newParam[0]+'.'+newParam[1];

    socket.on('connect',function(){
      var params = {
       room1: paramOne,
       room2: paramTwo
   }
   socket.emit('join PM',params);

});
    socket.on('new message',function(data){
        var message=data.text;
        var sender=data.sender;
        var room=data.room.split('.');
        $.ajax({
            url:'/chat/getProfileImage',
            type: 'POST',
            data:{
                userName: sender
            },
            success: function(data){
                if(room[0]== $('#name-user').val()){
                    console.log(data)
                    if(typeof data == '')
                    {
                        $('#chat').append('<div class="msg right-msg m-2"><div class="msg-img" style="background-image: url(/uploads/default.jpg)"></div><div class="msg-bubble"><div class="msg-info"> <div class="msg-info-name">'+sender+'</div></div><div class="msg-text">'+message+'</div></div></div>');
                    }
                    else{
                        $('#chat').append('<div class="msg right-msg m-2"><div class="msg-img" style="background-image: url(/uploads/'+data+')"></div><div class="msg-bubble"><div class="msg-info"> <div class="msg-info-name">'+sender+'</div></div><div class="msg-text">'+message+'</div></div></div>');
                    }

                }
                else{
                    if(typeof data == '')
                    {
                        $('#chat').append('<div class="msg left-msg m-2"><div class="msg-img" style="background-image: url(/uploads/default.jpg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">'+sender+'</div></div><div class="msg-text">'+message+'</div></div></div>');
                    }
                    else{
                        $('#chat').append('<div class="msg left-msg m-2"><div class="msg-img" style="background-image: url(/uploads/'+data+')"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">'+sender+'</div></div><div class="msg-text">'+message+'</div></div></div>');
                    }

                }
            },
            error: function(err){
              console.log(err.status);
          }
      });
    })
    $('#message_form').on('submit', function(e){
        e.preventDefault();

        var msg = $('#msg').val();
        var sender = $('#name-user').val();
        if(msg.trim().length>0){
        	socket.emit('private message',{
        		text: msg,
        		sender: sender,
        		room:paramOne
        	},function(){
        		$('#msg').val('');
        	})
        }
    });
    $('#send-message').on('click', function(){
        var message = $('#msg').val();


        $.ajax({
            url:'/chat/'+paramOne,
            type: 'POST',
            data: {
                message: message
            },
            success: function(){
                $('#msg').val('');
            },
            error: function(err){
              console.log(err.status);
          }
      })
    });
});

function swap(input, value_1, value_2){
    var temp = input[value_1];
    input[value_1] = input[value_2];
    input[value_2] = temp;
}
