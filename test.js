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
		// attribute name is at least 4 characters long
		// first three characters of the attribute name are an ASCII case-insensitive match for "src"
		// fourth character of the attribute name is a non-zero digit (1-9)
		// remaining characters of the attribute name are digits (0-9)
		attribute: /^src[1-9][0-9]*$/i,
		// media queries are wrapped in parentheses
		// media queres may be separated by "and"
		mediaQuery: /^(?:\([^\)]*\)\s*(?:and)?\s*)+/,
		// 
		sizeViewportList: /^[^;]*;\s*/
	};

	// Get Image Candidates
	function getImageCandidates(element) {
		var
		attributes = element.attributes,
		srcN = [],
		index, length;

		console.log( '\n=======\nparsing `' + element.outerHTML + '`' );

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
			console.log( 'src' + index + ':' );

			matchMediaQuery = srcN[index].value.match(match.mediaQuery);

			// matches `<media-query>`
			if (matchMediaQuery) {
				console.log( '<media-query>', [matchMediaQuery[0]]);

				srcN[index].value = srcN[index].value.slice(matchMediaQuery[0].length);
			}

			matchXBasedUrls = false; // (INCOMPLETE)
			matchViewportList = srcN[index].value.match(match.sizeViewportList);

			// matches `<x-based-urls>` (INCOMPLETE)
			if (matchXBasedUrls) {

			}
			// or matches `<viewport-urls>`
			else if (matchViewportList) {
				console.log( '<viewport-urls>', matchViewportList[0].replace(/;\s*$/, '').split(/\s+/) );

				srcN[index].value = srcN[index].value.slice(matchViewportList[0].length);
			}

			console.log( 'remainder', srcN[index].value );
		}

		// return a (possibly empty) list of image candidates, where each candidate is a pair composed of a url and a resolution. (INCOMPLETE)
		return false;
	}

	global.getImageCandidates = getImageCandidates;
})(this);