$(document).ready(function () {
  var socket = io()
  var sender = $('#sender_name').val()
  var receiver = $('#receiver_name').val()
  var senderId = $('#sender_id').val()
  var receiverId = $('#receiver_id').val()
  var user = $('#user_name').val()
  var userId = $('#user_id').val()

  socket.on('connect', function () {
    var params = {
      user: user,
    }
    socket.emit('joinRequest', params, function () {})
  })
  socket.on('newFriendRequest', function (friend) {
    $('#reload').load(location.href + ' #reload')
    $(document).on('click', '#accept_request', function () {
      var senderID = $('#senderID').val()
      var senderNAME = $('#senderNAME').val()
      $.ajax({
        url: '/friendRequest/' + user,
        type: 'POST',
        data: {
          senderId: senderID,
          senderName: senderNAME,
          user: user,
          userId: userId,
        },
        success: function () {
          $(this).parent().eq(0).remove()
        },
      })
      $('#reload').load(location.href + ' #reload')
    })

    $(document).on('click', '#cancel_request', function () {
      var senderID = $('#senderID').val()
      var senderNAME = $('#senderNAME').val()
      $.ajax({
        url: '/friendRequest/' + user,
        type: 'POST',
        data: {
          sender_id: senderID,
          sender_name: senderNAME,
          user_name: user,
          user_id: userId,
        },
        success: function () {
          $(this).parent().eq(0).remove()
        },
      })
      $('#reload').load(location.href + ' #reload')
    })
  })
  $('#friendRequest').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/friendRequest/' + receiver,
      type: 'POST',
      data: {
        receiver: receiver,
        sender: sender,
        receiverId: receiverId,
        senderId: senderId,
      },
      success: function () {
        socket.emit(
          'friendRequest',
          {
            receiver: receiver,
            sender: sender,
          },
          function () {
            console.log('Request Sent')
          }
        )
      },
    })
  })
  $('#accept_request').on('click', function () {
    var senderID = $('#senderID').val()
    var senderNAME = $('#senderNAME').val()
    $.ajax({
      url: '/friendRequest/' + user,
      type: 'POST',
      data: {
        senderId: senderID,
        senderName: senderNAME,
        user: user,
        userId: userId,
      },
      success: function () {
        $(this).parent().eq(0).remove()
      },
    })
    $('#reload').load(location.href + ' #reload')
  })

  $('#cancel_request').on('click', function () {
    var senderID = $('#senderID').val()
    var senderNAME = $('#senderNAME').val()
    $.ajax({
      url: '/friendRequest/' + user,
      type: 'POST',
      data: {
        sender_id: senderID,
        sender_name: senderNAME,
        user_name: user,
        user_id: userId,
      },
      success: function () {
        $(this).parent().eq(0).remove()
      },
    })
    $('#reload').load(location.href + ' #reload')
  })
})
