// slides2.js
// copyright 2014, mikedice417@hotmail.com


var GalleryMenuSlider = (function(){
// internal variables;
    var currentOffset = 0,
        transitionTimeInMs = 500,
        boxHeightInPx = 60,
        boxWidthInPx = 300,
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
        $("#gallery-menu-slides-window").animate({'margin-left': leftNew+"px"}, transitionTimeInMs, "linear", function(){});
   }
   
    // public interface
    return {
        Initialize: function (galleryList) {

            // since script is running we can disable styles the 'no javascript' styles
            $("#gallery-menu-slides-container").css(
                {
                    overflow: 'hidden',
                    height: boxHeightInPx + "px"
                });

            // load all images
            var galleryLen = galleryList.length;
            imageCount = galleryLen;

            // first have to set the slides-window width
            $("#gallery-menu-slides-window").width((galleryLen * boxWidthInPx) + "px");

            for(var i = 0; i<galleryLen; i++)
            {
                $("<div>")
                    .addClass("gallery-menu-slideElement")
                    .append($("<div>")
                            .attr("id", "gallery-menu-item-title" + i)
                            .addClass("gallery-menu-item-title")
                            .html(galleryList[i].GalleryTitle)
                           )
                    .append($("<a>")
                            .html("View Gallery")
                            .addClass("gallery-menu-item-gallery-link")
                            .attr("onClick", "GalleryMenuSlider.GalleryMenuItemClick('" + galleryList[i].Url + "')")
                            )
                    .append($("<a>")
                            .html("Thumbnails")
                            .addClass("gallery-menu-item-thumbs-link")
                            .attr("onClick", "GalleryMenuSlider.ThumbsMenuItemClick('" + galleryList[i].Url + "')")
                           )
                    .appendTo($("#gallery-menu-slides-window"));
            }

            // handler for the left and right buttons
            $("#gallery-menu-slideRight a").click(function () { SlideImage("right"); });
            $("#gallery-menu-slideLeft a").click(function () { SlideImage("left"); });
        },
        ComputePadding: function (e)
        {
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
        },
        GalleryMenuItemClick: function(galleryJsonUrl) {
            SiteView.ShowGallery(galleryJsonUrl);
        },
       ThumbsMenuItemClick: function(galleryJsonUrl) {
            SiteView.ShowGallery(galleryJsonUrl);
        }
    };
}());
