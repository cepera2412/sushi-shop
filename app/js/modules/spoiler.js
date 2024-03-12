//
// Spoiler
//
window.addEventListener('click', event => {
	if (event.target.dataset.title === 'active') {
		const pagesWrapper = event.target.closest('[data-block]')
		const pagesTitle = pagesWrapper.querySelector('[data-title]')
		const pagesText = pagesWrapper.querySelector('[data-text]')

		pagesTitle.style.color =
			pagesTitle.style.color === 'rgb(205, 162, 116)'
				? 'rgb(41, 47, 54)'
				: 'rgb(205, 162, 116)'

		pagesTitle.classList.toggle('rotate')

		pagesText.style.maxHeight =
			pagesText.style.maxHeight === '500px' ? '0' : '500px'
		pagesText.style.opacity = pagesText.style.opacity === '1' ? '0' : '1'
	}
})
