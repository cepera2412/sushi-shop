function menuMobile() {
	// Mobile menu button
	const mobileMenuBtn = document.querySelector('#menuMobile-btn')
	const mobileMenu = document.querySelector('#menuMobile')
	const mobileMenuIcon = document.querySelector('#mobileMenu-icon')

	// добавлено, якщо натиснуть на любе місце на сторінці, то меню закриється
	window.addEventListener('click', () => {
		mobileMenu.classList.remove('menu-mobile--open')
		mobileMenuIcon.classList.remove('header__menu-mobile-icon--active')
		document.body.classList.remove('no-scroll')
	})
	// налаштування меню
	mobileMenuBtn.onclick = event => {
		event.stopPropagation()
		mobileMenu.classList.toggle('menu-mobile--open')
		mobileMenuIcon.classList.toggle('header__menu-mobile-icon--active')
		document.body.classList.toggle('no-scroll')
	}
}

export default menuMobile

//      Другий варіант Бургер меню з окремою кнопкою відкрити та закрити
//
// const mobileMenu = document.querySelector('#menu')
// const mobileMenuOpen = document.querySelector('#menu-open')
// const mobileMenuClose = document.querySelector('#menu-close')

// mobileMenu.addEventListener('click', event => {
// 	// Предотвращаем всплытие события
// 	event.stopPropagation()
// })

// document.addEventListener('click', () => {
// 	mobileMenu.style.display = 'none'
// })

// mobileMenuOpen.addEventListener('click', event => {
// 	event.stopPropagation()
// 	mobileMenu.style.display = 'block'
// })

// mobileMenuClose.addEventListener('click', () => {
// 	mobileMenu.style.display = 'none'
// })
