const Channel = require('../models/Channel.js');

exports.create = (req, res) => {
    // create channel
    Channel.find()
        .then(channels => {
            res.send(channels);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while creating a channel."
        })
    })
};

exports.findAll = (req, res) => {
    // find all channels
};

exports.findOne = (req, res) => {
    // find specific channel
};

exports.update = (req, res) => {
    // update channel
};

exports.delete = (req, res) => {
    // channel delete
};