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

	    angular.module('app').controller('LoginController', LoginController);

	    /**
	    * АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
	          LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
	          function LoginController($location, AuthenticationService, FlashService) {
	              var vm = this;
	              vm.login = login;
	              (function initController() {
	                // reset login status
	                AuthenticationService.ClearCredentials();
	            })();
	              function login() {
	                vm.dataLoading = true;
	                AuthenticationService.Login(vm.username, vm.password, function (response) {
	                    if (response.success) {
	                        AuthenticationService.SetCredentials(vm.username, vm.password);
	                        $location.path('/');
	                    } else {
	                        FlashService.Error(response.message);
	                        vm.dataLoading = false;
	                    }
	                });
	            };
	        }
	      * @class LoginController
	    * @module app
	    * @main LoginController
	    */

	    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];

	    function LoginController($location, AuthenticationService, FlashService) {

	        var vm = this;

	        vm.login = login;

	        /**
	         * initController <br> СБРОСИТЬ login СТАТУС - AuthenticationService.ClearCredentials()<br>
	         * @method initController
	         */

	        (function initController() {
	            // reset login status
	            AuthenticationService.ClearCredentials();
	        })();

	        /**
	         * login <br> ПРОВЕРКА username И password <br> ЕСЛИ ВСЕ ОК - $location.path('/')
	         * @method login
	         */

	        function login() {
	            vm.dataLoading = true;
	            AuthenticationService.Login(vm.username, vm.password, function (response) {
	                if (response.success) {
	                    AuthenticationService.SetCredentials(vm.username, vm.password);
	                    $location.path('/');
	                } else {
	                    FlashService.Error(response.message);
	                    vm.dataLoading = false;
	                }
	            });
	        };
	    }
		})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5fY29udHJvbGxlci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3YmMwMzk2MzFhZWUzZTI4YmI2ZT9mMGZlKioqKiIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvYXNzZXRzL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdiYzAzOTYzMWFlZTNlMjhiYjZlIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuY29udHJvbGxlcignTG9naW5Db250cm9sbGVyJywgTG9naW5Db250cm9sbGVyKTtcclxuXHJcbiAgICAvKipcclxuICAgICog0JDQo9Ci0JXQndCi0JjQpNCY0JrQkNCm0JjQryDQn9Ce0JvQrNCX0J7QktCQ0KLQldCb0K9cclxuXHJcbiAgICAgICAgTG9naW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2NhdGlvbicsICdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCAnRmxhc2hTZXJ2aWNlJ107XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIExvZ2luQ29udHJvbGxlcigkbG9jYXRpb24sIEF1dGhlbnRpY2F0aW9uU2VydmljZSwgRmxhc2hTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdm0ubG9naW4gPSBsb2dpbjtcclxuXHJcbiAgICAgICAgICAgIChmdW5jdGlvbiBpbml0Q29udHJvbGxlcigpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlc2V0IGxvZ2luIHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgQXV0aGVudGljYXRpb25TZXJ2aWNlLkNsZWFyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxvZ2luKCkge1xyXG4gICAgICAgICAgICAgICAgdm0uZGF0YUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgQXV0aGVudGljYXRpb25TZXJ2aWNlLkxvZ2luKHZtLnVzZXJuYW1lLCB2bS5wYXNzd29yZCwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0aGVudGljYXRpb25TZXJ2aWNlLlNldENyZWRlbnRpYWxzKHZtLnVzZXJuYW1lLCB2bS5wYXNzd29yZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmxhc2hTZXJ2aWNlLkVycm9yKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5kYXRhTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAqIEBjbGFzcyBMb2dpbkNvbnRyb2xsZXJcclxuICAgICogQG1vZHVsZSBhcHBcclxuICAgICogQG1haW4gTG9naW5Db250cm9sbGVyXHJcbiAgICAqL1xyXG5cclxuICAgIExvZ2luQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgJ0ZsYXNoU2VydmljZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIExvZ2luQ29udHJvbGxlcigkbG9jYXRpb24sIEF1dGhlbnRpY2F0aW9uU2VydmljZSwgRmxhc2hTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLmxvZ2luID0gbG9naW47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGluaXRDb250cm9sbGVyIDxicj4g0KHQkdCg0J7QodCY0KLQrCBsb2dpbiDQodCi0JDQotCj0KEgLSBBdXRoZW50aWNhdGlvblNlcnZpY2UuQ2xlYXJDcmVkZW50aWFscygpPGJyPlxyXG4gICAgICAgICAqIEBtZXRob2QgaW5pdENvbnRyb2xsZXJcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgKGZ1bmN0aW9uIGluaXRDb250cm9sbGVyKCkge1xyXG4gICAgICAgICAgICAvLyByZXNldCBsb2dpbiBzdGF0dXNcclxuICAgICAgICAgICAgQXV0aGVudGljYXRpb25TZXJ2aWNlLkNsZWFyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBsb2dpbiA8YnI+INCf0KDQntCS0JXQoNCa0JAgdXNlcm5hbWUg0JggcGFzc3dvcmQgPGJyPiDQldCh0JvQmCDQktCh0JUg0J7QmiAtICRsb2NhdGlvbi5wYXRoKCcvJylcclxuICAgICAgICAgKiBAbWV0aG9kIGxvZ2luXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvZ2luKCkge1xyXG4gICAgICAgICAgICB2bS5kYXRhTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIEF1dGhlbnRpY2F0aW9uU2VydmljZS5Mb2dpbih2bS51c2VybmFtZSwgdm0ucGFzc3dvcmQsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBBdXRoZW50aWNhdGlvblNlcnZpY2UuU2V0Q3JlZGVudGlhbHModm0udXNlcm5hbWUsIHZtLnBhc3N3b3JkKTtcclxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBGbGFzaFNlcnZpY2UuRXJyb3IocmVzcG9uc2UubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZGF0YUxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9hc3NldHMvbG9naW4vbG9naW4uY29udHJvbGxlci5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OzsiLCJzb3VyY2VSb290IjoiIn0=