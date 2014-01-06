// slides.js
// copyright 2014, mikedice417@hotmail.com


var Slider = (function(){

// internal variables;
var currentIndex=0,
    transitionTimeInMs = 500,
    boxHeightInPx = 650,
    boxWidthInPx = 750;
   
   
   function ComputePadding(e)
   {
        var w = e.children("img").width();
        var h = e.children("img").height();

        // compute padding to center vertically
        if (h < boxHeightInPx)
        {
            var tPad = (boxHeightInPx-h)/2
            var bPad = boxHeightInPx-h-tPad;
            if (tPad > 0)
            {
                e.css({'padding-top': tPad + "px"});
            }
            
            if (bPad > 0)
            {
                e.css({'padding-bottom': bPad + "px"});
            }
        }
        
        // compute padding to center horizontally
        if (w < boxWidthInPx)
        {
            var lPad = (boxWidthInPx-w)/2;
            var rPad = boxWidthInPx - w - lPad;
            if (lPad > 0)
            {
                e.css({'padding-left': lPad + "px"});
            }
            
            if (rPad > 0)
            {
                e.css({'padding-right': rPad + "px"});
            }
        }
   }
   
   function SlideImage()
   {
        // calculate next image index
        var sld  = $('#slider li'),
        imgs = sld.length;

        currentIndex++;
        if(currentIndex == imgs){
            currentIndex = 0;
        }
        
        // place the next image to be displayed to the left and
        // compute its padding
        var nextElement = sld.eq(currentIndex);
        var prevElement = sld.eq(currentIndex-1);
        nextElement.css({'left': (-1 * boxWidthInPx)+"px"});
        ComputePadding(nextElement);
        
        // animate images to slide them in position.
        prevElement.animate({'left': boxWidthInPx+"px"}, transitionTimeInMs, "swing", function(){});
        nextElement.animate({'left': '0px'},transitionTimeInMs, "swing", function(){});
   }
   
    // public interface
    return {
        Initialize: function(galleryList){
            
            // handler for the 'Next button'
            $("#doAnimate").click(function(){SlideImage();});
            
            for (var i = 0;i<galleryList.length;i++)
            {
                $("<li>").append(
                    $("<img>").attr("src", galleryList[i].ImageUrl))
                    .appendTo("#slider-list");
            }
            
            ComputePadding($('#slider li').first());
        }
       
    };
}());


$(document).ready(function(){

    var galleryJsonUrl = "images/Studio7/gallerymetadata.json";
    
    $("#doAnimate").click(function(){
    })
    
    // download gallery JSON
    $.getJSON(galleryJsonUrl)
        .done(function(result){

        Slider.Initialize(result.GalleryEntries)

    }).error(function(result){
        // todo: handle error            
    });
    

});