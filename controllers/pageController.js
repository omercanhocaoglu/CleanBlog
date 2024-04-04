const Post = require("../models/Post");

exports.getAboutPage = ( req, res ) => {
    res.render('about');
};
exports.getAddPost = ( req, res ) => {
    res.render('add_post');
};
exports.getPostPage = async ( req, res ) => {
    // console.log(req.params.id);
    const postID = await Post.findById(req.params.id);
    res.render('post', {
        postID
    });
};
exports.getUpdatePage = async ( req, res ) => {
    const updateByID = await Post.findOne({ _id: req.params.id });
    res.render('update',{
        updateByID
    });
};