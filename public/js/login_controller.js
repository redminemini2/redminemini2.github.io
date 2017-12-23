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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5fY29udHJvbGxlci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlZWI5OGU3MDQ0N2NiOWMxNDYzMT85NGIxKioqKioiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2Fzc2V0cy9sb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZWI5OGU3MDQ0N2NiOWMxNDYzMSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0xvZ2luQ29udHJvbGxlcicsIExvZ2luQ29udHJvbGxlcik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqINCQ0KPQotCV0J3QotCY0KTQmNCa0JDQptCY0K8g0J/QntCb0KzQl9Ce0JLQkNCi0JXQm9CvXHJcblxyXG4gICAgICAgIExvZ2luQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgJ0ZsYXNoU2VydmljZSddO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBMb2dpbkNvbnRyb2xsZXIoJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvblNlcnZpY2UsIEZsYXNoU2VydmljZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZtLmxvZ2luID0gbG9naW47XHJcblxyXG4gICAgICAgICAgICAoZnVuY3Rpb24gaW5pdENvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZXNldCBsb2dpbiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIEF1dGhlbnRpY2F0aW9uU2VydmljZS5DbGVhckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsb2dpbigpIHtcclxuICAgICAgICAgICAgICAgIHZtLmRhdGFMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIEF1dGhlbnRpY2F0aW9uU2VydmljZS5Mb2dpbih2bS51c2VybmFtZSwgdm0ucGFzc3dvcmQsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhlbnRpY2F0aW9uU2VydmljZS5TZXRDcmVkZW50aWFscyh2bS51c2VybmFtZSwgdm0ucGFzc3dvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZsYXNoU2VydmljZS5FcnJvcihyZXNwb25zZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZGF0YUxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgKiBAY2xhc3MgTG9naW5Db250cm9sbGVyXHJcbiAgICAqIEBtb2R1bGUgYXBwXHJcbiAgICAqIEBtYWluIExvZ2luQ29udHJvbGxlclxyXG4gICAgKi9cclxuXHJcbiAgICBMb2dpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsICdGbGFzaFNlcnZpY2UnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBMb2dpbkNvbnRyb2xsZXIoJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvblNlcnZpY2UsIEZsYXNoU2VydmljZSkge1xyXG5cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS5sb2dpbiA9IGxvZ2luO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBpbml0Q29udHJvbGxlciA8YnI+INCh0JHQoNCe0KHQmNCi0KwgbG9naW4g0KHQotCQ0KLQo9ChIC0gQXV0aGVudGljYXRpb25TZXJ2aWNlLkNsZWFyQ3JlZGVudGlhbHMoKTxicj5cclxuICAgICAgICAgKiBAbWV0aG9kIGluaXRDb250cm9sbGVyXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIChmdW5jdGlvbiBpbml0Q29udHJvbGxlcigpIHtcclxuICAgICAgICAgICAgLy8gcmVzZXQgbG9naW4gc3RhdHVzXHJcbiAgICAgICAgICAgIEF1dGhlbnRpY2F0aW9uU2VydmljZS5DbGVhckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogbG9naW4gPGJyPiDQn9Cg0J7QktCV0KDQmtCQIHVzZXJuYW1lINCYIHBhc3N3b3JkIDxicj4g0JXQodCb0Jgg0JLQodCVINCe0JogLSAkbG9jYXRpb24ucGF0aCgnLycpXHJcbiAgICAgICAgICogQG1ldGhvZCBsb2dpblxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2dpbigpIHtcclxuICAgICAgICAgICAgdm0uZGF0YUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBBdXRoZW50aWNhdGlvblNlcnZpY2UuTG9naW4odm0udXNlcm5hbWUsIHZtLnBhc3N3b3JkLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXV0aGVudGljYXRpb25TZXJ2aWNlLlNldENyZWRlbnRpYWxzKHZtLnVzZXJuYW1lLCB2bS5wYXNzd29yZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRmxhc2hTZXJ2aWNlLkVycm9yKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmRhdGFMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvYXNzZXRzL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Iiwic291cmNlUm9vdCI6IiJ9