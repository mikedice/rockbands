// slides2.js
// copyright 2014, mikedice417@hotmail.com


var Slider = (function(){
// internal variables;
    var currentOffset = 0,
        transitionTimeInMs = 500,
        boxHeightInPx = 650,
        boxWidthInPx = 750,
        imageCount = 0;
   
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
       }
       else if (direction == "left") {
           if (currentOffset == 0) {
               return;
           }
           offset = boxWidthInPx;
       }

       leftNew = leftCurrent + offset;
       currentOffset += offset;
        // animate images to slide them in position.
        $("#slides-window").animate({'margin-left': leftNew+"px"}, transitionTimeInMs, "linear", function(){});
   }
   
    // public interface
    return {
        Initialize: function (galleryList) {

            // since script is running we can disable styles the 'no javascript' styles
            $("#slides-container").css(
                {
                    overflow: 'hidden',
                    height: boxHeightInPx + "px"
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
                                .attr("src", galleryList[i].ImageUrl))
                    .appendTo($("#slides-window"));
            }

            // compute padding for all the loaded images so they are centered in their
            // container using padding. The padding color will be set to the background 
            // color of the slidesElement
            $(".slideElement").each(function (i, e) { Slider.ComputePadding(e); });

            // handler for the left and right buttons
            $("#slideRight").click(function () { SlideImage("right"); });
            $("#slideLeft").click(function () { SlideImage("left"); });
        },
        ComputePadding: function (e)
        {
            var w = $(e).children("img").first().width();
            var h = $(e).children("img").first().height();

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
    var galleryJsonUrl = "images/NonConcert/gallerymetadata.json";
    
    
    // download gallery JSON
    $.getJSON(galleryJsonUrl)
        .done(function(result){

        Slider.Initialize(result.GalleryEntries)

    }).error(function(result){
        // todo: handle error            
    });
  

});