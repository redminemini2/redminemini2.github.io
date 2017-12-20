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

	    angular.module('app').factory('JsonService', JsonService);

	    /**
	    * @class ServiceJson
	    * @module app
	    * @main ServiceJson
	    */

	    JsonService.$inject = [];
	    function JsonService() {
	        var service = {};

	        service.getResultFromJson = getResultFromJson;

	        return service;

	        //ОБЩАЯ ФУНКЦИЯ ИМПОРТА СПИСКОВ
	        function getResultFromJson(path) {
	            var resultFromJson = null;
	            try {
	                var xhr = new XMLHttpRequest();

	                xhr.open('GET', path, false);
	                xhr.send();

	                if (xhr.status != 200) {
	                    // обработать ошибку
	                    alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
	                } else {
	                    // вывести результат
	                    // alert(xhr.responseText);
	                }
	                resultFromJson = JSON.parse(xhr.responseText);
	                return resultFromJson;
	            } catch (err) {
	                resultFromJson = getResultFromJsonNode(path);
	                return resultFromJson;
	            }
	        };
	    }
		})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9zZXJ2aWNlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDY2MTFiNGRmNzk4MWZjZWY2NWQ5P2VkZWYqKioiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvanNvbl9zZXJ2aWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NjExYjRkZjc5ODFmY2VmNjVkOSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ0pzb25TZXJ2aWNlJywgSnNvblNlcnZpY2UpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBAY2xhc3MgU2VydmljZUpzb25cclxuICAgICogQG1vZHVsZSBhcHBcclxuICAgICogQG1haW4gU2VydmljZUpzb25cclxuICAgICovICBcclxuXHJcbiAgICBKc29uU2VydmljZS4kaW5qZWN0ID0gW107XHJcbiAgICBmdW5jdGlvbiBKc29uU2VydmljZSgpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHt9O1xyXG5cclxuICAgICAgICBzZXJ2aWNlLmdldFJlc3VsdEZyb21Kc29uID0gZ2V0UmVzdWx0RnJvbUpzb247XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvL9Ce0JHQqdCQ0K8g0KTQo9Cd0JrQptCY0K8g0JjQnNCf0J7QoNCi0JAg0KHQn9CY0KHQmtCe0JJcclxuICAgICAgICBmdW5jdGlvbiBnZXRSZXN1bHRGcm9tSnNvbiAocGF0aCl7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRGcm9tSnNvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRyeSB7IFxyXG4gICAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHBhdGgsIGZhbHNlKTtcclxuICAgICAgICAgICAgICB4aHIuc2VuZCgpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPSAyMDApIHtcclxuICAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0LDRgtGMINC+0YjQuNCx0LrRg1xyXG4gICAgICAgICAgICAgYWxlcnQoJ9Ce0YjQuNCx0LrQsCAnICsgeGhyLnN0YXR1cyArICc6ICcgKyB4aHIuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LLRi9Cy0LXRgdGC0Lgg0YDQtdC30YPQu9GM0YLQsNGCXHJcbiAgICAgICAgICAgIC8vIGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXN1bHRGcm9tSnNvbiA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdEZyb21Kc29uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoKGVycikge1xyXG4gICAgICAgICAgICAgIHJlc3VsdEZyb21Kc29uID0gZ2V0UmVzdWx0RnJvbUpzb25Ob2RlKHBhdGgpOyBcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0RnJvbUpzb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvanNvbl9zZXJ2aWNlLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OzsiLCJzb3VyY2VSb290IjoiIn0=