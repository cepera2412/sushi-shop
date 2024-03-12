import Swiper from 'swiper/bundle'
// import styles bundle
import 'swiper/css/bundle'

function swiper() {
	const swiper = new Swiper('.swiper', {
		// циклічність
		loop: true,
		// ефекти
		effect: 'fade',
		// Автоматична прокрутка
		autoplay: {
			// швидкість в ms
			delay: 4000,
			// відключення авто при взоємодії
			disableOnInteraction: false,
		},

		// пагінація
		// pagination: {
		// 	el: '.swiper-pagination',
		// },
	})
}

export default swiper
