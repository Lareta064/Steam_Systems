document.addEventListener("DOMContentLoaded", function (){
	$('.lazy').lazy();
	const bodyEl = document.body;
	
	/*====cooki popup remove=====*/
	const cookiPopup = document.querySelector('.cooki-popup');
	if(cookiPopup){
		const cookiCloseButtons = cookiPopup .querySelectorAll('button');
		for(let btn of cookiCloseButtons){
			btn.addEventListener('click',()=>{
				cookiPopup.remove();
			});
		}
	}
	
	/*======= header search form======= */
	const headerEl = document.getElementById('header');
	const openSearchForm = document.querySelector('#search-btn');
	const searchFormPopup = document.querySelector('#search-form');

	const menuToggle = document.querySelector('#menu-toggle');
	const mobileMenu = document.querySelector('#menu');
	

	function hideSerchForm(formBlock){
		formBlock.classList.remove('active');
		bodyEl.classList.remove('lock');
		
	}
	function resetActiveMenu(){
		mobileMenu.classList.remove('active');
		menuToggle.classList.remove('active');
		
	}
	if(openSearchForm){
		openSearchForm.addEventListener('click', ()=>{
			
			if(searchFormPopup.classList.contains('active')){
				hideSerchForm(searchFormPopup);
				if(!window.scrollY >0){
					/* при закрытии формы поиска, только если не было скролла страницы,  удаляем у header класс active, который делает шапку белой */
					headerEl.classList.remove('active');
					console.log(window.scrollY);
				}
				
			}else{
				
				resetActiveMenu();
				searchFormPopup.classList.add('active');
				bodyEl.classList.add('lock');
				headerEl.classList.add('active');
				
			}
		});
		/*====== click for overlay ====*/
		bodyEl.addEventListener('click', (e)=>{
			if(!menuToggle.contains(e.target) && !searchFormPopup.contains(e.target) && !openSearchForm.contains(e.target)){
				if(searchFormPopup.classList.contains('active')){

					searchFormPopup.classList.remove('active');
					bodyEl.classList.remove('lock');
					console.log('line 67');
				}
				
			}
		});
	}
	/*====change header bg for active menu==== */
	bodyEl.addEventListener('click', (e)=>{
		
			if(mobileMenu.classList.contains('active') || searchFormPopup.classList.contains('active')){
				headerEl.classList.add('active');
				console.log('line 77');
			}else{
				/*удаляем класс acive  у шапки, если страница не скроллилась*/
				if(window.scrollY == 0){headerEl.classList.remove('active');}
				
			}
		
	});
	
	/*===============MOBILE MENU ==================*/
	if (menuToggle) {
		menuToggle.addEventListener('click', ()=> {
			hideSerchForm(searchFormPopup);
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
			if(e.target == e.currentTarget){
				mobileMenu.classList.remove('active');
				menuToggle.classList.remove('active');
				bodyEl.classList.remove('lock');
				console.log('line-107');
				if(window.scrollY == 0){headerEl.classList.remove('active');
					console.log('line-109');
				}
			}
		});
		function checkScreenSize() {
			if (window.innerWidth > 1023) {
				bodyEl.classList.remove('lock');
				resetActiveMenu();
			}
		}

		// Проверка размера экрана при загрузке страницы
		checkScreenSize();

		// Проверка размера экрана при изменении размера окна
		window.addEventListener('resize', checkScreenSize);
	}	
	/*=====CUSTOM SELECT===== */
	// polyfill for forEach для NodeList
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}

	document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
		const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
		const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
		const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
		const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

		// Клик по кнопке. Открыть/Закрыть select
		dropDownBtn.addEventListener('click', function (e) {
			dropDownList.classList.toggle('dropdown__list--visible');
			this.classList.toggle('dropdown__button--active');
		});
			

		// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
		dropDownListItems.forEach(function (listItem) {
			listItem.addEventListener('click', function (e) {
				e.stopPropagation();
				dropDownBtn.innerText = this.innerText;
				dropDownBtn.focus();
				dropDownInput.value = this.dataset.value;
				dropDownList.classList.remove('dropdown__list--visible');
				dropDownBtn.classList.remove('dropdown__button--active');
				
			});
		});

		// Клик снаружи дропдауна. Закрыть дропдаун
		document.addEventListener('click', function (e) {
			if (e.target !== dropDownBtn) {
				dropDownBtn.classList.remove('dropdown__button--active');
				dropDownList.classList.remove('dropdown__list--visible');
			}
		});

		// Нажатие на Tab или Escape. Закрыть дропдаун
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Tab' || e.key === 'Escape') {
				dropDownBtn.classList.remove('dropdown__button--active');
				dropDownList.classList.remove('dropdown__list--visible');
			}
		});
	});
  	/*====input show-pass ===== */
	const passInputs = document.querySelectorAll('.form-input--pass');
	if(passInputs.length > 0){
		for(let item of passInputs){
			const passInputsIcon = item.querySelector('.input-icon');
			const passInputField = item.querySelector('input');
			 passInputsIcon.addEventListener('click', ()=>{
				if(item.classList.contains('active')){
					item.classList.remove('active');
					passInputField.setAttribute('type','password');
				}else{
					item.classList.add('active');
					passInputField.setAttribute('type','text');
				}
			 })
		}
	}
	const TRANSITION = 1500;
	var heroSlider = new Swiper(".main-hero-slider", {
		slidesPerView: 1,
		speed: TRANSITION,
		// loop: true,
		// lazy: true,
		effect: "fade",
		allowTouchMove: false, // Disable dragging with mouse or touch

		on: {
			slideChangeTransitionStart: function () {
				var swiperRect = document.querySelector('.swiper-rect');
				swiperRect.style.display = 'block';
				if (heroSlider.activeIndex < heroSlider.previousIndex) {
					swiperRect.style.animation = `slideRectForward ${TRANSITION}ms `;
				} else {
					swiperRect.style.animation = `slideRectBackward ${TRANSITION}ms`;
				}
				var texts = document.querySelectorAll('.hero-slide__text');
				texts.forEach(function (text) {
					text.classList.remove('active');
				});
			},
			slideChangeTransitionEnd: function () {
				var swiperRect = document.querySelector('.swiper-rect');
				swiperRect.style.display = 'none';
				swiperRect.style.animation = 'none'; 

				var activeSlide = heroSlider.slides[heroSlider.activeIndex];
				var activeText = activeSlide.querySelector('.hero-slide__text');
				if (activeText) {
					activeText.classList.add('active');
				}
			},
		},
		pagination: {
			el: ".main-hero-pagination",
			clickable: true,
		},
		autoplay: {
			delay: 4500,
			disableOnInteraction: false,
		}
	});
	const mainSlider = document.querySelector('.main-hero-slider');
	// Добавить класс active первому слайду при загрузке слайдера
	if(mainSlider){
		var initialSlide = heroSlider.slides[heroSlider.activeIndex];
		var initialText = initialSlide.querySelector('.hero-slide__text');
		if (initialText) {
			initialText.classList.add('active');
		}
	}
	/*===single product slider=== */
	var prodSlider = new Swiper('.slider', {
		speed: 1000,
		pagination: {
        	el: ".slider-pagination",
			clickable: true,
      	},
	});
	
	/********WINDOW SCROLL EVENTS********* */
	const productPage = document.getElementById('product-page');
	window.addEventListener('scroll', (e)=>{
		if(window.scrollY > 0){
			headerEl.classList.add('active');
			if(productPage){headerEl.classList.add('header-white-bg');}
		}else{
			headerEl.classList.remove('active');
			if(productPage){headerEl.classList.remove('header-white-bg');}
		}	
	});
	
	//========= fancybox==========
	$('[data-fancybox]').fancybox({
		thumbs: {
			autoStart: true, // автоматически отображать панель с миниатюрами
			//axis: 'y'  вертикальное расположение
		},		
	});
	
	// Инициализация Fancybox с начальной настройкой axis: 'y'
	$.fancybox.defaults.thumbs.axis = 'y';

	// Функция для обновления настройки axis в зависимости от ширины экрана
	function updateFancyboxAxis() {
		if (window.innerWidth < 768) {
			$.fancybox.defaults.thumbs.axis = 'x';
		} else {
			$.fancybox.defaults.thumbs.axis = 'y';
		}
	}

	// Вызываем функцию при загрузке страницы
	updateFancyboxAxis();

	// Добавляем обработчик события изменения размера окна
	window.addEventListener('resize', updateFancyboxAxis);

	//======= modal wrapper ========
	const modals = document.querySelectorAll('.modal-wrapper');
	if(modals.length > 0){
		const modalOpenButtons = document.querySelectorAll('[data-target]');
		const modalCloseButtons = document.querySelectorAll('[data-role]');
		for(let item of modalOpenButtons){
			
			item.addEventListener('click', (e)=>{
				const itemDataValue = item.getAttribute('data-target');
				for(let modalItem of modals ){
					const modalItemData = modalItem.getAttribute('data-modal');
					if(modalItemData == itemDataValue){
						modalItem.classList.add('active');
						bodyEl.classList.add('lock');
					}
				}
			});
			
		}
		for(let modalClose of modalCloseButtons){
			modalClose.addEventListener('click', (e)=>{
				modalClose.closest('.modal-wrapper').classList.remove('active');
				bodyEl.classList.remove('lock');
			});
		}
		for(let modal of modals){
			
			modal.addEventListener('click', (e)=>{
				if(e.target == e.currentTarget){
					modal.classList.remove('active');
					bodyEl.classList.remove('lock');
				}
			});
		}

	}
	
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

 	document.querySelectorAll('.btn-play-wrapper').forEach(button => {
        button.addEventListener('click', function() {
            var videoWrapper = this.closest('.video-wrapper');
            var video = videoWrapper.querySelector('.video');
            var poster = videoWrapper.querySelector('.video-poster');

            if (video.paused) {
                video.play();
                videoWrapper.classList.add('active');
                poster.style.display = 'none';
            } else {
                video.pause();
                videoWrapper.classList.remove('active');
               
            }
        });
    });

    document.querySelectorAll('.video').forEach(video => {
        video.addEventListener('click', function() {
            var poster = this.parentElement.querySelector('.video-poster');
            if (this.paused) {
                this.play();
                this.parentElement.classList.add('active');
                poster.style.display = 'none'; 
            } else {
                this.pause();
                this.parentElement.classList.remove('active');
               
            }
        });

        video.addEventListener('ended', function() {
            var poster = this.parentElement.querySelector('.video-poster');
            this.parentElement.classList.remove('active');
            poster.style.display = 'block';
        });
    });

	// ======custom input type file ====
	const fileInput = document.getElementById('file-input');
  	const fileLabel = document.querySelector('.file-label');
	if(fileInput){

		fileInput.addEventListener('change', function() {
			const fileName = fileInput.files[0]?.name || 'Прикрепить файл';
			fileLabel.querySelector('.file-text').textContent = fileName;
		});
	}
	/* toggle active class стр Магазины переключатель отображения */
	
		function toggleActiveClass(parentClass, childClass) {
			const parents = document.querySelectorAll('.' + parentClass);
			parents.forEach(parent => {
				parent.addEventListener('click', function(e) {
				
					if (e.target.classList.contains(childClass)) {
						parent.querySelectorAll('.' + childClass).forEach(child => {
						child.classList.remove('active');
						});
						e.target.classList.add('active');
					}
				});
			});
		}
		toggleActiveClass('toggle-group', 'toggle-item');

		/* Отображать карту или таблицы по клику на кнопки переключения */
		const storiesDisplayToggle = document.querySelectorAll('[data-display]');
		
		if(storiesDisplayToggle.length >0){
			
			const storiesDisplayContent = document.querySelectorAll('[data-content]');
			storiesDisplayToggle[0].addEventListener('click',()=>{
				console.log('444');
				storiesDisplayContent[0].classList.add('active');
				storiesDisplayContent[1].classList.remove('active');
			});
			storiesDisplayToggle[1].addEventListener('click',()=>{
				storiesDisplayContent[0].classList.remove('active');
				storiesDisplayContent[1].classList.add('active');
			});
		}

});
