$(document).ready(function() {
	/*--------------------------------------------
	---- Setup
	--------------------------------------------*/
	//---- Global transition speed
	var transition_speed = 250;

	//---- Remove 'no-touch' class for touch devices
	var is_touch_device = 'ontouchstart' in document.documentElement;

	if(is_touch_device) {
		$('body').removeClass('no-touch');
	}

	//---- Remove 'no-js' class when JavaScript is enabled
	$('body').removeClass('no-js');



	/*--------------------------------------------
	---- Animations
	--------------------------------------------*/
	//---- Load
	$(window).on('load', function() {
		$('.anim').each(function() {
			$(this).addClass('loaded');
		});
	});

	//---- Scroll
	/*$(window).on('load scroll', function() {
		$('.anim').each(function() {
			var offset = 170;

			if($(window).width() > 1024) {
				var item_top      = $(this).offset().top + offset,
				window_height     = $(window).height(),
				window_scroll_top = $(window).scrollTop();

				if(window_scroll_top > (item_top - window_height)) {
					$(this).addClass('loaded');
				}else {
					$(this).removeClass('loaded');
				}
			}else {
				$(this).addClass('loaded');
			}
		});
	});*/



	/*--------------------------------------------
	---- Toggle Menu
	--------------------------------------------*/
	$('.js-toggle-menu').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('active');
		$('.site-header__section--menu').slideToggle(transition_speed);
	});

	$(window).on('resize', function() {
		if($(this).width() > 768) {
			$('.js-toggle-menu').removeClass('active');
			$('.site-header__section--menu').css('display', '');
		}
	});



	/*--------------------------------------------
	---- Toggle Accordion
	--------------------------------------------*/
	$('.js-accordion-heading').on('click', function(e) {
		e.preventDefault();

		$(this).parents('.accordion__item').toggleClass('active');
		$(this).next('.accordion__content').slideToggle(transition_speed);
	});



	/*--------------------------------------------
	---- FitVids
	--------------------------------------------*/
	$('iframe').wrap('<div class="fitvids-container"></div>');
	$('.fitvids-container').fitVids();



	/*--------------------------------------------
	---- JCF (JavaScript Custom Fields)
	--------------------------------------------*/
	function skp_jcf() {
		$('select').attr(
			'data-jcf',
			'{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "multipleCompactStyle": true}'
		);

		$('[data-range-vertical]').attr(
			'data-jcf',
			'{"orientation": "vertical"}'
		);

		jcf.replaceAll();

		$('.jcf-icon').remove();

		$('.jcf-select-opener').append('<span class="jcf-icon">' + svg_triangle_down + '</span>');
		$('.jcf-btn-inc').append('<span class="jcf-icon">' + svg_plus + '</span>');
		$('.jcf-btn-dec').append('<span class="jcf-icon">' + svg_minus + '</span>');
		$('.jcf-checkbox span').append('<span class="jcf-icon">' + svg_check) + '</span>';
	}

	skp_jcf();

	// If any Ajax occurs re-run JCF
	$(document).ajaxComplete(function() {
		skp_jcf();
	});



	/*--------------------------------------------
	---- Smooth Scroll
	--------------------------------------------*/
	$('.js-smooth-scroll').on('click', function(e) {
		e.preventDefault();

		var offset      = $('.site-header').outerHeight();
		var scroll_href = $(this).attr('href');

		if($(scroll_href).length) {
			$('html, body').animate({
				scrollTop: $(scroll_href).offset().top - offset
			}, 450);
		}
	});



	/*--------------------------------------------
	---- Form Validation
	--------------------------------------------*/
	var form_validation_arr = {
		errorElement   : 'span',
		errorClass     : 'form__validation',
		errorPlacement : function(error, element) {
			error.appendTo(element.parent());
		},
		highlight: function(element) {
			$(element).parents('.form__item').addClass("form__item--error");
		},
		unhighlight: function(element) {
			$(element).parents('.form__item').removeClass("form__item--error");
		}
	};

	$('.js-form-validate').validate(form_validation_arr);



	/*--------------------------------------------
	---- Other
	--------------------------------------------*/
	//---- Table Wrapper (to make responsive)
	$(window).on('load', function() {
		$('.post-styles table').wrap('<div class="table-wrap"></div>');
	});
});
