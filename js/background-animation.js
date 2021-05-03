const slide = document.querySelector('.slides');
var slidePosition = 1;
let slides = document.querySelectorAll('.slide');
const slideWidth = slides[0].clientWidth;
let counter = 0;

function slideBackground() {
	if (slidePosition % slideWidth === 0) {
		slides = document.querySelectorAll('.slide');
		var newSlide = slides[counter].cloneNode(true);
		slides[0].remove();
		slide.appendChild(newSlide);
		slidePosition = slidePosition - slideWidth;
	}
	slide.style.transform = `translateX(${-slidePosition}px)`;
	slidePosition += 0.5;
}

setInterval(slideBackground, 100);
