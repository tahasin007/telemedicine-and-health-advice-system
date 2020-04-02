const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var messageSchema = mongoose.Schema({
    message: {type: String},
    sender: {type: Schema.Types.ObjectId, ref: 'users'},
    receiver: {type: Schema.Types.ObjectId, ref: 'users'},
    senderName: {type: String},
    receiverName: {type: String},
    // userImage: {type: String, default: 'defaultPic.png'},
    isRead: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});


mongoose.model('message', messageSchema);