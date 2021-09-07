//current position
var pos = 0;
//number of slides
var totalSlides = $('#slider_wrap img').length - 2;
//get the slide width
var sliderWidth = $('#slider_wrap img').width();

$(document).ready(function () {

	// var images = function () {
	// 	for (const li of document.getElementById('slider').childNodes) {
	// 		for (const image of li.childNodes) {
	// 			console.log(image);
	// 			return image;
	// 		}
	// 	}
	// }

	/*****************
	 BUILD THE SLIDER
	*****************/
	//set width to be 'x' times the number of slides
	$('#slider_wrap #slider').width(sliderWidth * totalSlides);

	//next slide 	
	$('#next').click(function () {
		slideRight();
	});

	//previous slide
	$('#previous').click(function () {
		slideLeft();
	});

	/*************************
	 //*> OPTIONAL SETTINGS
	************************/
	//for each slide 
	$.each($('#slider_wrap ul li'), function () {
		//create a pagination
		var li = document.createElement('li');
		$('#pagination_wrap ul').append(li);
	});

	//counter
	countSlides();
	//pagination
	pagination();
});//DOCUMENT READY

/***********
 SLIDE LEFT
************/
function slideLeft() {
	pos--;
	if (pos == -1) { pos = totalSlides - 1; }
	$('#slider_wrap ul#slider').css('left', -(sliderWidth * pos));

	//*> optional
	countSlides();
	pagination();
}


/************
 SLIDE RIGHT
*************/
function slideRight() {
	pos++;
	if (pos == totalSlides) { pos = 0; }
	$('#slider_wrap ul#slider').css('left', -(sliderWidth * pos));

	//*> optional 
	countSlides();
	pagination();
}

/************************
 //*> OPTIONAL SETTINGS
************************/
function countSlides() {
	$('#counter').html(pos + 1 + ' / ' + totalSlides);
}

function pagination() {
	$('#pagination_wrap ul li').removeClass('active');
	$('#pagination_wrap ul li:eq(' + pos + ')').addClass('active');
}