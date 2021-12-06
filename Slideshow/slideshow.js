var slideshow = {
	pos: null,
	totalSlides: null,
	sliderWidth: null,

	buildSlider: function () {
		slideshow.pos = 0;
		slideshow.totalSlides = document.querySelectorAll('.slider img').length - 2;
		//? Get the width of one slides
		slideshow.sliderWidth = document.querySelector('.slider img').width;

		//? Set the slides width which contains all slider - sliderWidth * totalSlides
		document.querySelector('.slider__slides').style.width = `${slideshow.sliderWidth * slideshow.totalSlides}px`;

		//? Next slide click listener	
		document.querySelector('.slider__btns--next').addEventListener("click", function () {
			slideshow.slideRight();
			//? Stop automatic switching
			clearInterval(autoSlider);
		});

		//? slider__previous slide click listener
		document.querySelector('.slider__btns--previous').addEventListener("click", function () {
			slideshow.slideLeft();
			//? Stop automatic switching
			clearInterval(autoSlider);
		});

		//? For each slide 
		for (let i = 0; i < document.querySelectorAll(".slider__slides li").length; i++) {
			//? Create a pagination
			var li = document.createElement('li');
			document.querySelector('.slider__pagination_wrap ul').appendChild(li);
		}

		//? Initialize first pagination
		slideshow.pagination();
	},

	slideLeft: function () {
		slideshow.pos--;
		if (slideshow.pos == -1) { slideshow.pos = slideshow.totalSlides - 1; }
		document.querySelector('.slider__slides').style.left = -(slideshow.sliderWidth * slideshow.pos) + 'px';
		slideshow.pagination();
	},

	slideRight: function () {
		slideshow.pos++;
		if (slideshow.pos == slideshow.totalSlides) { slideshow.pos = 0; }
		document.querySelector('.slider__slides').style.left = -(slideshow.sliderWidth * slideshow.pos) + 'px';
		slideshow.pagination();
	},

	pagination: function () {
		//? For each page
		document.querySelectorAll('.slider__pagination_wrap ul li').forEach(element => {
			//? Remove active class
			element.classList.remove('slider__pagination_wrap--active');
		})
		//? Add class active to the page that's at 'pos'
		document.querySelector(".slider__pagination_wrap ul").children[slideshow.pos].classList.add('slider__pagination_wrap--active');
	},

	resize: function () {
		slideshow.sliderWidth = document.querySelector('.slider img').width;
		document.querySelector('.slider__slides').style.width = `${slideshow.sliderWidth * slideshow.totalSlides}px`;
	}

	// destroySlideshow: function () {
	// 	document.getElementById("slider__slides").style.left = 0;
	// 	document.querySelector('.slider__next').removeEventListener("click", slideshow.slideRight);
	// 	document.querySelector('.slider__previous').removeEventListener("click", slideshow.slideLeft);
	// 	document.querySelector('.slider__pagination_wrap ul').innerHTML = "";
	// 	document.querySelector('.slider__slides').innerHTML = "";
	// }
};
window.addEventListener('DOMContentLoaded', slideshow.buildSlider);



let autoSlider = setInterval(slideshow.slideRight, 3000);
