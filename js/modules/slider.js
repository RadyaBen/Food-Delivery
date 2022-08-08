function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {

	let offset = 0;
	// Current position in the slider; set to 1 because the countdown starts from 1
	let slideIndex = 1;

	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		previous = document.querySelector(prevArrow),
		next = document.querySelector(nextArrow),
		total = document.querySelector(totalCounter),
		current = document.querySelector(currentCounter),
		slidesWrapper = document.querySelector(wrapper),
		width = window.getComputedStyle(slidesWrapper).width,
		slidesField = document.querySelector(field);

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	// Put all the slides on the page inside a variable
	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	// Hide all elements that are not in scope
	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		// Slides of the same width
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	// Create a wrapper for our dots and style it
	const indicators = document.createElement('ol'),
		dots = [];
	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
	 `;

	slider.append(indicators);

	// Create the number of dots based on the number of slides
	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
		  `;
		// A first point will be active, and all others will be set to opacity
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	// Remove non-numbers (i.e. px) and replace them with an empty string
	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener('click', () => {
		// Consider a final option
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			// Back to the very beginning when scroll to the end
			offset = 0;
			// Add an offset
		} else {
			offset += deleteNotDigits(width); // '500'
		}
		// When the forward button is pressed, the slide will move
		slidesField.style.transform = `translateX(-${offset}px)`;


		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	});

	previous.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			// If it was not the first slide, then subtract the width of the slide on which it is shifted
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	});

	dots.forEach(dot => {
		// Гse an event object because each dot has a slide.to attribute
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			// For example, clicked on the fourth dot, four will go to slideIndex
			slideIndex = slideTo;
			// Remove non-numbers
			offset = deleteNotDigits(width) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			// Current slide
			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = '.5');
			dots[slideIndex - 1].style.opacity = 1;
		});
	});



	// начальная структура нашего слайда
	// showSlides(slideIndex);

	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// // n - слайд индекс
	// function showSlides(n) {
	// 	// количество слайдов, ко-ые есть в верстке
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	// операция в отрицательную сторону
	// 	if (n < 1) {
	// 		slideIndex = slides.length; // 4, 3, 2, 1
	// 	}

	// 	slides.forEach(item => item.style.display = 'none');

	// 	// если будет первый слайд, то мы показываем нулевой
	// 	slides[slideIndex - 1].style.display = 'block';

	// 	// изменяется нащ счетчик
	// 	if (slides.length < 10) {
	// 	current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// 	function plusSlides(n) {
	// 		// 1. Если приходит единица в правую часть, то оно просто добавляется в левую часть
	// 		// 2 Если приходит минус единица, то оно будет отнимать от slideIndex единицу
	// 		showSlides(slideIndex += n);
	// 	}

	// 	previous.addEventListener('click', () => {
	// 		plusSlides(-1);
	// 	});

	// 	next.addEventListener('click', () => {
	// 		plusSlides(1);
	// });

}

export default slider;