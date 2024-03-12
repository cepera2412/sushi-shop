function addCards() {
	//
	const productCard = document.querySelector('#product-card')

	getProduct()

	async function getProduct() {
		const response = await fetch('./data/card.json')
		const productArray = await response.json()

		renderProducts(productArray)
	}

	function renderProducts(productArray) {
		productArray.forEach(item => {
			const productHTML = `<article id="card" class="card" data-id="${item.id}">
					<img class="card__img" src="img/roll/${item.img}" alt="roll" />
					<div class="card__content">
						<h4 class="card__content-title">${item.title}</h4>
						<p>
							<small data-items-in-box class="card__content-number">${item.number}</small>
						</p>
				
						<div class="card__details-wrapper">
							<div class="card__counter-wrapper" data-wrapper>
								<div class="card__counter-control" data-action="minus">-</div>
								<div class="card__counter-current" data-counter>1</div>
								<div class="card__counter-control" data-action="plus">+</div>
							</div>
				
							<div class="card__price">
								<div class="card__price-weight">${item.weight}</div>
								<div class="card__price-currency">${item.price}</div>
							</div>
						</div>
				
						<button data-btn type="button" class="btn btn-block btn-outline-warning">
							+ в кошик
						</button>
					</div>
				</article>`

			productCard.insertAdjacentHTML('beforeend', productHTML)
		})
	}

	//
}

export default addCards
