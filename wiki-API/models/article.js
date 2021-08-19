const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

exports.Article = mongoose.model('Article', articleSchema);