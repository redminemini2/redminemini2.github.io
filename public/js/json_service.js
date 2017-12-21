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
	        service.list = [];
	        service.Users = [];
	        service.status = {
	            1: "Ожидает",
	            2: "В работе",
	            3: "Выполнено"
	        };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9zZXJ2aWNlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDdiYzAzOTYzMWFlZTNlMjhiYjZlP2YwZmUqKioiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvanNvbl9zZXJ2aWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3YmMwMzk2MzFhZWUzZTI4YmI2ZSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ0pzb25TZXJ2aWNlJywgSnNvblNlcnZpY2UpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBAY2xhc3MgU2VydmljZUpzb25cclxuICAgICogQG1vZHVsZSBhcHBcclxuICAgICogQG1haW4gU2VydmljZUpzb25cclxuICAgICovICBcclxuXHJcbiAgICBKc29uU2VydmljZS4kaW5qZWN0ID0gW107XHJcbiAgICBmdW5jdGlvbiBKc29uU2VydmljZSgpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHt9O1xyXG5cclxuICAgICAgICBzZXJ2aWNlLmdldFJlc3VsdEZyb21Kc29uID0gZ2V0UmVzdWx0RnJvbUpzb247XHJcbiAgICAgICAgc2VydmljZS5saXN0ID0gW107XHJcbiAgICAgICAgc2VydmljZS5Vc2VycyA9IFtdO1xyXG4gICAgICAgIHNlcnZpY2Uuc3RhdHVzID0ge1xyXG4gICAgICAgICAgMTogXCLQntC20LjQtNCw0LXRglwiLCBcclxuICAgICAgICAgIDI6IFwi0JIg0YDQsNCx0L7RgtC1XCIsIFxyXG4gICAgICAgICAgMzogXCLQktGL0L/QvtC70L3QtdC90L5cIiBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLy/QntCR0KnQkNCvINCk0KPQndCa0KbQmNCvINCY0JzQn9Ce0KDQotCQINCh0J/QmNCh0JrQntCSXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0UmVzdWx0RnJvbUpzb24gKHBhdGgpe1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0RnJvbUpzb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0cnkgeyBcclxuICAgICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCBwYXRoLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgeGhyLnNlbmQoKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtCw0YLRjCDQvtGI0LjQsdC60YNcclxuICAgICAgICAgICAgIGFsZXJ0KCfQntGI0LjQsdC60LAgJyArIHhoci5zdGF0dXMgKyAnOiAnICsgeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINCy0YvQstC10YHRgtC4INGA0LXQt9GD0LvRjNGC0LDRglxyXG4gICAgICAgICAgICAvLyBhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmVzdWx0RnJvbUpzb24gPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHRGcm9tSnNvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICByZXN1bHRGcm9tSnNvbiA9IGdldFJlc3VsdEZyb21Kc29uTm9kZShwYXRoKTsgXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdEZyb21Kc29uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9hc3NldHMvYXBwLXNlcnZpY2VzL2pzb25fc2VydmljZS5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OzsiLCJzb3VyY2VSb290IjoiIn0=