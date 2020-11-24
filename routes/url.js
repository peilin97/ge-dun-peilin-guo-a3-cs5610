const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const {
    URLModel,
    updateURL,
    addURL,
    generateRandomShortenedURL,
} = require('../models/url');

// show at most 10 pairs (originalURL, shortenedURL)
router.get('/', function(req, res) {
    URLModel.find().exec()
    .then(function(data) {
        const num = Math.min(data.length, 10);
        res.status(200).send(data.slice(0, num));
    }, function(err) {
        res.status(404).send("Error getting URLs");
    })
})

// redirect to the original url
router.get('/:shortenedURL', function(req, res) {
    const shortenedURL = req.params.shortenedURL;
    URLModel.findOne({shortened: shortenedURL}, function(err, foundURL) {
        if (err) {
            console.log(err);
        } else if (!foundURL) {
            res.status(404).send('No Matching Original URL Found');
        } else {
            res.redirect(foundURL.original);
        }
    });
});

// when hit the search button, go to the edit page
router.get('/:shortenedURL/edit', function(req, res) {
    const shortenedURL = req.params.shortenedURL;
    URLModel.findOne({shortened: shortenedURL}, function(err, foundURL) {
        if (err) {
            console.log(err);
        } else if (!foundURL) {
            res.status(404).send("The given shortened URL is not valid.");
        } else {
            res.send({original: foundURL.original});
        }
    });
});

// add a new URL object
router.post('/', middleware.checkURLValidity, function(req, res) {
    // after making sure that the original url is valid
    let shortened = req.body.shortened;
    const original = req.body.original;
    if (shortened === null || shortened === '') {
        shortened  = generateRandomShortenedURL();
        addURL({original: original, shortened: shortened});
        return res.send({shortened: shortened});
    } 
    // check the validity of brandedURL
    // 1. length
    if (shortened.length < 6 || shortened.length > 18) {
        res.status(400).send("the branded URL's length should be within 6 and 18.");
        return;
    }
    // 2. character
    if (! /^[a-z0-9_-]+$/.test(shortened)) {
        res.status(400).send("the branded URL has invalid characters.");
        return;
    }
    // 3. duplicate
    URLModel.findOne({shortened: shortened}, function(err, foundURL) {
        if(err) {
            console.log(err);
            return;
        } else if (foundURL) {
            res.status(400).send("the branded URL is taken. Try another.");
            return;
        }
        addURL({original: original, shortened: shortened});
        return res.send({shortened: shortened});
    });
})

// update the original url
router.put('/:shortenedURL', middleware.checkURLValidity, function(req, res) {
    const shortenedURL = req.params.shortenedURL;
    const newOriginal = req.body.original;
    updateURL({shortened: shortenedURL, original: newOriginal});
    res.send({original: newOriginal});
});

// delete a url
router.delete('/:shortenedURL', function(req, res) {
    URLModel.deleteOne({shortened: req.params.shortenedURL})
    .then(() => {
        res.status(200).send('successfully delete the url');
    })
    .catch(() => {
        res.status(404).send('failed to delete the url');
    })
});

module.exports = router;