$(document).ready(function() {
	/*--------------------------------------------
	---- Setup
	--------------------------------------------*/
	//---- Global transition speed
	var transition_speed = 300;

	//---- Remove 'no-touch' class for touch devices
	var is_touch_device = ('ontouchstart' in window) || (navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2;

	if(is_touch_device) {
		$('body').removeClass('touch-inactive').addClass('touch-active');
	}

	//---- Remove 'no-js' class when JavaScript is enabled
	$('body').removeClass('js-inactive').addClass('js-active');



	/*--------------------------------------------
	---- Sticky Header
	--------------------------------------------*/
	var body          = $('body');
	var header_offset = body.offset().top;

	function skp_site_scroll() {
		var scroll_position_y = window.pageYOffset;

		if(scroll_position_y > header_offset) {
			body.removeClass('site-scroll--inactive').addClass('site-scroll--active');
		}else {
			body.removeClass('site-scroll--active').addClass('site-scroll--inactive');
		}
	}

	$(window).on('load scroll', function() {
		skp_site_scroll();
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
	}

	skp_jcf();

	// If any Ajax occurs re-run JCF
	$(document).ajaxComplete(function() {
		skp_jcf();
	});
});
