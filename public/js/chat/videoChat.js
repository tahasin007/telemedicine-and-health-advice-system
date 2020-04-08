$(document).ready(function() {
	var socket =io();
	var room=$('#room_id').val();
	var yourConn;
	var i=0;

	socket.on('connect',function(){
		socket.emit('join videoChat',room);

	});


	socket.on('new videoChat',function(msg){

		var data = JSON.parse(msg);
		console.log(data)
		switch(data.type) { 
			case "login": 
			handleLogin(data.success); 
			break; 
			case "offer": 
			handleOffer(data.offer, data.name); 
			break;
			case "answer": 
			handleAnswer(data.answer); 
			break; 
			case "candidate": 
			handleCandidate(data.candidate); 
			break; 
			case "leave": 
			handleLeave(); 
			break; 
			default: 
			break; 
		}

	});


	$('#webcam').on('click', function(e){
		e.preventDefault();
		var info={
			sender: 'sender',
			room:room,
			type:'login'
		}
		socket.emit('private videoChat',JSON.stringify(info));
	});

	$('#hangUpBtn').on('click', function(e){
		e.preventDefault();
		var info={
			sender: 'sender',
			room:room,
			type: "leave"
		}
		socket.emit('private videoChat',JSON.stringify(info));

		handleLeave();
	});


	$('#callBtn').on('click', function(e){
		e.preventDefault();
		if(i<1){
			i++;
		yourConn.createOffer(function (offer) { 
			yourConn.setLocalDescription(offer); 
			var info={
				sender: 'sender',
				room:room,
				type: "offer", 
				offer: offer
			}
			socket.emit('private videoChat',JSON.stringify(info));
		}, function (error) { 
			alert("Error when creating an offer"); 
		});}
		else i++;
	});


	function handleOffer(offer, name) { 
		
		yourConn.setRemoteDescription(new RTCSessionDescription(offer));
		console.log(yourConn)
		yourConn.createAnswer(function (answer) { 
			yourConn.setLocalDescription(answer); 
			var info={
				sender: 'sender',
				room:room,
				type: "answer", 
				answer: answer
			}
			socket.emit('private videoChat',JSON.stringify(info));
		}, function (error) { 
			alert("Error when creating an answer"); 
		}); 
	};


	function handleAnswer(answer) { 
		yourConn.setRemoteDescription(new RTCSessionDescription(answer)); 
	};

	function handleCandidate(candidate) { 
		yourConn.addIceCandidate(new RTCIceCandidate(candidate)); 
	};

	function handleLeave() {  
		remoteVideo.src = null; 

		yourConn.close(); 
		yourConn.onicecandidate = null; 
		yourConn.onaddstream = null; 
	};

	function handleLogin(success) { 
		if (success === false) { 
			alert("Ooops...try a different username"); 
		} else { 

			navigator.webkitGetUserMedia({ video: true, audio: true }, function (myStream) { 
				stream = myStream; 


				localVideo.srcObject = stream;


				var configuration = { 
					"iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
				}; 

				yourConn = new webkitRTCPeerConnection(configuration); 


				yourConn.addStream(stream); 


				yourConn.onaddstream = function (e) { 
					remoteVideo.srcObject = e.stream; 
				};

				yourConn.onicecandidate = function (event) { 
					if (event.candidate) { 
						var info={
							sender: 'sender',
							room:room,
							type: "candidate", 
							candidate: event.candidate
						}
						socket.emit('private videoChat',JSON.stringify(info));
					} 
				};  

			}, function (error) { 
				console.log(error); 
			});  
		} 
	};
});