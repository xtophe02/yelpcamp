var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
      {
            name: "Cloud's Rest",
            image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
            description: "Spicy jalapeno cupim shank ribeye ball tip, pastrami leberkas ground round sirloin pig beef jowl filet mignon doner chuck swine. Ball tip ground round kielbasa ham hock tail pastrami chuck flank brisket pig bacon frankfurter turducken corned beef hamburger. T-bone hamburger leberkas swine bresaola pork loin kevin rump sirloin meatloaf jowl pork belly cupim shankle ham. Sirloin cupim meatloaf, jerky short ribs pastrami ham pig short loin ground round meatball jowl."
        },      
        {
            name: "Boim",
            image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg",
            description: "Spicy jalapeno cupim shank ribeye ball tip, pastrami leberkas ground round sirloin pig beef jowl filet mignon doner chuck swine. Ball tip ground round kielbasa ham hock tail pastrami chuck flank brisket pig bacon frankfurter turducken corned beef hamburger. T-bone hamburger leberkas swine bresaola pork loin kevin rump sirloin meatloaf jowl pork belly cupim shankle ham. Sirloin cupim meatloaf, jerky short ribs pastrami ham pig short loin ground round meatball jowl."
        },      
        {
            name: "Nespereira",
            image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
            description: "Spicy jalapeno cupim shank ribeye ball tip, pastrami leberkas ground round sirloin pig beef jowl filet mignon doner chuck swine. Ball tip ground round kielbasa ham hock tail pastrami chuck flank brisket pig bacon frankfurter turducken corned beef hamburger. T-bone hamburger leberkas swine bresaola pork loin kevin rump sirloin meatloaf jowl pork belly cupim shankle ham. Sirloin cupim meatloaf, jerky short ribs pastrami ham pig short loin ground round meatball jowl."
        }  
    ];

function seedDB(){
    //remove all campgrounds on DB
    Campground.remove({}, function(err){
        if (err) {
            console.log(err)
        }/*else {
            console.log("campgrounds removed");
                //add a few campgrounds
                data.forEach(function(campground){
                    Campground.create(campground, function(err, newCampground){
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log("campground added");
                            //create a comment
                            Comment.create(
                                {
                                    text:"I wish there was internet on it",
                                    author: "Homer Simpson"
                                }, 
                            function(err, comment){
                                if(err){
                                    console.log(err)
                                }else{
                                    newCampground.comments.push(comment);
                                    newCampground.save();
                                    console.log("created new comment")
                                }
                            })
                        }
                    })
                });
        }*/
    });



    //add a few commments
    
}

module.exports = seedDB;