const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
    authorId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    borderDate: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Articles", articleSchema);
