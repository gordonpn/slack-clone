module.exports = (app) => {
    const channels = require('../backend/controllers/controller.js');

    // Create a new Channel
    app.post('/channels', channels.create);

    // Retrieve all Channels
    app.get('/channels', channels.findAll);

    // Retrieve a single Channel with channelId
    app.get('/channels/:channelId', channels.findOne);

    // Update a Channel with channelId
    app.put('/channels/:channelId', channels.update);

    // Delete a Channel with channelId
    app.delete('/channels/:channelId', channels.delete);
};