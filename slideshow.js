var slideshow = {
	pos: null,
	totalSlides: null,
	sliderWidth: null,

	buildSlider: function () {
		slideshow.pos = 0;
		slideshow.totalSlides = document.querySelectorAll('#slider_wrap img').length - 2;
		//? Get the width of one slider
		slideshow.sliderWidth = document.querySelector('#slider_wrap img').width;

		//? Set the slider width which contains all slides - sliderWidth * totalSlides
		document.querySelector('#slider_wrap #slider').style.width = `${slideshow.sliderWidth * slideshow.totalSlides}px`;

		//? Next slide click listener	
		document.querySelector('#next').addEventListener("click", slideshow.slideRight);

		//? Previous slide click listener
		document.querySelector('#previous').addEventListener("click", slideshow.slideLeft);

		//? For each slide 
		document.querySelectorAll("#slider_wrap ul li").forEach(element => {
			//? Create a pagination
			var li = document.createElement('li');
			document.querySelector('#pagination_wrap ul').appendChild(li);
		})

		//? Initialize first pagination
		slideshow.pagination();
	},

	slideLeft: function () {
		slideshow.pos--;
		if (slideshow.pos == -1) { slideshow.pos = slideshow.totalSlides - 1; }
		document.querySelector('#slider').style.left = -(slideshow.sliderWidth * slideshow.pos) + 'px';
		slideshow.pagination();
	},

	slideRight: function () {
		slideshow.pos++;
		if (slideshow.pos == slideshow.totalSlides) { slideshow.pos = 0; }
		document.querySelector('#slider').style.left = -(slideshow.sliderWidth * slideshow.pos) + 'px';
		slideshow.pagination();
	},

	pagination: function () {
		//? For each page
		document.querySelectorAll('#pagination_wrap ul li').forEach(element => {
			//? Remove active class
			element.classList.remove('active');
		})
		//? Add class active to the page that's at 'pos'
		document.querySelector("#pagination_wrap ul").children[slideshow.pos].classList.add('active');
	},
	
	destroySlideshow: function () {
		document.getElementById("slider").style.left = 0;
		document.querySelector('#next').removeEventListener("click", slideshow.slideRight);
		document.querySelector('#previous').removeEventListener("click", slideshow.slideLeft);
		document.querySelector('#pagination_wrap ul').innerHTML = "";
		document.querySelector('#slider').innerHTML = "";
	}
}