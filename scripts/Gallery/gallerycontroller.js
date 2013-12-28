// gallerycontroller.js
// copyright 2014, mikedice417@hotmail.com

var GalleryController = (function(){
   
    // public interface
    return {

        // this function initializes the gallery partial view
        // contents
        Initialize: function(galleryImageList){
            galleryImageList.each(function(index, imageEntry){
                
                // make a new LI and add it to the rotator
                $("<li>").attr("id", "photo_" + index).
                     append("<img>").
                        appendTo("#rotator").
                        find("img").
                        attr("src", imageEntry.Url);
                
            })
        },
    };

}());