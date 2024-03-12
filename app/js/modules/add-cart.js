function cart() {
	//
	// розмітка кошика
	const cartProduct = document.querySelector('#product-cart')
	const cartHTML = `<div class="cart">
					<div class="cart__body">
						<h5 class="cart__title">Ваше замовлення</h5>
						<div data-cart-empty class="cart__empty" role="alert">Кошик пустий</div>

						<!-- cart-wrapper -->
						<div id="cart-wrapper" class="cart__wrapper"></div>

						<!-- Стоимость заказа -->
						<div class="cart-total">
							<p class="none" data-delivery>
								<span class="cart__delivery">Доставка:</span>
								<span class="delivery-cost" id="delivery">безкоштовна</span> <br />
								<span class="delivery-span">бескоштовка при замовлені на 600грн</span>
							</p>
							<p>
								<span class="cart__delivery">Разом:</span>
								<span id="price-total" class="total-price">0</span>
								<span class="rouble">₴</span>
							</p>
						</div>
						<!-- // Стоимость заказа -->
					</div>

					<!-- Оформить заказ -->
					<div id="order-form" class="cart__form none">
						<h5 class="cart__form-title">Оформити замовлення</h5>
						<form>
							<div class="cart__form-group">
								<input
									type="tel"
									class="cart__form-control"
									placeholder="Ваш номер телефона"
								/>
							</div>
							<button type="submit" class="btn btn-primary">Замовити</button>
						</form>
					</div>
					<!-- // Оформить заказ -->
				</div>
				`

	cartProduct.insertAdjacentHTML('beforeend', cartHTML)

	//
	//
	// при наведенні на іконку кошика вспливає вікно в моб режимі
	if (window.innerWidth < 768) {
		const cartIcon = document.querySelector('#cart-icon')
		const cartIconModal = document.querySelector('#header-cart')

		cartIconModal.classList.add('none')
		cartIconModal.insertAdjacentHTML('beforeend', cartHTML)

		cartIcon.addEventListener('mouseover', () => {
			if (window.innerWidth < 768) {
				cartIconModal.classList.remove('none')
			}
		})

		cartIcon.addEventListener('mouseout', () => {
			if (window.innerWidth < 768) {
				cartIconModal.classList.add('none')
			}
		})

		// при зміні розміру екрана більше моб версії, видаляється блок кошика з спливаючего меню на іконці і обноваа сторінки
		window.addEventListener('resize', () => {
			if (window.innerWidth > 767) {
				cartIconModal.remove()
				window.location.reload()
			}
		})
	}

	//
	// фукнція яка перевіряє є чи нема замовлень в кошику
	function toggleCartStatus() {
		const cartWrapper = document.querySelector('#cart-wrapper')
		const cartEmpty = document.querySelector('[data-cart-empty]')
		const cartForm = document.querySelector('#order-form')
		const cartDelivery = document.querySelector('[data-delivery]')

		if (cartWrapper.children.length > 0) {
			// якщо є то скриває блок "кошик пустий"
			cartEmpty.classList.add('none')
			cartForm.classList.remove('none')
			cartDelivery.classList.remove('none')
		} else {
			// якщо немає, то добовляє що кошик пуст
			cartEmpty.classList.remove('none')
			cartForm.classList.add('none')
			cartDelivery.classList.add('none')
		}
	}

	// функція для підрахунку вартості та всіх замовлень в кошику для іконкі
	function priceCartAndDelivery() {
		const cartItems = document.querySelectorAll('.cart-item')
		let priceTotal = 0
		// для іконки
		const cartNumber = document.querySelector('#cart-number')
		let quantityTotal = 0

		cartItems.forEach(item => {
			const quantity = item.querySelector('[data-counter]')
			const price = item.querySelector('.cart__price__currency')
			const priceProduct =
				parseInt(quantity.innerText) * parseInt(price.innerText)

			priceTotal += priceProduct
			quantityTotal += parseInt(quantity.innerText)

			// віддображення кількості заказів на іконці
			cartNumber.innerText = quantityTotal
		})

		const cartPrice = document.querySelector('#price-total')
		const delivery = document.querySelector('#delivery')

		// доставка 250грн при заказі меньше 600грн
		if (priceTotal < 600 && priceTotal > 0) {
			delivery.innerText = '250 ₴'
			delivery.classList.remove('free')
			// віддображення ціни на сторінці
			cartPrice.innerText = priceTotal + 250

			// бескоштовна доставка
		} else if (priceTotal > 600) {
			delivery.innerText = 'безкоштовна'
			delivery.classList.add('free')
			// віддображення ціни на сторінці
			cartPrice.innerText = priceTotal
		}
	}

	//
	const cartWrapper = document.querySelector('#cart-wrapper')

	// клік по екрану
	window.addEventListener('click', event => {
		// якщо на + то добовляємо кількість
		if (event.target.dataset.action === 'plus') {
			const counterWrapper = event.target.closest('[data-wrapper]')
			const counter = counterWrapper.querySelector('[data-counter]')
			counter.innerText++

			// запуск функції суми та доставки
			priceCartAndDelivery()
		}
		// якщо на - то віднімаємо кількість
		if (event.target.dataset.action === 'minus') {
			const counterWrapper = event.target.closest('[data-wrapper]')
			const counter = counterWrapper.querySelector('[data-counter]')

			if (parseInt(counter.innerText) > 1) {
				counter.innerText--

				// якщо клік в кошику на мінус при 1 то видаляється замовлення з кошику
			} else if (
				event.target.closest('[data-wrapper]') &&
				parseInt(counter.innerText) === 1
			) {
				event.target.closest('.cart-item').remove()
				document.querySelector('#price-total').innerText = 0

				//запуск функції для перевірки що в кошике
				toggleCartStatus()
			}

			// запуск функції суми та доставки
			priceCartAndDelivery()
		}

		// при натиску на кнопку добавить в кошик, добовляем в кошик
		if (event.target.hasAttribute('data-btn')) {
			const addCartBtn = event.target.closest('#card')

			// создаємо об'єкт з даних
			const productInfo = {
				id: addCartBtn.dataset.id,
				imgSrc: addCartBtn.querySelector('.card__img').getAttribute('src'),
				title: addCartBtn.querySelector('.card__content-title').innerText,
				number: addCartBtn.querySelector('.card__content-number').innerText,
				quantity: addCartBtn.querySelector('[data-counter]').innerText,
				weight: addCartBtn.querySelector('.card__price-weight').innerText,
				price: addCartBtn.querySelector('.card__price-currency').innerText,
			}

			// пошук товара в кошику. якщо є додається кількість якщо ні, то вся картка
			const itemInCart = cartWrapper.querySelector(
				`[data-id="${productInfo.id}"]`
			)

			if (itemInCart) {
				const counterEl = itemInCart.querySelector('[data-counter]')
				counterEl.innerText =
					parseInt(counterEl.innerText) + parseInt(productInfo.quantity)
			} else {
				// создаємо розмітку для кошика
				const cartItemHTML = `			
					<div class="cart-item" data-id="${productInfo.id}">
					<div class="cart-item__top">
						<div class="cart-item__img">
							<img src="${productInfo.imgSrc}" alt="" />
						</div>
						<div class="cart-item__desc">
							<div class="cart-item__title">${productInfo.title}</div>
							<div class="cart-item__weight">${productInfo.number} / ${productInfo.weight}</div>

							<div class="cart-item__details">
								<div class="cart__counter-wrapper" data-wrapper>
									<div class="cart__control" data-action="minus">-</div>
									<div class="cart__current" data-counter>${productInfo.quantity}</div>
									<div class="cart__control" data-action="plus">+</div>
								</div>

								<div class="cart__price">
									<div class="cart__price__currency">${productInfo.price}</div>
								</div>
							</div>
						</div>
					</div>
				</div> `

				// добавляємо в кошик розмітку
				cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML)
			}
			addCartBtn.querySelector('[data-counter]').innerText = '1'

			//запуск функції для перевірки що в кошике
			toggleCartStatus()

			// запуск функції суми та доставки
			priceCartAndDelivery()
		}
	})
	//
}

export default cart
