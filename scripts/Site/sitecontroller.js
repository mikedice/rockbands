// sitecontroller.js
// copyright 2014, mikedice417@hotmail.com

var SiteController = (function(){

    var currentGalleryImageList = null;
    var myTumblrApiKey = "8MWvCeFxkM3y1VY2WdfISKfrD5cNN06QCeiYhHTMZpTvtcgJbr";
    //var myTumblrBlogUri = "inthecompanyofwolvess.tumblr.com";
    var myTumblrBlogUri = null;
    
    function BlogJsonLoaded(blogJson) {

        // enumerate blogJson.response.posts. See tumblr api docs for format
        // if there are articles to show then $("#blog-feed-container").show();
    }
    
    // public interface
    return {
        Initialize: function(){

            // hide blog feed unless there are articles to display
            $("#blog-feed-container").hide();
            
            if (myTumblrBlogUri != null) {
                
                // try to load blog list. use jsonp
                $.ajax({
                    url: "http://api.tumblr.com/v2/blog/" + myTumblrBlogUri + "/posts",
                    data: {
                        "api_key": myTumblrApiKey
                    },
                    dataType: "jsonp",
                    jsonp: "jsonp"
                 }).success(BlogJsonLoaded);
            }
            // Load the gallery list
            $.getJSON("images/galleryIndex.json")
            .done(function(result){
                var list = result;
                GalleryMenuSlider.Initialize(list);
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

            }).error(function(result){
                // todo: handle error            
            });
        },
        
        ShowThumbnails: function(galleryJsonUrl)
        {
            // download gallery JSON
            $.getJSON(galleryJsonUrl)
                .done(function(result){

                currentGalleryImageList = result;

                // download partial view for gallery and tell the site view
                // to switch the splash screen
                $.ajax({
                    url: "gallery-thumbnail.html"
                }).done(function(result){
                    SiteView.SetThumbnailView(result, currentGalleryImageList);    
                }).error(function(result){
                    // todo: handle error            
                });
            });
        },
        HomeLinkClicked: function()
        {
            SiteView.ShowHomePage();
        },
        ContactUsLinkClicked: function()
        {
            alert("Created Jan 11, 2014 - mikedice417@hotmail.com");
        }
    };
}());


// ViewController will load data, populate the model 
// and render the view  after the doc is loaded.
$(document).ready(function(){
    
    SiteController.Initialize();
});