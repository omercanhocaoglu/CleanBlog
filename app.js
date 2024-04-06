const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const methodOverride = require('method-override');
const Post = require('./models/Post');
const pageController = require("./controllers/pageController");
const postController = require("./controllers/postController");

const app = express();

//connect db
mongoose.connect('mongodb+srv://omercanhocaoglu:sXDWzA5rI5LjJRre@cluster0.nwvjyus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then( () => {
    console.log('DB connected!')
}).catch( (err) => {
    console.log(err);
});

//Template engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(methodOverride('_method', {
    methods: [
        'POST',
        'GET'
    ]
}));

// Routes
app.get( "/", async ( req,res ) => {
    const posts = await Post.find({}).sort('-dateCreated');
    res.render('index', {
        posts
    });
});
app.get( "/about", pageController.getAboutPage);
app.get( "/add_post", pageController.getAddPost);
app.get( "/posts/:id", pageController.getPostPage);
app.get("/posts/update/:id", pageController.getUpdatePage);

app.post( "/posts", postController.getPost);
app.put("/posts/:id", postController.getUpdatePost);
app.delete("/posts/:id", postController.getDeletePost);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Sunucu port:${port}'de çalışıyor.`);
});