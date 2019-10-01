const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new Schema({
        name: {
            type: String,
            lowercase: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
            index: true
        }
    },
    {
        timestamps: true
    });

const Channel = mongoose.model("Channel", channelSchema);
module.exports = Channel;
