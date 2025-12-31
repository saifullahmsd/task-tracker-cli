const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "todo",
        enum: ["todo", "in-progress", "done"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);