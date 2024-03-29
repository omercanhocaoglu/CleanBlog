const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const PostSchema = new Schema({
    title: String,
    message: String,
    dateCreated: {
        type: Date,
        default: Date.now
    } 
});

// model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;