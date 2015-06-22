$(function(){

	$(".menus h3").on("click", function(e){
		console.log("hi");
		$(this).next("ul").toggleClass("open");
		return false;
	});

});