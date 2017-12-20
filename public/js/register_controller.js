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

	    angular.module('app').controller('RegisterController', RegisterController);

	    /**
	    * РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
	          angular
	            .module('app')
	            .controller('RegisterController', RegisterController);
	          RegisterController.$inject = ['UserService',  '$location', '$rootScope', 'FlashService'];
	          function RegisterController(UserService, $location, $rootScope, FlashService) {
	            var vm = this;
	              vm.register = register;
	              function register() {
	                vm.dataLoading = true;
	                UserService.Create(vm.user)
	                    .then(function (response) {
	                        if (response.success) {
	                            FlashService.Success('Registration successful', true);
	                            $location.path('/login');
	                        } else {
	                            FlashService.Error(response.message);
	                            vm.dataLoading = false;
	                        }
	                    });
	            }
	        }
	      * @class RegisterController
	    * @module app
	    * @main RegisterController
	    */

	    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];

	    function RegisterController(UserService, $location, $rootScope, FlashService) {
	        var vm = this;

	        vm.register = register;

	        /**
	        * register <br> СОЗДАЕТ (РЕГИСТРУЕТ) ПОЛЬЗОВАТЕЛЯ <br> ИНФОРМИРУЕТ О РЕЗУЛЬТАТЕ РЕГИСТРАЦИИ <br> ПЕРЕХОД НА СТРАНИЦУ АУТЕНТИФИКАЦИИ ( $location.path('/login'); )
	        * @method register
	        */

	        function register() {
	            vm.dataLoading = true;
	            UserService.Create(vm.user).then(function (response) {
	                if (response.success) {
	                    FlashService.Success('Registration successful', true);
	                    $location.path('/login');
	                } else {
	                    FlashService.Error(response.message);
	                    vm.dataLoading = false;
	                }
	            });
	        }
	    }
	})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJfY29udHJvbGxlci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2NjExYjRkZjc5ODFmY2VmNjVkOT9lZGVmKioqKioiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2Fzc2V0cy9yZWdpc3Rlci9yZWdpc3Rlci5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NjExYjRkZjc5ODFmY2VmNjVkOSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ29udHJvbGxlcicsIFJlZ2lzdGVyQ29udHJvbGxlcik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqINCg0JXQk9CY0KHQotCg0JDQptCY0K8g0J/QntCb0KzQl9Ce0JLQkNCi0JXQm9CvXHJcblxyXG4gICAgICAgIGFuZ3VsYXJcclxuICAgICAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAgICAgLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ29udHJvbGxlcicsIFJlZ2lzdGVyQ29udHJvbGxlcik7XHJcblxyXG4gICAgICAgIFJlZ2lzdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsICAnJGxvY2F0aW9uJywgJyRyb290U2NvcGUnLCAnRmxhc2hTZXJ2aWNlJ107XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIFJlZ2lzdGVyQ29udHJvbGxlcihVc2VyU2VydmljZSwgJGxvY2F0aW9uLCAkcm9vdFNjb3BlLCBGbGFzaFNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZtLnJlZ2lzdGVyID0gcmVnaXN0ZXI7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiByZWdpc3RlcigpIHtcclxuICAgICAgICAgICAgICAgIHZtLmRhdGFMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFVzZXJTZXJ2aWNlLkNyZWF0ZSh2bS51c2VyKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRmxhc2hTZXJ2aWNlLlN1Y2Nlc3MoJ1JlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGbGFzaFNlcnZpY2UuRXJyb3IocmVzcG9uc2UubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5kYXRhTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgKiBAY2xhc3MgUmVnaXN0ZXJDb250cm9sbGVyXHJcbiAgICAqIEBtb2R1bGUgYXBwXHJcbiAgICAqIEBtYWluIFJlZ2lzdGVyQ29udHJvbGxlclxyXG4gICAgKi9cclxuXHJcbiAgICBSZWdpc3RlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCAgJyRsb2NhdGlvbicsICckcm9vdFNjb3BlJywgJ0ZsYXNoU2VydmljZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIFJlZ2lzdGVyQ29udHJvbGxlcihVc2VyU2VydmljZSwgJGxvY2F0aW9uLCAkcm9vdFNjb3BlLCBGbGFzaFNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS5yZWdpc3RlciA9IHJlZ2lzdGVyO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIHJlZ2lzdGVyIDxicj4g0KHQntCX0JTQkNCV0KIgKNCg0JXQk9CY0KHQotCg0KPQldCiKSDQn9Ce0JvQrNCX0J7QktCQ0KLQldCb0K8gPGJyPiDQmNCd0KTQntCg0JzQmNCg0KPQldCiINCeINCg0JXQl9Cj0JvQrNCi0JDQotCVINCg0JXQk9CY0KHQotCg0JDQptCY0JggPGJyPiDQn9CV0KDQldCl0J7QlCDQndCQINCh0KLQoNCQ0J3QmNCm0KMg0JDQo9Ci0JXQndCi0JjQpNCY0JrQkNCm0JjQmCAoICRsb2NhdGlvbi5wYXRoKCcvbG9naW4nKTsgKVxyXG4gICAgICAgICogQG1ldGhvZCByZWdpc3RlclxyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xyXG4gICAgICAgICAgICB2bS5kYXRhTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIFVzZXJTZXJ2aWNlLkNyZWF0ZSh2bS51c2VyKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmxhc2hTZXJ2aWNlLlN1Y2Nlc3MoJ1JlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvbG9naW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGbGFzaFNlcnZpY2UuRXJyb3IocmVzcG9uc2UubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmRhdGFMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvYXNzZXRzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbnRyb2xsZXIuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=