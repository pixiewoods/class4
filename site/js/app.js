$(document).ready(function(){

	$(".menus h3").on("click", function(e){
		console.log("hi");
		$(this).next("ul").toggleClass("open");
		return false;
	});

	var breakpoints = [
	{breakfour: "1050px" }, 
	{breakthree: "760px" }, 
	{breaktwo: "520px" }, 
	{breakone: "360px" }
	];

	var $window = $(window);
	var width = $window.width();
	checkWidth();

	$(window).resize (function(){
		width = $window.width();
	//	console.log(width);
		checkWidth();
	});
	function checkWidth(){
		if (width >= 1050){
			$(".showBreakpoint").val("$break-four: 1050px or higher. Current: " + $window.width());
		} else if (width >= 760) {
			$(".showBreakpoint").val("$break-three: 760px or higher. Current: " + $window.width());
		} else if (width >= 520) {
			$(".showBreakpoint").val("$break-two: 520px or higher. Current: " + $window.width());
		} else if (width >= 360) {
			$(".showBreakpoint").val("$break-one: 360px or higher. Current: " + $window.width());
		};
	};
});

// visibleHeight grabs the window height and subtracts that from the overall document height leaving the height of the area that is currently visible in the users' browser

var visibleHeight = $(document).height() - $(window).height();
var items;

storeElements();
 
$(window).on('resize', function(e) {
    updateHeight();
});
 
$(window).on('scroll', function(e) {
    loadContent();
});

function storeElements() {
    items = $('.portfolio-item:lt(3)').clone();
    //Strip the first class from selection
    items.removeClass('first');
}

function updateHeight() {
    visibleHeight = $(document).height() - $(window).height();
    console.log("Visible height: " + visibleHeight);
}

function loadContent() {
 // Check if the scroll position is more than (scrolled past) or equal to (currently at) visibleHeight
    if($(window).scrollTop() >= visibleHeight) {
 // If it is, remove the scroll event handler from the window so we can process the content
        $(window).unbind('scroll');
 // Cache loading-wrap for use later        
        var loadingWrap = $('.loading-wrap');
 //Fade loading-wrap in and once the fade completes...        
        loadingWrap.fadeIn(function() {
            // ...set a small Timeout to simulate "loading" the content
            setTimeout(function() {
                // Attach our cloned items before the loading-wrap. This will slot in nicely between the loading icon and the current portfolio-items
                loadingWrap.before(items);
                // Hide loading-wrap and once hidden updateHeight, storeElements and re-attach the scroll event to the window with instructions to run this function again
                loadingWrap.hide(function() {
                    updateHeight();
                    storeElements();
                    $(window).on('scroll', function() { loadContent(); });
                });
            }, 500);
        });
 
    }
}