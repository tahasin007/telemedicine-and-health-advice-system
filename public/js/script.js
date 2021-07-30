$(document).ready(function () {
  window.setTimeout(function () {
    $('.alert')
      .fadeTo(500, 0)
      .slideUp(500, function () {
        $(this).remove()
      })
  }, 2000)

  $('#notification-div').on('click', function () {
    $.ajax({
      url: '/chat/updateNav',
      method: 'post',
      data: {
        userName: $('#user_name').val(),
      },
      success: function (response) {
        if (response == 'success') {
          $('.notification-number').hide()
        }
      },
      error: function (response) {},
    })
  })
})
