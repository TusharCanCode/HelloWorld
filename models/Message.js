const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    conversationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: String
},
    { timestamps: true });

var message = new mongoose.model('Message', MessageSchema);
module.exports = message;