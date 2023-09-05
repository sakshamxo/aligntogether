const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
    status : {
        type : String,
        required : [true,"status is required"],
        minLength: [1, "Status must not be empty"],
        maxLength: [280, "Status cannot exceed 280 characters"],
    },
    author : {type: mongoose.Schema.Types.ObjectId, ref : "user",
    required: [true, "Author is required"]},
    createdAt : {
        type: Date,
        default: Date.now
    }
},{timestamps : true})

const posts = mongoose.model("posts", postModel)
module.exports = posts