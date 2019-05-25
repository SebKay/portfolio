jQuery(document).ready(function($) {
	/*--------------------------------------------
	---- Setup
	--------------------------------------------*/
	//---- Global transition speed
	var transition_speed      = 300;
	var transition_speed_menu = 400;

	//---- Remove 'no-js' class when JavaScript is enabled
	$('body').removeClass('js-inactive').addClass('js-active');



	/*--------------------------------------------
	---- Animations
	--------------------------------------------*/
	//---- Load
	$(window).on('load', function() {
		$('.anim').each(function() {
			$(this).addClass('loaded');
		});
	});



	/*--------------------------------------------
	---- Sticky Header
	--------------------------------------------*/
	function skp_site_scroll() {
		var body          = $('body');
		var scroll_offset = body.offset().top;

		var scroll_position_y = window.pageYOffset;

		if(scroll_position_y > scroll_offset) {
			body.removeClass('site-scroll--inactive').addClass('site-scroll--active');
		}else {
			body.removeClass('site-scroll--active').addClass('site-scroll--inactive');
		}
	}

	// skp_site_scroll();

	$(window).on('scroll', function() {
		// skp_site_scroll();
	});



	/*--------------------------------------------
	---- Toggle Menu (< 900)
	--------------------------------------------*/
	function skp_open_menu(button, menu) {
		if(menu.length) {
			if(!button.hasClass('active')) {
				$('body').addClass('mobile-menu--active');

				button.addClass('active animate');
				menu.stop().fadeIn({ duration: transition_speed_menu, queue: false }).css('display', 'none').slideDown(transition_speed_menu);

				setTimeout(function() {
					button.addClass('animate-end').removeClass('animate');
				}, transition_speed_menu);
			}
		}
	}

	function skp_close_menu(button, menu) {
		if(menu.length) {
			if(button.hasClass('active')) {
				$('body').removeClass('mobile-menu--active');

				button.removeClass('active animate-end').addClass('animate-reverse');
				menu.stop().fadeOut({ duration: transition_speed_menu, queue: false }).slideUp(transition_speed_menu);

				setTimeout(function() {
					button.removeClass('animate-reverse');
				}, transition_speed_menu);
			}
		}
	}

	function skp_toggle_menu(button, menu) {
		if(button.hasClass('active')) {
			skp_close_menu(button, menu);
		}else {
			skp_open_menu(button, menu);
		}
	}

	$('.js-toggle-menu').on('click', function(e) {
		e.preventDefault();

		skp_toggle_menu($('.js-toggle-menu'), $('.site-menu'));
	});

	$(window).on('scroll', function() {
		skp_close_menu($('.js-toggle-menu'), $('.site-menu'));
	});

	$(window).on('resize', function() {
		if($(this).width() > 900) {
			$('.site-menu').css('display', '');
		}
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

		jcf.replaceAll();

		$('.jcf-icon').remove();

		$('.jcf-select-opener').append("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/></svg>");
	}

	skp_jcf();

	// If any Ajax occurs re-run JCF
	$(document).ajaxComplete(function() {
		skp_jcf();
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
	//---- Disable buttons
	$('.btn--disabled').on('click', function(e) {
		e.preventDefault();
	})
});
