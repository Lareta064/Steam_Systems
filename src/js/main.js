document.addEventListener("DOMContentLoaded", function (){
	$('.lazy').lazy();

	var reportSlider = new Swiper('.report-swiper', {
		spaceBetween:20,
		speed:1000,
		
		 navigation: {
			nextEl: ".report-next",
			prevEl: ".report-prev",
		},
		breakpoints: {
			768: {
			
			spaceBetween: 70,
			},
			1200: {
			
			spaceBetween: 140,
			},
		}
	});
});
