$(document).ready(function() {

	"use strict";

	// Setting my api key
	Chimpify.defaults.apiKey = 'b80f1c6798efeaf85e92e2964d9b6a26c961be7c';

	// Chimpify it!
    //
    // Running this method will call the appropriate Chimp API on all HTML elements that have the class 'chimpify'.
    // jquery.chimpify.js file contains different API calls which are determined by the "data-chimp-..." attribute in the HTML element
    // For reference, see examples.html
	$('.chimpify').chimpify();



});
