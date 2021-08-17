//jshint esversion:6
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.set('useFindAndModify', false);

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model('Article', articleSchema);

////////////////// Resquests targeting all articles ////////////////////

app.route("/articles")

.get(function (req, res) {
    Article.find({}, function (err, foundArticles) {
        if (!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
})

.post(function (req, res) {

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    
    newArticle.save(function(err) {
        if (!err) {
            res.send("Succesfully added new article");
        } else {
            res.send(err);
        }
    });

})

.delete(function(req, res){
    Article.deleteMany({}, function(err){
        if(!err) {
            res.send("Succesfully deleted all articles");
        } else {
            res.send(err);
        }
    });
});

////////////////// Resquests targeting a specific article ////////////////////

app.route("/articles/:articleTitle")

.get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        } else {
            res.send("No articles matching the specified title.");
        }
    });
})

.put(function(req, res){
    Article.updateOne(
        {title: req.params.articleTitle}, 
        {title: req.body.title, content: req.body.content},
        function(err){
            if(!err){
                res.send("Succesfully updated article.")
            }
        } 
    );
})

.patch(function(req, res){
    Article.updateOne(
        {title: req.params.articleTitle}, 
        {$set: req.body},
        function (err){
            if(!err){
                res.send("Succesfully updated article.")
            } else {
                res.send(err);
            }
        }
    );
})

.delete(function(req, res){
    Article.deleteOne(
        {title: req.params.articleTitle}, 
        function(err){
            if (!err){
                res.send("Succesfully deleted article.")
            } else {
                res.send(err);
            }
        }
    );

});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});