export default {

  closeVideo(elemId){
    if(document.getElementById(elemId)){
      document.getElementById(elemId).remove();
      this.adjustVideoElemSize();
    }
  },

  userMediaAvailable(){
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  },


  getUserFullMedia(){
    if(this.userMediaAvailable()){
      return navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      });
    }

    else{
      throw new Error('User media not available');
    }
  },


  getUserAudio(){
    if(this.userMediaAvailable()){
      return navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      });
    }

    else{
      throw new Error('User media not available');
    }
  },



  shareScreen(){
    if(this.userMediaAvailable()){
      return navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always"
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
    }

    else{
      throw new Error('User media not available');
    }
  },


  getIceServer(){
    return {
      'iceServers': [
        {
          'urls': 'stun:stun.l.google.com:19302'
        },
        {
          'urls': 'turn:192.158.29.39:3478?transport=udp',
          'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
          'username': '28224511:1379330808'
        },
        {
          'urls': 'turn:192.158.29.39:3478?transport=tcp',
          'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
          'username': '28224511:1379330808'
        }
      ]
    };
  },

  replaceTrack(stream, recipientPeer){
    let sender = recipientPeer.getSenders ? recipientPeer.getSenders().find(s => s.track && s.track.kind === stream.kind) : false;

    sender ? sender.replaceTrack(stream) : '';
  },


  toggleShareIcons(share){
    let shareIconElem = document.querySelector('#share-screen');

    if(share){
      shareIconElem.setAttribute('title', 'Stop sharing screen');
      shareIconElem.children[0].classList.add('text-primary');
      shareIconElem.children[0].classList.remove('text-white');
    }

    else{
      shareIconElem.setAttribute('title', 'Share screen');
      shareIconElem.children[0].classList.add('text-white');
      shareIconElem.children[0].classList.remove('text-primary');
    }
  },


  toggleVideoBtnDisabled(disabled){
    document.getElementById('toggle-video').disabled = disabled;
  },



  saveRecordedStream(stream, user){
    let blob = new Blob(stream, {type:'video/webm'});

    let file = new File([blob], `${user}-${moment().unix()}-record.webm`);

    saveAs(file);
  },


  toggleModal(id, show){
    let el = document.getElementById(id);

    if(show){
      el.style.display = 'block';
      el.removeAttribute('aria-hidden');
    }

    else{
      el.style.display = 'none';
      el.setAttribute('aria-hidden', true);
    }
  },



  setLocalStream(stream){
    const localVidElem = document.getElementById('local');
    VidElem.srcObject = stream;
  },

};
