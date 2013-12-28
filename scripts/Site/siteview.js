// siteview.js
// copyright 2014, mikedice417@hotmail.com

var SiteView = (function(){
   
    // public interface
    return {
        Initialize: function(galleryList){
            if (galleryList) {
                for (i = 0; i<galleryList.length; i++)
                {
                    var onclickHandler = "SiteController.ShowGallery('" + galleryList[i].Url + "');";
                    // Create a link in gallery menu for each item
                    // in the gallery list.
                    // TODO: need to store a gallery name
                    $("<li>").
                        append("<a>").
                            appendTo("#gallery-menu").
                                find('a').
                                    attr("id", "gallery-list-anchor").
                                    attr("href", "#").
                                    attr("onClick", onclickHandler).
                                    html("Gallery 1");
                }
            }
        },
        
        // This function switches the contents of the 'splash screen' section to the contents
        // supplied by the callery
        SetGalleryView: function(galleryHtml, galleryImageList)
        {
            $("#splash-screen").html(galleryHtml);
            GalleryView.Initialize(galleryImageList);
        }
    };
}());