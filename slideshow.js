function BuildSlider() {
	var pos = 0;
	// Count the slides
	var totalSlides = document.querySelectorAll('#slider_wrap img').length - 2;
	// Get the width of one slider
	var sliderWidth = document.querySelector('#slider_wrap img').width;

	/*****************
	  BUILD THE SLIDER
	*****************/

	// Set the slider width which contains all slides - sliderWidth * totalSlides
	document.querySelector('#slider_wrap #slider').style.width = `${sliderWidth * totalSlides}px`;


	// Next slide 	
	document.querySelector('#next').addEventListener("click", function () {
		slideRight();
	});

	// Previous slide
	document.querySelector('#previous').addEventListener("click", function () {
		slideLeft();
	});


	// For each slide 
	document.querySelectorAll("#slider_wrap ul li").forEach(element => {
		// Create a pagination
		var li = document.createElement('li');
		document.querySelector('#pagination_wrap ul').appendChild(li);
	})

	// Pagination
	pagination();



	
	// Slide left
	function slideLeft() {
		pos--;
		if (pos == -1) { pos = totalSlides - 1; }
		document.querySelector('#slider').style.left = -(sliderWidth * pos) + 'px';
		pagination();
	}

	// Slide right
	function slideRight() {
		pos++;
		if (pos == totalSlides) { pos = 0; }
		document.querySelector('#slider').style.left = -(sliderWidth * pos) + 'px';
		pagination();
	}

	// Pagination
	function pagination() {
		// For each page
		document.querySelectorAll('#pagination_wrap ul li').forEach(element => {
			// Remove active class
			element.classList.remove('active');
		})
		// Add class active to the page that's at 'pos'
		document.querySelector("#pagination_wrap ul").children[pos].classList.add('active');
	}
}

function destroySlideshow() {
	document.querySelector('#pagination_wrap ul').innerHTML = "";
	document.querySelector('#slider').innerHTML = "";
}