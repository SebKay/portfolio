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
	---- Sticky Header
	--------------------------------------------*/
	var scroll_elem   = $('body');
	var header_offset = scroll_elem.offset().top;

	function skp_site_scrolled() {
		var y_scroll_pos = window.pageYOffset;

		if(y_scroll_pos > header_offset) {
			scroll_elem.removeClass('site-scroll--inactive');
			scroll_elem.addClass('site-scroll--active');
		}else {
			scroll_elem.removeClass('site-scroll--active');
			scroll_elem.addClass('site-scroll--inactive');
		}
	}

	$(window).on('load scroll', function() {
		skp_site_scrolled();
	});



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
			$('.site-header__section--menu').css('display', '');
		}
	});



	/*--------------------------------------------
	---- Toggle Accordion
	--------------------------------------------*/
	$('.js-accordion-heading').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('active');
		$(this).next('.accordion__content').slideToggle(transition_speed);
	});



	/*--------------------------------------------
	---- Toggle Modal
	--------------------------------------------*/
	//---- Inject overlay and close button
	$('.modal').prepend('<div class="modal__overlay"></div>');
	$('.modal__inner').append('<a class="modal__close" href="#">' + svg_close + '</a>');

	//---- Toggle
	$('[data-modal-target]').on('click', function(e) {
		e.preventDefault();

		// Get data attribute value
		var modal_link = $(this).attr('data-modal-target');

		if($('[data-modal="' + modal_link + '"]').length) {
			$('[data-modal="' + modal_link + '"]').fadeIn(transition_speed).addClass('active');
			$('body').addClass('lock-scroll');
		}
	});

	function skp_close_modal() {
		var modal = $('.modal.active');

		if(modal.length) {
			modal.fadeOut(transition_speed).removeClass('active');
			$('body').removeClass('lock-scroll');

			// Reload iFrame (for stopping videos playing)
			modal.find('iframe').each(function() {
				var href = $(this).attr('src');
				$(this).attr('src', href);
			});
		}
	}

	// Close button or overlay
	$('.modal__close, .modal__close *, .modal__overlay').on('click', function(e) {
		e.preventDefault();

		skp_close_modal();
	});

	// ESC key
	$(document).keyup(function(e) {
		if(e.keyCode == 27) {
			skp_close_modal();
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
	---- Gravity Forms
	--------------------------------------------*/
	function skp_gform_submit() {
		$('.gform_button').on('click', function() {
			var form_btn = $(this);
			var form_id = form_btn.attr('data-gf-id');

			form_btn.addClass('btn--has-loader').append('<span class="btn__loader">' + svg_spinner + '</span>');

			$('html, body').animate({
				scrollTop: $('#gform_wrapper_' + form_id + ', #form-top-' + form_id).offset().top - 50
			}, 500);
		});

		$('.gform_wrapper .validation_error').prepend('<h4>Error</h4><br>');
	}

	$(document).bind('gform_post_render', function(){
		skp_gform_submit();
		skp_jcf();
	});

	skp_gform_submit();



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
	---- Share Popup
	--------------------------------------------*/
	function skp_popup_center(url, title, passed_width, passed_height) {
		var dual_screen_left = window.screenLeft !== undefined ? window.screenLeft : screen.left;
		var dual_screen_top  = window.screenTop !== undefined ? window.screenTop : screen.top;

		var width  = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		var left = ((width / 2) - (passed_width / 2)) + dual_screen_left;
		var top  = ((height / 3) - (passed_height / 3)) + dual_screen_top;

		var newWindow = window.open(url, title, 'scrollbars=yes, width=' + passed_width + ', height=' + passed_height + ', top=' + top + ', left=' + left);

		// Focus on new window
		if(window.focus) {
			newWindow.focus();
		}
	};

	$('.js-popup').on('click', function(e) {
		e.preventDefault();

		skp_popup_center($(this).attr('href'), $(this).find('.text').html(), 580, 470);
	});



	/*--------------------------------------------
	---- Other
	--------------------------------------------*/
	//---- Table Wrapper (to make responsive)
	$(window).on('load', function() {
		$('.post-styles table').wrap('<div class="table-wrap"></div>');
	});
});
