/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	(function () {
	    'use strict';

	    angular.module('app').factory('FlashService', FlashService);

	    /**
	    * @class ServiceFlash
	    * @module app
	    * @main ServiceFlash
	    */

	    FlashService.$inject = ['$rootScope'];
	    function FlashService($rootScope) {
	        var service = {};

	        service.Success = Success;
	        service.Error = Error;

	        initService();

	        return service;

	        function initService() {
	            $rootScope.$on('$locationChangeStart', function () {
	                clearFlashMessage();
	            });

	            function clearFlashMessage() {
	                var flash = $rootScope.flash;
	                if (flash) {
	                    if (!flash.keepAfterLocationChange) {
	                        delete $rootScope.flash;
	                    } else {
	                        // only keep for a single location change
	                        flash.keepAfterLocationChange = false;
	                    }
	                }
	            }
	        }

	        function Success(message, keepAfterLocationChange) {
	            $rootScope.flash = {
	                message: message,
	                type: 'success',
	                keepAfterLocationChange: keepAfterLocationChange
	            };
	        }

	        function Error(message, keepAfterLocationChange) {
	            $rootScope.flash = {
	                message: message,
	                type: 'error',
	                keepAfterLocationChange: keepAfterLocationChange
	            };
	        }
	    }
		})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhc2hzZXJ2aWNlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDY2MTFiNGRmNzk4MWZjZWY2NWQ5P2VkZWYqIiwid2VicGFjazovLy9mcm9udGVuZC9hc3NldHMvYXBwLXNlcnZpY2VzL2ZsYXNoc2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjYxMWI0ZGY3OTgxZmNlZjY1ZDkiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdGbGFzaFNlcnZpY2UnLCBGbGFzaFNlcnZpY2UpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBAY2xhc3MgU2VydmljZUZsYXNoXHJcbiAgICAqIEBtb2R1bGUgYXBwXHJcbiAgICAqIEBtYWluIFNlcnZpY2VGbGFzaFxyXG4gICAgKi8gICAgXHJcblxyXG4gICAgRmxhc2hTZXJ2aWNlLiRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcclxuICAgIGZ1bmN0aW9uIEZsYXNoU2VydmljZSgkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7fTtcclxuXHJcbiAgICAgICAgc2VydmljZS5TdWNjZXNzID0gU3VjY2VzcztcclxuICAgICAgICBzZXJ2aWNlLkVycm9yID0gRXJyb3I7XHJcblxyXG4gICAgICAgIGluaXRTZXJ2aWNlKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0U2VydmljZSgpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJGbGFzaE1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhckZsYXNoTWVzc2FnZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmbGFzaCA9ICRyb290U2NvcGUuZmxhc2g7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmxhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZsYXNoLmtlZXBBZnRlckxvY2F0aW9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSAkcm9vdFNjb3BlLmZsYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9ubHkga2VlcCBmb3IgYSBzaW5nbGUgbG9jYXRpb24gY2hhbmdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYXNoLmtlZXBBZnRlckxvY2F0aW9uQ2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBTdWNjZXNzKG1lc3NhZ2UsIGtlZXBBZnRlckxvY2F0aW9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2ggPSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLCBcclxuICAgICAgICAgICAgICAgIGtlZXBBZnRlckxvY2F0aW9uQ2hhbmdlOiBrZWVwQWZ0ZXJMb2NhdGlvbkNoYW5nZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gRXJyb3IobWVzc2FnZSwga2VlcEFmdGVyTG9jYXRpb25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5mbGFzaCA9IHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAga2VlcEFmdGVyTG9jYXRpb25DaGFuZ2U6IGtlZXBBZnRlckxvY2F0aW9uQ2hhbmdlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvYXNzZXRzL2FwcC1zZXJ2aWNlcy9mbGFzaHNlcnZpY2UuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUVBOzs7Iiwic291cmNlUm9vdCI6IiJ9