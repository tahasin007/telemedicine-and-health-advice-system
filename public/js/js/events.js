import helpers from './helpers.js'

window.addEventListener('load', () => {
  //When the chat icon is clicked
  //When the 'Create room" is button is clicked
  document.getElementById('create-room').addEventListener('click', (e) => {
    e.preventDefault()

    let roomName = document.querySelector('#room-name').value
    // let yourName = document.querySelector('#your-name').value;
    let yourName = 'hella'

    if (roomName && yourName) {
      //remove error message, if any
      document.querySelector('#err-msg').innerHTML = ''

      //save the user's name in sessionStorage
      sessionStorage.clear()
      sessionStorage.setItem('room', roomName)
      sessionStorage.setItem('username', yourName)

      //create room link

      //show message with link to room

      //empty the values
      document.getElementById('room-create').style.display = 'none'
    } else {
      document.querySelector('#err-msg').innerHTML = 'Please Enter Room ID'
    }
  })

  document.getElementById('closeModal').addEventListener('click', () => {
    helpers.toggleModal('recording-options-modal', false)
  })
})
