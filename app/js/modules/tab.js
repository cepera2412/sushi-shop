//
//  Tabs
//
const tabsBtn = document.querySelectorAll('[data-tab]')
const tabsBlock = document.querySelectorAll('.project-tabs__block')

tabsBtn.forEach(item =>
	item.addEventListener('click', event => {
		const tabsBtnTarget = event.target.getAttribute('data-tab')
		tabsBtn.forEach(element =>
			element.classList.remove('project-tabs__btn--active')
		)
		tabsBlock.forEach(element =>
			element.classList.add('project-tabs__block--hidden')
		)
		item.classList.add('project-tabs__btn--active')
		document
			.getElementById(tabsBtnTarget)
			.classList.remove('project-tabs__block--hidden')
	})
)

// Початково відкрите
document
	.querySelector('[data-tab="tab-2"]')
	.classList.add('project-tabs__btn--active')
document.querySelector('#tab-2').classList.remove('project-tabs__block--hidden')
