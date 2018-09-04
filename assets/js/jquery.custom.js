jQuery(document).ready(function($) {
	/*--------------------------------------------
	---- Setup
	--------------------------------------------*/
	//---- Global transition speed
	var transition_speed = 300;

	//---- Remove 'no-js' class when JavaScript is enabled
	$('body').removeClass('js-inactive').addClass('js-active');



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

	skp_site_scroll();

	$(window).on('scroll', function() {
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

		$('.jcf-icon').remove();

		$('.jcf-select-opener').append("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/></svg>");
	}

	skp_jcf();

	// If any Ajax occurs re-run JCF
	$(document).ajaxComplete(function() {
		skp_jcf();
	});



	/*--------------------------------------------
	---- Other
	--------------------------------------------*/
	//---- Disable buttons
	$('.btn--disabled').on('click', function(e) {
		e.preventDefault();
	})
});
