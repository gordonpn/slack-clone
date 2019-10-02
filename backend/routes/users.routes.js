module.exports = app => {
  const users = require('../controllers/users.controller.js');

  // Create a new User
  app.post('/users', users.create);

  // Retrieve all Users
  app.get('/users', users.findAll);

  // Retrieve a single User with userId
  app.get('/user/:userId', users.findOne);

  // Update a User with userId
  app.put('/user/:userId', users.update);

  // Delete a User with userId
  app.delete('/user/:userId', users.delete);
};
