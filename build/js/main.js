document.addEventListener("DOMContentLoaded", function (){
	$('.lazy').lazy();
	/*===============MOBILE MENU ==================*/
	const menuToggle = document.querySelector('#menu-toggle');
	const mobileMenu = document.querySelector('#menu');
	const bodyEl = document.body;
	if (menuToggle) {
		function resetActiveMenu(){
			mobileMenu.classList.remove('active');
			menuToggle.classList.remove('active');
		}
		menuToggle.addEventListener('click', ()=> {
			
			if (menuToggle.classList.contains('active')) {
				resetActiveMenu();
				bodyEl.classList.remove('lock');
			
			} else {
				menuToggle.classList.add('active');
			    mobileMenu.classList.add('active');
				bodyEl.classList.add('lock');
				
			}
		});
		mobileMenu.addEventListener('click', (e)=>{
			
				mobileMenu.classList.remove('active');
				menuToggle.classList.remove('active');
				bodyEl.classList.remove('lock');
				
			
		});
		function checkScreenSize() {
			if (window.innerWidth > 1199) {
				bodyEl.classList.remove('lock');
				resetActiveMenu();
			}
		}
		// Проверка размера экрана при загрузке страницы
		checkScreenSize();

		// Проверка размера экрана при изменении размера окна
		window.addEventListener('resize', checkScreenSize);
	}
	/*======skiders====== */
	var reportSlider = new Swiper('.report-swiper', {
		spaceBetween:20,
		speed:1500,
		loop:true,
		 navigation: {
			nextEl: ".report-next",
			prevEl: ".report-prev",
		},
		autoplay:{
			delay: 2500,
			disableOnInteraction: false,
		},
		breakpoints: {
			768: {
			
			spaceBetween: 70,
			},
			1200: {
			
			spaceBetween: 140,
			},
		},
		on: {
			init() {
			this.el.addEventListener('mouseenter', () => {
				this.autoplay.stop();
			});

			this.el.addEventListener('mouseleave', () => {
				this.autoplay.start();
			});
			}
		},
	});
	var reviewSlider = new Swiper('.reviews-swiper',{
		spaceBetween:20,
		speed:1500,
		loop:true,
		 navigation: {
			nextEl: ".reviews-next",
			prevEl: ".reviews-prev",
		},
		breakpoints: {
			768: {spaceBetween: 0,}
		},
		autoplay:{
			delay: 2500,
			disableOnInteraction: false,
		},
		on: {
		init() {
		this.el.addEventListener('mouseenter', () => {
			this.autoplay.stop();
		});

		this.el.addEventListener('mouseleave', () => {
			this.autoplay.start();
		});
		}
	},
	});
	
	/*===========Accordion=============*/
	;(function ($, window, document, undefined) {
	"use strict";
	var pluginName = 'simpleAccordion',
	defaults = {
		multiple: false,
		speedOpen: 300,
		speedClose: 150,
		easingOpen: null,
		easingClose: null,
		headClass: 'accordion-header',
		bodyClass: 'accordion-body',
		openClass: 'open',
		defaultOpenClass: 'default-open',
		cbClose: null, //function (e, $this) {},
		cbOpen: null //function (e, $this) {}
	};
	function Accordion(element, options) {
		this.$el = $(element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		if (typeof this.$el.data('multiple') !== 'undefined') {
			this.options.multiple = this.$el.data('multiple');
			} else {
			this.options.multiple = this._defaults.multiple;
		}
		this.init();
	}
	Accordion.prototype = {
		init: function () {
			var o = this.options,
			$headings = this.$el.children('.' + o.headClass);
			$headings.on('click', {_t:this}, this.headingClick);
			$headings.filter('.' + o.defaultOpenClass).first().click();
		},
		headingClick: function (e) {
			var $this = $(this),
			_t = e.data._t,
			o = _t.options,
			$headings = _t.$el.children('.' + o.headClass),
			$currentOpen = $headings.filter('.' + o.openClass);
			if (!$this.hasClass(o.openClass)) {
				if ($currentOpen.length && o.multiple === false) {
					$currentOpen.removeClass(o.openClass).next('.' + o.bodyClass).slideUp(o.speedClose, o.easingClose, function () {
						if ($.isFunction(o.cbClose)) {
							o.cbClose(e, $currentOpen);
						}
						$this.addClass(o.openClass).next('.' + o.bodyClass).slideDown(o.speedOpen, o.easingOpen, function () {
							if ($.isFunction(o.cbOpen)) {
								o.cbOpen(e, $this);
							}
						});
					});
					} else {
					$this.addClass(o.openClass).next('.' + o.bodyClass).slideDown(o.speedOpen, o.easingOpen, function () {
						$this.removeClass(o.defaultOpenClass);
						if ($.isFunction(o.cbOpen)) {
							o.cbOpen(e, $this);
						}
					});
				}
				} else {
				$this.removeClass(o.openClass).next('.' + o.bodyClass).slideUp(o.speedClose, o.easingClose, function () {
					if ($.isFunction(o.cbClose)) {
						o.cbClose(e, $this);
					}
				});
			}
		}
	};
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
				new Accordion(this, options));
			}
		});
	};
	}(jQuery, window, document));

	$(function() {
		$('.accordion-group').simpleAccordion({
			cbClose: function(e, $header) {
				var video = $header.next('.accordion-body').find('.video')[0];
				if (video && !video.paused) {
					video.pause();
					$(video).parent().removeClass('active');
				}
			}
		});
	});
	const backTopBtn = document.getElementById('backtop');
    window.addEventListener('scroll', ()=>{
		if(window.scrollY > 600){
			backTopBtn.classList.add('active');
			
		}else{
			backTopBtn.classList.remove('active');
		}
	});
});
