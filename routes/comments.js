var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/");

//NEW FORM COMMENT
router.get("/new", middleware.isLoggedIn,function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else {
            res.render("comments/new",{campground: foundCampground})  ; 
        }
    });
    
});

//CREATE COMMENT
router.post("/", middleware.isLoggedIn,function(req, res){
   
   //find camp id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
            console.log(err);
        }else {
            //create new comment
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    console.log(err);
                } else {
                    //add username +id
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    //connect new comment to camp
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    //redirect
                    req.flash("success", "Comment successfully created");
                    res.redirect("/campgrounds/"+foundCampground._id);
                }
            });
            
             
        }
    });
});

//EDIT COMMENT 
///campgrounds/:id/comments
router.get("/:commentId/edit", middleware.checkCommentOnwership,function(req, res){
    Comment.findById(req.params.commentId, function(err, foundComment) {
            if (err || ! foundComment){
                req.flash("error", "Campground not found");
                res.redirect("back");
                res.redirect("back");
            } else {
                res.render("comments/edit", {comment: foundComment, campgroundId:req.params.id}); 
            }
            
    })
   
});

//UPDATE COMMENT
router.put("/:commentId", middleware.checkCommentOnwership,function(req, res){
    //res.send("updated");

    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, updateComent){
        if(err || !updateComent){
            req.flash("error", "Commnet not found");
            res.redirect("back");
            console.log(err);
        }else{
           req.flash("success", "Comment successfully edited");
           res.redirect("/campgrounds/"+req.params.id); 
        }
    });
});

//DELETE Comment
router.delete("/:commentId", middleware.checkCommentOnwership,function(req, res){

   Comment.findByIdAndRemove(req.params.commentId, function(err, foundComment){
        if(err || !foundComment){
            req.flash("error", "Campground not found");
            res.redirect("back");
            console.log(err);
            
        }else{
            req.flash("success", "Comment successfully deleted");
           res.redirect("/campgrounds/"+req.params.id); 
        }
    });
     
});







module.exports = router;