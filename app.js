var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    //seedDB = require("./seeds"),
    passport = require("passport"),
    User = require("./models/user"),
    localStrategy = require("passport-local"),
    //Comment = require("./models/comment"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");
//Campground = require("./models/campground");

var commentRoutes = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//export DATABASEURL = mongodb: //localhost/yelp_camp

// const url = process.env.DATABASEURL || require("./api").mongodb;
const mlabPass = process.env.DATABASEURL || require("./api").mongodb;

const url = `mongodb://chrismo:${mlabPass}.mlab.com:11885/myyelpcamp`

mongoose.connect(url, {
    useMongoClient: true
});

mongoose.Promise = global.Promise;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(methodOverride("_method"));
app.use(flash());
app.use(
    require("express-session")({
        secret: "ainda nao sei para que serve",
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); //comes from User.passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.locals.moment = require("moment");

app.use(function (req, res, next) {
    //to have currentUSer in all pages/routes
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//seedDB();

// app.listen(5000, "127.0.0.1", function () {
//     console.log("yelpcamp server is listning");

// });

app.listen(3002, () => {
    console.log("Listening on port 3002");
});