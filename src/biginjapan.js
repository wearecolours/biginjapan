/* ========================================================================
 * biginjapan.js v2.1.6
 * https://github.com/wearecolours/biginjapan
 * ========================================================================
 * Copyright 2013-2015 Ivar Borthen, Christopher Horgen
 * Licensed under MIT (https://github.com/wearecolours/biginjapan/blob/master/LICENSE)
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


	var elements = null;

	var bigInJapan = function() {
		update();

		window.addEventListener('resize', resize, false);
	}

	var update = function() {
		// Get all elements with [data-biginjapan]
		elements = document.querySelectorAll('[data-biginjapan]');

		resize();
	}

	var resize = function() {

		for( var i = 0; i < elements.length; i++ ){

			var exclude = elements[i].dataset.biginjapanExclude;
			if ( exclude !== undefined ) {

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

	// Return public functions
	return {
		update
	};
});
