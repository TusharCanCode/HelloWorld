const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //Foreign key
        ref: 'User', //Reference model
        required: [true, "userId field cannot be empty"],
    },
    description: {
        type: String,
        maxlength: [500, "Maximum 500 characters"],
    },
    image: String,
    likes: {
        type: Array,
        default: []
    }
},
    { timestamps: true });

var note = new mongoose.model('Post', PostSchema);
module.exports = note;