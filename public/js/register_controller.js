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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJfY29udHJvbGxlci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlZWI5OGU3MDQ0N2NiOWMxNDYzMT85NGIxKioqKioqIiwid2VicGFjazovLy9mcm9udGVuZC9hc3NldHMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZWViOThlNzA0NDdjYjljMTQ2MzEiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdSZWdpc3RlckNvbnRyb2xsZXInLCBSZWdpc3RlckNvbnRyb2xsZXIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiDQoNCV0JPQmNCh0KLQoNCQ0KbQmNCvINCf0J7Qm9Cs0JfQntCS0JDQotCV0JvQr1xyXG5cclxuICAgICAgICBhbmd1bGFyXHJcbiAgICAgICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgICAgIC5jb250cm9sbGVyKCdSZWdpc3RlckNvbnRyb2xsZXInLCBSZWdpc3RlckNvbnRyb2xsZXIpO1xyXG5cclxuICAgICAgICBSZWdpc3RlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCAgJyRsb2NhdGlvbicsICckcm9vdFNjb3BlJywgJ0ZsYXNoU2VydmljZSddO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBSZWdpc3RlckNvbnRyb2xsZXIoVXNlclNlcnZpY2UsICRsb2NhdGlvbiwgJHJvb3RTY29wZSwgRmxhc2hTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2bS5yZWdpc3RlciA9IHJlZ2lzdGVyO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5kYXRhTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBVc2VyU2VydmljZS5DcmVhdGUodm0udXNlcilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZsYXNoU2VydmljZS5TdWNjZXNzKCdSZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRmxhc2hTZXJ2aWNlLkVycm9yKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uZGF0YUxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICogQGNsYXNzIFJlZ2lzdGVyQ29udHJvbGxlclxyXG4gICAgKiBAbW9kdWxlIGFwcFxyXG4gICAgKiBAbWFpbiBSZWdpc3RlckNvbnRyb2xsZXJcclxuICAgICovXHJcblxyXG4gICAgUmVnaXN0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJywgICckbG9jYXRpb24nLCAnJHJvb3RTY29wZScsICdGbGFzaFNlcnZpY2UnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBSZWdpc3RlckNvbnRyb2xsZXIoVXNlclNlcnZpY2UsICRsb2NhdGlvbiwgJHJvb3RTY29wZSwgRmxhc2hTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0ucmVnaXN0ZXIgPSByZWdpc3RlcjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiByZWdpc3RlciA8YnI+INCh0J7Ql9CU0JDQldCiICjQoNCV0JPQmNCh0KLQoNCj0JXQoikg0J/QntCb0KzQl9Ce0JLQkNCi0JXQm9CvIDxicj4g0JjQndCk0J7QoNCc0JjQoNCj0JXQoiDQniDQoNCV0JfQo9Cb0KzQotCQ0KLQlSDQoNCV0JPQmNCh0KLQoNCQ0KbQmNCYIDxicj4g0J/QldCg0JXQpdCe0JQg0J3QkCDQodCi0KDQkNCd0JjQptCjINCQ0KPQotCV0J3QotCY0KTQmNCa0JDQptCY0JggKCAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7IClcclxuICAgICAgICAqIEBtZXRob2QgcmVnaXN0ZXJcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWdpc3RlcigpIHtcclxuICAgICAgICAgICAgdm0uZGF0YUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBVc2VyU2VydmljZS5DcmVhdGUodm0udXNlcilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZsYXNoU2VydmljZS5TdWNjZXNzKCdSZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmxhc2hTZXJ2aWNlLkVycm9yKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5kYXRhTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2Fzc2V0cy9yZWdpc3Rlci9yZWdpc3Rlci5jb250cm9sbGVyLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9