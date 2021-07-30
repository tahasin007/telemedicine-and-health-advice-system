$(document).ready(function () {
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        $('#profilepic').attr('src', e.target.result)
      }

      reader.readAsDataURL(input.files[0]) // convert to base64 string
    }
  }

  $('#upload_image').change(function () {
    readURL(this)
  })

  $('#upload_image').on('change', function () {
    const profileImage = $('#upload_image')
    if (profileImage.val() != '') {
      const formData = new FormData()
      formData.append('profileImage', profileImage[0].files[0])
      const id = $('#userId').val()
      $.ajax({
        url: '/uploadProfileImage/' + id,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
          profileImage.val('')
        },
      })
    }
  })
})
