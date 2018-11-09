var mongoose = require("mongoose");
//schema campground moongoose

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: {type: Number, default: 0},
    location: {type: String, default: "Boim"},
    lat: {type: Number, default: 41.261918},
    lng: {type: Number, default: -8.2794425},
    createdAt: { type: Date },
    description: String,
    author: {
                id: {
                    type: mongoose.Schema.Types.ObjectId, //associations with User, we could do embebed
                    ref: "User"
                },
                username: String
            },
    comments:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            },
            ]
});

module.exports = mongoose.model("Campground", campgroundSchema);