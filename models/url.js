const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    original: String,
    shortened: String,
    isBranded: Boolean,
});

const UrlModel = mongoose.model('Url', urlSchema);

function addUrl(url) {
    return UrlModel.create(url);
}

function deleteUrl(shortened) {
    UrlModel.deleteOne({shortened: shortened});
}

function updateUrl(newUrl) {
    UrlModel.updateOne(
        {shortened: newUrl.shortened},
        {original: newUrl.original}
    );
}

function findShortenedByOriginal(original) {
    // return UrlModel.find({original: original})
} 