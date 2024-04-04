const Post = require('../models/Post');

exports.getPost = async ( req, res ) => {
    // console.log(req.body);
    await Post.create(req.body);
    res.redirect('/');
};
exports.getUpdatePost = async (req, res) => {
    const updatePost = await Post.findOne({_id: req.params.id});
    updatePost.title = req.body.title;
    updatePost.message = req.body.message;
    updatePost.save();
    res.redirect(`/posts/${req.params.id}`);
};
exports.getDeletePost = async (req, res) => {
    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/');

};