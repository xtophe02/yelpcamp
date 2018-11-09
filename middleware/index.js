
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOnwership = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground)
            {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    
                    next();  
                } else {
                    req.flash("error", "You don't have the premission");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("/login");
    }

};


middlewareObj.checkCommentOnwership = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
            
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();  
                } else {
                    req.flash("error", "You don't have the premission")
                    res.redirect("back");
                }
            }
        });
    } else {
        rq.flash("error", "You need to be logged in")
        res.redirect("/login");
    }

};
//middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}

module.exports = middlewareObj;