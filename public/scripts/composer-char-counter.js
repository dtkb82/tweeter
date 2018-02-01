$(document).ready(function(){
	$(".new-tweet textarea").on("keyup", function() {
	 var count = $(this).val().length
	var max = 140;
	var left = max - count;
	var button = $(this).siblings("span.counter");
	button.text(left)

	if (left < 0) {
		document.getElementById("counter").style.color = "red"; 
	} else {
		document.getElementById("counter").style.color = "black"; 
	}

})
	
});


