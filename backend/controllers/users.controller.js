const User = require('../models/User.js');

// create user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    return res.status(400).send({
      message: 'username can not be empty'
    });
  }

  const user = new User({
    username: req.body.username
  });

  // Save user in the database
  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.'
      });
    });
};

exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
    });
};

//get a user by id
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving user with id ' + req.params.userId
      });
    });
};

//get a user by name
exports.findByName = (req, res) => {
  User.find({ username: req.params.username })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with name ' + req.params.username
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with name ' + req.params.username
        });
      }
      return res.status(500).send({
        message: 'Error retrieving user with name ' + req.params.username
      });
    });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    console.log(req.body.channelIDs);
    return res.status(400).send({
      message: 'User content can not be empty'
    });
  }
  const updatedParams = {};
  if (req.body.username) updatedParams.username = req.body.username;
  if (req.body.friendIDs) updatedParams.friendIDs = req.body.friendIDs;
  if (req.body.channelIDs) updatedParams.channelIDs = req.body.channelIDs;

  // Find user and update it with the request body
  User.findByIdAndUpdate(req.params.userId, updatedParams, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id (objectID error)' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Error updating user with id ' + req.params.userId
      });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      res.send({ message: 'User deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Could not delete user with id ' + req.params.userId
      });
    });
};
