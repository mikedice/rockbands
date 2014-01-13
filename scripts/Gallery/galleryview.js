// galleryview.js
// copyright 2014, mikedice417@hotmail.com

var GalleryView = (function(){
   
    var speed = 2000;
    var pause = false;
 
    function rotate(element) {
        if (pause) {
            return;
        }
        
        rotateCommon(element);        
    }
    
    function rotateCommon(element){
        var $next_li = $(element).next('li').length ?
                       $(element).next('li') :
                       $('#rotator li:first');


        function rotateIt() {
            rotate($next_li);
        }        

        $(element).fadeOut(speed, function(){
            $($next_li).fadeIn(speed, function(){
                setTimeout(rotateIt, speed);
            });
        });
    }

   
    // public interface
    return {
        Initialize: function(galleryImageList){
            if (galleryImageList && galleryImageList.GalleryEntries.length > 0) {
                for (i=0; i<galleryImageList.GalleryEntries.length; i++)
                {
                    // Create a link in the image rotator list for every image
                    $("<li>").
                        attr("id", "photo_" + i).hide().
                        append("<img>").
                            appendTo("#rotator").
                                find('img').
                                    attr("src", galleryImageList.GalleryEntries[i].ImageUrl).
                                    addClass("rotator-image-item");
                                    
                    $("#rotator li:first").show();
                }
                
                
                $('#rotator_play_pause').click(function(){
                    if ($(this).html() === 'PAUSE') {
                        pause = true;
                        $(this).html("PLAY");
                    }else {
                        pause = false;
                        rotate("#rotator li:visible:first");
                        
                        $(this).html("PAUSE");
                    }
                
                    this.blur();
                    return false;
                });
                
                $('#rotator_next_image').click(function(){
                        if (!pause) {
                            return;
                        }
                        rotateCommon($("#rotator li:visible:first"));
                    });

                rotate($('#rotator li:visible:first'));
            }
        },

        InitializeThumbnails: function(galleryImageList)
        {
            // could be zero or more rows of three
            for (var i=0; i<galleryImageList.GalleryEntries.length; i++) {
                $anchor = $("<a>")
                    .addClass("thumbnail-anchor")
                    .attr

                var startGalleryCommand = "GalleryView.StartGallery('" + galleryImageList.GalleryEntries[i].ImageUrl +"')";;

                $img = $("<img>")
                    .attr("src", galleryImageList.GalleryEntries[i].ThumbnailUrl)
                    .attr("onClick", startGalleryCommand);

                $anchor.append($img);
                $("#thumbnails-container").append($anchor);
            }
        },

        
        InitializeThumbnailsOld: function(galleryImageList)
        {
            // rows of three
            var rowsOf3 = galleryImageList.GalleryEntries.length / 3;
            var remainderRow = galleryImageList.GalleryEntries.length % 3;
            var imageListIndex = 0;
            
            // could be zero or more rows of three
            for (var i=0; i<rowsOf3; i++) {
                var row = $("<tr>")
                    .addClass("thumbnail-table-row");
                    
                for (var n=0; n<3; n++)
                {
                    var cell = $("<td>")
                        .addClass("thumbnail-table-cell");
                    
                    cell.append("<img>")
                        .find("img")
                        .attr("src", galleryImageList.GalleryEntries[imageListIndex++].ThumbnailUrl);
                    row.append(cell);
                }
                row.appendTo("#thumbs-table");
            }
            
        }
    };
}());