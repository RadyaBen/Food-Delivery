// Remove the hide class, if suddenly it has already appeared
// It may appear when we close the modal window
function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');

	document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');

	document.body.style.overflow = 'hidden';

	if (modalTimerId) {
		// If the user himself opened the mod. window, then clear this interval
		clearInterval(modalTimerId);
	}
}

function modal(triggerSelector, modalSelector, modalTimerId) {

	const modalTrigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);
	// modalCloseBtn = document.querySelector('[data-close');

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	// If there was a click on the background, or on some kind of cross, then the modal window will close
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == "") {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	function showModalByScroll() {
		// If the visible part without any scroll will be greater than or equal to the right
		// parts, it means that a user has scrolled to the end
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	// If a user has scrolled to the end, a modal window will be shown
	window.addEventListener('scroll', showModalByScroll);
}

export {
	closeModal,
	openModal
};

export default modal;