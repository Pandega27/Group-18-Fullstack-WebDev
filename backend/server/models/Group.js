// models/Group.js
import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true, // Make sure this is true
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
    tags: [String],
    location: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    rules: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
}, { timestamps: true });

export default mongoose.model('Group', groupSchema);
