import { getResource } from '../services/services';

function cards() {

	class MenuCard {
		// Classes are formed through rest-operator
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 28;
			this.changeToUAH();
		}

		// Method for converting
		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				// Here, before the menu_item entry, an empty array
				// The default class that will be written to the property is this.element
				this.classes = "menu__item";
				element.classList.add(this.classes);
			} else {
				// Go through each element inside, pull out the name of this class and connect to a new div
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
			this.parent.append(element);
		}
	};

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({ img, altimg, title, descr, price }) => {
				// This constructor will be created as many times as there are elements inside the menu array
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});
}

export default cards;