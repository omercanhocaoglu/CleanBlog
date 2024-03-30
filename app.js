const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Post = require('./models/Post');

const app = express();

//connect db
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Template engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

// Routes
app.get( "/", async ( req,res ) => {
    const posts = await Post.find({});
    res.render('index', {
        posts
    });
});
app.get( "/about", ( req,res ) => {
    res.render('about');
});
app.get( "/add_post", ( req,res ) => {
    res.render('add_post');
});
app.get( "/posts/:id", async ( req,res ) => {
    // console.log(req.params.id);
    const postID = await Post.findById(req.params.id);
    res.render('post', {
        postID
    });
});
app.post( "/posts", async ( req,res ) => {
    // console.log(req.body);
    await Post.create(req.body);
    res.redirect('/');
});

const port = 5000;
app.listen(port, () => {
    console.log(`Sunucu port:${port}'de çalışıyor.`);
});