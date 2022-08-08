// The task of the function is to get the difference between dates
function timer(id, deadline) {
	function getTimeRemaining(endtime) {
		// Get the number of milliseconds in time
		const t = Date.parse(endtime) - Date.parse(new Date()),
			// Get number of days in milliseconds
			days = Math.floor((t / (1000 * 60 * 60 * 24))),
			// Get number of seconds in milliseconds
			seconds = Math.floor((t / 1000) % 60),
			// Get number of minutes in milliseconds
			minutes = Math.floor((t / 1000 / 60) % 60),
			// Get the total number of hours left until this timer
			hours = Math.floor((t / (1000 * 60 * 60) % 24));

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return '0' + num;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {

		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock(id, deadline);
}

export default timer;