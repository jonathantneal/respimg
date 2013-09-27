/* global console */
(function (global) {
	'use strict';

	// start experiment
	var element = document.createElement('x-img');

	element.innerHTML = '<img src3="pic-tiny.jpg" src1="(min-width: 0px) and (min-width: 320px) 100 30em 400 70em 50%; pic50.png 50, pic100.png 100, pic200.png 200, pic400.png 400, pic800.png 800, pic1600.png 1600, pic3200.png 3200" src2="(max-width: 319px) pic-small.jpg" src4="100%; pic1.png 160, pic2.png 320, pic3.png 640, pic4.png 1280, pic5.png 2560">';

	element = element.lastChild;
	// end experiment

	// match expressions
	var match = {
		attribute: /^src[1-9][0-9]*$/i,
		mediaQuery: /^(?:\([^\)]*\)\s*(?:and)?\s*)+/,
		sizeViewportList: /^[^;]*;\s*/
	};

	function parseSrcN(element) {
		var
		attributes = element.attributes,
		srcN = [],
		index, length;

		// push all matching srcN attributes into a srcN array
		for (index = 0, length = attributes.length; index < length; ++index) {
			if (match.attribute.test(attributes[index].nodeName)) {
				srcN.push({
					name: attributes[index].nodeName,
					value: attributes[index].nodeValue
				});
			}
		}

		// sort the srcN array
		srcN.sort(function (a, b) {
			return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
		});

		var matchMediaQuery, matchXBasedUrls, matchViewportList;

		// parse each srcN object
		for (index = 0, length = srcN.length; index < length; ++index) {
			matchMediaQuery = srcN[index].value.match(match.mediaQuery);
			matchXBasedUrls = false; // (INCOMPLETE)
			matchViewportList = srcN[index].value.match(match.sizeViewportList);

			// matches `<media-query>`
			if (matchMediaQuery) {
				console.log( 'matched media query', [matchMediaQuery[0]]);
			}

			// matches `<x-based-urls>` (INCOMPLETE)
			if (matchXBasedUrls) {

			}
			// or matches `<viewport-urls>`
			else if (matchViewportList) {
				console.log( '<viewport-urls>', matchViewportList[0].replace(/;\s*$/, '').split(/\s+/) );
			}
		}
	}

	global.parseSrcN = parseSrcN;
})(this);