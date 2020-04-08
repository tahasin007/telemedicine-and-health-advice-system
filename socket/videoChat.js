module.exports = function(io){
	io.on('connection', (socket) =>{
		socket.on('join videoChat',(pm) =>{
			socket.join(pm);

		});
		socket.on('private videoChat', (data) =>{
			var message = JSON.parse(data); 
			switch(message.type){
				case "login":
				var info={
					room:message.room,
					type:'login',
					success:true
				}
				io.to(message.room).emit('new videoChat',JSON.stringify(info));
				break;

				case "offer": 
				var info={
					room:message.room,
					type: "offer", 
					offer: message.offer,
					name:'sender'
				}
				io.to(message.room).emit('new videoChat',JSON.stringify(info));
				break;

				case "answer": 
				var info={
					room:message.room,
					type: "answer", 
					answer: message.answer
				}
				io.to(message.room).emit('new videoChat',JSON.stringify(info));
				break; 

				case "candidate": 
				var info={
					room:message.room,
					type: "candidate", 
					candidate: message.candidate
				}

				io.to(message.room).emit('new videoChat',JSON.stringify(info));

				break;

				case "leave": 
				var info={
					room:message.room,
					type: "leave"
				}
				console.log("Disconnecting from");
				io.to(message.room).emit('new videoChat',JSON.stringify(info));
				break;

				default: 
				var info={
					room:message.room,
					type: "error", 
					message: "Command not found: "
				}
				io.to(message.room).emit('new videoChat',JSON.stringify(info)); 
				break; 
			}

		})
	});

}


