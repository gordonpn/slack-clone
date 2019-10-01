const Channel = require('../models/Channel.js');

// create channel
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Channel
    const channel = new Channel({
        name: req.body.name
    });

    // Save Channel in the database
    channel.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

    // find all channels
exports.findAll = (req, res) => {
    Channel.find()
        .then(channels => {
            res.send(channels);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while creating a channel."
        })
    })
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