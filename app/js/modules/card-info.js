//
const cardButtons = document.querySelectorAll('#card-name')

// Для каждой кнопки добавляем обработчик события
cardButtons.forEach(item => {
	item.addEventListener('click', function () {
		// Находим дочерний div кнопки
		const cardPeople = this.querySelector('.about-people__content')

		// Изменяем прозрачность дочернего div
		cardPeople.style.opacity = cardPeople.style.opacity === '1' ? '0' : '1'
		cardPeople.style.pointerEvents =
			cardPeople.style.pointerEvents === 'auto' ? 'none' : 'auto'
	})
	// Получаем все ссылки внутри текущей карточки
	const links = item.querySelectorAll('a')

	// Для каждой ссылки добавляем обработчик события
	links.forEach(function (link) {
		link.addEventListener('click', function (event) {
			// Останавливаем распространение события
			event.stopPropagation()
		})
	})
})
