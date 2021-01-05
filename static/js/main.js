
var $ = jQuery;

(function($) {

	jQuery(document).on('ready', function(){

		"use strict";

		if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/)) {

			$('body').addClass('touch');

		} else {

			$('body').addClass('no-touch');

		}

		$('.fadein').fadeIn(500);

		function retina(){

			if( 'devicePixelRatio' in window && window.devicePixelRatio == 2 ){

				var imgToReplace = $('img.replace-2x').get();
			    for (var i=0,l=imgToReplace.length; i<l; i++) {
		    		var src = imgToReplace[i].src;
			      	src = src.replace(/\.(png|jpg|gif)+$/i, '@2x.$1');
			      	imgToReplace[i].src = src;
			      	$(imgToReplace[i]).load(function(){
						$(this).addClass('loaded');
					});
			    };

			    var imgToReplaceM = $('a.replace-2x').get();
			    for (var i=0,l=imgToReplaceM.length; i<l; i++) {
			      	var src = imgToReplaceM[i].href;
			      	src = src.replace(/\.(png|jpg|gif)+$/i, '@2x.$1');
			      	imgToReplaceM[i].href = src;
			      	$(imgToReplaceM[i]).addClass('loaded');
			    };

			 	$('img').each(function(){
					var item = $(this);
			 		var retinaSrc = $(this).attr('data-retina-src');

			 		if(retinaSrc !== undefined) {
						item.attr('src', retinaSrc );
					}
			 	});

			}
		}

		/*-------------------------------------*/
		/*-------------- Init Fn --------------*/
		/*-------------------------------------*/

		retina();
	});

	$(window).on('load', function(){
		$('body').addClass('loader');
	});
})(jQuery);
