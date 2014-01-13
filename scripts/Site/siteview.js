// siteview.js
// copyright 2014, mikedice417@hotmail.com

var SiteView = (function(){


    function BeginShowGallery(galleryJsonUrl)
    {
            $.getJSON(galleryJsonUrl)
            .done(function(result){
                var list = result;
                EndShowGallery(list);                
            })
            .error(function(result){
                
            });
    }
    
    function EndShowGallery(galleryImageList)
    {
        $("#splash-screen").hide();
        Slider.Initialize(galleryImageList.GalleryEntries);
        $("#slides-container").show();
    }

    // public interface
    return {
        Initialize: function(galleryList){
            

        },
        
        // This function switches the contents of the 'splash screen' section to the contents
        // supplied by the callery
        SetGalleryView: function(galleryHtml, galleryImageList)
        {
            $("#splash-screen").html(galleryHtml);
            GalleryView.Initialize(galleryImageList);
        },
        
        // This function switches the contents of the 'splash screen' section to the contents
        // supplied by the callery
        SetThumbnailView: function(galleryHtml, galleryImageList)
        {
            $("#splash-screen").html(galleryHtml);
            GalleryView.InitializeThumbnails(galleryImageList);
        },

        ShowGallery: function(galleryJsonUrl)
        {
            BeginShowGallery(galleryJsonUrl);
        },
        
        ShowHomePage: function()
        {
            $("#slides-container").hide();
            $("#splash-screen").show();
        }
    };
}());