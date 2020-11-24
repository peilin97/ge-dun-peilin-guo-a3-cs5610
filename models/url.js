const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    original: String,
    shortened: String,
    // isBranded: Boolean,
});

const URLModel = mongoose.model('URL', urlSchema);

function addURL(url) {
    return URLModel.create(url);
}

function updateURL(newURL) {
    return URLModel.updateOne(
        {shortened: newURL.shortened},
        {original: newURL.original},
        // function(err, foundURL) {
        //     if (err) {
        //         return false;
        //     } else {
        //         return true;
        //     }
        // }
    );
}

function generateRandomShortenedURL() {
    let res = '';
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789-_';
    const charsLength = chars.length;
    while (res === '') {
        for (let i = 0; i < 6; i++) {
            res += chars.charAt(Math.floor(Math.random()*charsLength));
        }
        URLModel.findOne({shortened: res}, function(err, found) {
            if (err) {
                console.log(err);
            } else if (found) {
                res = '';
            }
        })
    }

    return res;
}

module.exports = {
    URLModel,
    updateURL,
    addURL,
    generateRandomShortenedURL,
};