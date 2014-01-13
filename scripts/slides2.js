// slides2.js
// copyright 2014, mikedice417@hotmail.com


var Slider = (function(){
// internal variables;
    var currentOffset = 0,
        transitionTimeInMs = 500,
        boxHeightInPx = 650,
        boxWidthInPx = 750,
        controlHeightInPx = 20,
        imageCount = 0,
        currentIndex = 1;
        
   
   function SlideImage(direction)
   {
       var offset = 0;
       var leftCurrent = currentOffset;
       var leftNew = leftCurrent;

       if (direction == "right") {
           if (Math.abs(currentOffset) >= boxWidthInPx * (imageCount-1)) {
               return;
           }
           offset = -1 * boxWidthInPx;
           currentIndex++;
       }
       else if (direction == "left") {
           if (currentOffset == 0) {
               return;
           }
           offset = boxWidthInPx;
           currentIndex--;
       }

       leftNew = leftCurrent + offset;
       currentOffset += offset;
        // animate images to slide them in position.
        $("#slides-window").animate({'margin-left': leftNew+"px"}, transitionTimeInMs, "linear", function(){});
        
        UpdateImageCountLabel();
   }
   
   function UpdateImageCountLabel()
   {
        $("#slider-current-count").empty();
        $("#slider-current-count").html(currentIndex + " of " + imageCount);
   }
   
    // public interface
    return {
        Initialize: function (galleryList) {

            // reset offsets used by the slider and get ready to display the slider
            currentOffset = 0;
            imageCount = 0;
            currentIndex = 1;
            $("#slides-window").css({'margin-left':'0px'});
            $("#slider-slide-right").unbind("click"); // to ugly to check for existing handler so just unbind...
            $("#slider-slide-left").unbind("click");
            
            // first clear all children, if there are any
            $("#slides-window").empty();
            
            // since script is running we can disable styles the 'no javascript' styles
            $("#slides-container").css(
                {
                    overflow: 'hidden',
                    height: boxHeightInPx + controlHeightInPx + "px"
                });

            // load all images
            var galleryLen = galleryList.length;
            imageCount = galleryLen;

            // first have to set the slides-window width
            $("#slides-window").width((galleryLen * boxWidthInPx) + "px");

            for(var i = 0; i<galleryLen; i++)
            {
                $("<div>")
                    .addClass("slideElement")
                    .append($("<img>")
                                .addClass("slide-image")
                                .load(function(e){ Slider.ComputePadding(e.target);})
                                .attr("src", galleryList[i].ImageUrl))
                    .appendTo($("#slides-window"));
            }

            // compute padding for all the loaded images so they are centered in their
            // container using padding. The padding color will be set to the background 
            // color of the slidesElement
            // $(".slideElement").each(function (i, e) { Slider.ComputePadding(e); });

            // handler for the left and right buttons
            $("#slider-slide-right").click(function () { SlideImage("right"); });
            $("#slider-slide-left").click(function () { SlideImage("left"); });
            
            UpdateImageCountLabel();
        },
        ComputePadding: function (e)
        {
            //var w = $(e).children("img").first().width();
            //var h = $(e).children("img").first().height();
            var w = $(e).width();
            var h = $(e).height();

            // compute padding to center vertically
            if (h < boxHeightInPx)
            {
                var tPad = (boxHeightInPx-h)/2
                var bPad = boxHeightInPx-h-tPad;
                if (tPad > 0)
                {
                    $(e).css({'padding-top': tPad + "px"});
                }
            
                if (bPad > 0)
                {
                    $(e).css({'padding-bottom': bPad + "px"});
                }
            }
        
            // compute padding to center horizontally
            if (w < boxWidthInPx)
            {
                var lPad = (boxWidthInPx-w)/2;
                var rPad = boxWidthInPx - w - lPad;
                if (lPad > 0)
                {
                    $(e).css({'padding-left': lPad + "px"});
                }
            
                if (rPad > 0)
                {
                    $(e).css({'padding-right': rPad + "px"});
                }
            }
        }
    };
}());


$(document).ready(function(){

    // var galleryJsonUrl = "images/Studio7/gallerymetadata.json";
    // var galleryJsonUrl = "images/Random/gallerymetadata.json";
    // var galleryJsonUrl = "images/NonConcert/gallerymetadata.json";
    
    
    // download gallery JSON
    //$.getJSON(galleryJsonUrl)
    //    .done(function(result){

    //    Slider.Initialize(result.GalleryEntries)

    //}).error(function(result){
        // todo: handle error            
    //});
  

});