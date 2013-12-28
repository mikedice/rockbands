// sitecontroller.js
// copyright 2014, mikedice417@hotmail.com

var SiteController = (function(){

    var currentGalleryImageList = null;
    
    // public interface
    return {
        Initialize: function(){
            
            // Load the gallery list
            $.getJSON("images/galleryIndex.json")
            .done(function(result){
                var list = result;
                SiteView.Initialize(list);        
            }).error(function(result){
                
            });
        },
        ShowGallery: function(galleryJsonUrl)
        {
            // download gallery JSON
            $.getJSON(galleryJsonUrl)
                .done(function(result){

                currentGalleryImageList = result;

                // download partial view for gallery and tell the site view
                // to switch the splash screen
                $.ajax({
                    url: "gallery-partial.html"
                }).done(function(result){
                    SiteView.SetGalleryView(result, currentGalleryImageList);    
                }).error(function(result){
                    // todo: handle error            
                });

            }).error(function(result){
                // todo: handle error            
            });
        },
        
        HomeLinkClicked: function()
        {
            alert("show home content");
        },
        
        ContactUsLinkClicked: function()
        {
            alert("contact us link clicked");
        }
        
    };
}());


// ViewController will load data, populate the model 
// and render the view  after the doc is loaded.
$(document).ready(function(){
    
    SiteController.Initialize();
});