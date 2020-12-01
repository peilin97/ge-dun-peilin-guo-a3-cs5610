const axios = require('axios');

const middlewareObj = {};

middlewareObj.checkURLValidity = function(req, res, next) {
    const original = req.body.original;
    console.log(original);
    axios.get(original)
    .then(function(res) {
        // console.log(res);
        next();
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send('Invalid URL');
    });
};

module.exports = middlewareObj;