var mongoose = require("mongoose");
//schema campground moongoose

var commentSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    author: {
                id: {
                    type: mongoose.Schema.Types.ObjectId, //associations with User, we could do embebed
                    ref: "User"
                },
                username: String
            }
});

module.exports = mongoose.model("Comment", commentSchema);