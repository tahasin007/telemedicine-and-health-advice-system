import helpers from './helpers.js';

window.addEventListener('load', ()=>{
    document.getElementById('create-room').addEventListener('click', (e)=>{
        e.preventDefault();

        let roomName = document.querySelector('#room-name').value;

        if(roomName){
            document.querySelector('#err-msg').innerHTML = "";
            
            document.getElementById('room-create').style.display = "none";

        }

        else{
            document.querySelector('#err-msg').innerHTML = "All fields are required";
        }
    });

    document.getElementById('closeModal').addEventListener('click', ()=>{
        helpers.toggleModal('recording-options-modal', false);
    });
})