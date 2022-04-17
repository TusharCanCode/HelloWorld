const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConversationSchema = new Schema({
    users: {
        type: Array,
        default: []
    }
},
    { timestamps: true });

var conversation = new mongoose.model('Conversation', ConversationSchema);
module.exports = conversation;