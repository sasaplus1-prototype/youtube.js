/*!
 * @license youtube.js ver.0.2.0 Copyright(c) 2016 sasa+1
 * https://github.com/sasaplus1-prototype/youtube.js
 * Released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["youtube"] = factory();
	else
		root["youtube"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// NOTE: get global object by any environment
	var Promise = Function('return this')().Promise;

	var origin = __webpack_require__(1).get();

	/**
	 * generate YouTube player
	 *
	 * @param {String} selector
	 * @param {Object} events
	 * @return {Object[]}
	 */
	function generate(selector, events) {
	  var elements = document.querySelectorAll(selector),
	      instances = [],
	      i, len, element, script, params;

	  for (i = 0, len = elements.length; i < len; ++i) {
	    element = elements[i];

	    script = element.querySelector('script[type="application/json"]') || {};
	    params = JSON.parse(script.innerHTML || '{}');

	    params.playerVars || (params.playerVars = {});
	    params.playerVars.origin = origin;

	    params.events = events || {};

	    instances.push(
	      new YT.Player(element, params)
	    );
	  }

	  return instances;
	}

	/**
	 * register YouTube Iframe API script
	 *
	 * @param {Function} [callback]
	 * @return {Promise}
	 */
	function register(callback) {
	  var youtubeScript, firstScript;

	  if (typeof callback === 'function') {
	    window.onYouTubeIframeAPIReady = callback;
	  } else if (typeof Promise !== 'undefined') {
	    return new Promise(register);
	  } else {
	    throw new TypeError('callback must be a Function');
	  }

	  youtubeScript = document.createElement('script');
	  youtubeScript.async = true;
	  youtubeScript.src = 'https://www.youtube.com/iframe_api';

	  firstScript = document.getElementsByTagName('script')[0];
	  firstScript.parentNode.insertBefore(youtubeScript, firstScript);
	}

	module.exports = {
	  Promise: Promise,
	  generate: generate,
	  register: register
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var loc;

	function get() {
	  loc || (loc = window.location);

	  return loc.origin || (
	    loc.protocol + '//' + loc.hostname + (loc.port !== '' ? ':' + loc.port : '')
	  );
	}

	module.exports = {
	  get: get
	};


/***/ }
/******/ ])
});
;