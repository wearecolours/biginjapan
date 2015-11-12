/* ========================================================================
 * https://github.com/wearecolours/biginjapan
 * ========================================================================
 * Copyright 2015 Ivar Borthen, Christopher Horgen
 * No dependencies needed.
 * ======================================================================== */

(function (window, bigInJapan) {
	'use strict';

	// Support RequireJS and CommonJS/NodeJS module formats.
	// Attach bigInJapan to the `window` when executed as a <script>.

	// RequireJS
	if (typeof define === 'function' && define.amd) {
		define(bigInJapan);

	// CommonJS
	} else if (typeof exports === 'object' && typeof module === 'object') {
		module.exports = bigInJapan();

	// <script>
	} else if (typeof window === 'object') {
		window.bigInJapan = bigInJapan();

	// Do not initialize bigInJapan when running server side, handle it in client:
	} else {
		return;
	}

})(window, function(){

	'use strict';

	// We do not want this script to be applied in browsers that do not support those
	// That means no bigInJapan on IE9 and below.
	if( document.querySelectorAll === void 0 ) { return; }

	var bigInJapan = function() {

		window.addEventListener('resize', update, false);

		update();

	}

	var update = function() {

		var elements = document.querySelectorAll('[data-biginjapan]');

		for( var i = 0; i < elements.length; i++ ){

			var exclude = elements[i].dataset.biginjapanExclude;
			if ( exclude !== undefined ) {

				/*** NEED WRAPPER (pre calculate all the exclude height elements) ***/
				var excludeElements = document.querySelectorAll(exclude);
				var excludeHeight = 0;
				for ( var j = 0; j < excludeElements.length; j++ ) {
					excludeHeight += excludeElements[j].offsetHeight;
				}
			}

			var percentage = elements[i].dataset.biginjapanPercentage;
			if ( percentage === undefined ) { percentage = 100; }

			elements[i].style.height = ((window.innerHeight * (percentage / 100)) - excludeHeight) + 'px';
		}
	}
	
	document.addEventListener("DOMContentLoaded", bigInJapan);

});
