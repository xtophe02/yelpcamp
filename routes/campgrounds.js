var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/");
var NodeGeocoder = require('node-geocoder');
var googleKey = process.env.GOOGLEAPI || require("../api");

var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: googleKey.googleApi, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};


var geocoder = NodeGeocoder(options);



//RESTful routes
//INDEX - show all campgrounds
router.get("/", function (req, res) {
    //get all campgrounds from database
    //console.log(req.user)//undefined if no user logged
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds
            }); //, currentUser: req.user}); 
        }
    });

});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    var newName = req.body.yelpcamp; // needs body-parser
    var newImage = req.body.imgYelpcamp;
    var newPrice = req.body.price;
    var newDescription = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };


    geocoder.geocode(req.body.location, function (err, data) {
        if (err) {

            console.log(err);
        } else {
            console.log(data);
            console.log("location: ", req.body.location);
            //var lat = data.results[0].geometry.location.lat;
            //var lng = data.results[0].geometry.location.lng;
            //var location = data.results[0].formatted_address;
            var lat = data[0].latitude;
            var lng = data[0].longitude;
            var location = data[0].formattedAddress;


            var newCampground = {
                name: newName,
                image: newImage,
                description: newDescription,
                price: newPrice,
                author: author,
                location: location,
                lat: lat,
                lng: lng
            }

            //var newCampground = {name: newName, image: newImage, price: newPrice ,description: newDescription, author: author};

            //create and save on MongoDB
            Campground.create(newCampground, function (err, newlyCreated) {
                if (err) {
                    console.log(err)
                } else {
                    //console.log(newlyCreated);
                    req.flash("success", "campground successfully created");
                    res.redirect("/campgrounds");
                }
            });
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//SHOW - show one campground
router.get("/:id", function (req, res) {

    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("back");
            console.log(err);
        } else {
            //console.log(foundCampground)
            //console.log(foundCampground.comments)
            res.render("campgrounds/show", {
                campground: foundCampground,
                page: 'campgrounds'
            });
        }
    });

});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOnwership, function (req, res) {

    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("back");
            console.log(err);
        } else {

            res.render("campgrounds/edit", {
                campground: foundCampground
            });

        }
    });



});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOnwership, function (req, res) {

    geocoder.geocode(req.body.location, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            //console.log(data.results[0]);
            //res.send("updated");



            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            var location = data.results[0].formatted_address;



            var newData = {
                name: req.body.name,
                image: req.body.image,
                description: req.body.description,
                price: req.body.price,
                location: location,
                lat: lat,
                lng: lng
            };

            //console.log(data.results[0].geometry.location.lat);
            // console.log(data.results[0]);
            //res.send("updated");

            Campground.findByIdAndUpdate(req.params.id, {
                $set: newData
            }, function (err, campground) {
                if (err) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    req.flash("success", "Successfully Updated!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });

});
/*
router.put("/:id", middleware.checkCampgroundOnwership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
        if(err || !updateCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
            console.log(err);
        }else{
           req.flash("success", "campground successfully edited");
           res.redirect("/campgrounds/"+req.params.id); 
        }
    });
});
*/
//DELETE CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOnwership, function (req, res) {

    Campground.findByIdAndRemove(req.params.id, function (err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("back");
            console.log(err);

        } else {
            req.flash("success", "campground successfully deleted");
            res.redirect("/campgrounds");
        }
    });

});








module.exports = router;