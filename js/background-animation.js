const slideContainer = document.querySelector('.slides');
var slidePosition = 1;
let slidesURL = [
	'img/Animados/bogota.svg',

	'img/Animados/chicago.svg',

	'img/Animados/hong_kong.svg',

	'img/Animados/Japon.svg',

	'img/Animados/lima.svg',

	'img/Animados/londres.svg',

	'img/Animados/new_york.svg',

	'img/Animados/rio_janeiro.svg',

	'img/Animados/roma.svg',

	'img/Animados/toronto_.svg',
];
var slides;
let backgroundCounter = 3;

// insert first thre slides
for (i = 0; i <= 2; i++) {
	slideTemplate(slidesURL[i]);
}
const slideWidth = document.querySelector('.slide').clientWidth;

function slideBackground() {
	if (slidePosition % slideWidth === 0) {
		slidePosition = slidePosition - slideWidth;
		insertDelete();
	}
	slideContainer.style.transform = `translateX(${-slidePosition}px)`;
	slidePosition += 1;
}

function insertDelete() {
	slides = document.querySelectorAll('.slide');
	slides[0].remove();
	slideTemplate(slidesURL[backgroundCounter]);
	if (backgroundCounter == slidesURL.length - 1) {
		backgroundCounter = 0;
	} else {
		backgroundCounter++;
	}
}

function slideTemplate(slideURL) {
	var tag = document.createElement('div');
	tag.innerHTML = `
			<object type="image/svg+xml" data=${slideURL}></object>
			`;

	tag.classList.add('slide');

	slideContainer.appendChild(tag);
}

setInterval(slideBackground, 10);
