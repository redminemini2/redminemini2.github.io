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

	    /**
	     * ПРИЛОЖЕНИЕ РАЗРАБАТЫВАЛ ИСПОЛЬЗУЯ (Windows/Chrome/Node v8.9.1):<br>
	     * 1. gulp;<br>
	     * 2. webpack;<br>
	     * 3. browser-sync;<br>
	     * 4. angularjs;<br>
	     * 5. yuidoc;
	     
	     * ТОЧКА ВХОДА - ФАЙЛ frontend/js/app.js (самовызывающаяся функция).
	          angular
	            .module('app',  ['ui.grid', 'ui.grid.selection', 'ngRoute', 'ngCookies', 'ui.sortable'])
	            .config(config)
	            .run(run);
	       * @class APP
	     * @module app
	     * @main app
	     */

	    angular.module('app', ['ui.grid', 'ui.grid.selection', 'ngRoute', 'ngCookies', 'ui.sortable']).config(config).run(run);

	    /**
	     * Роутер
	     * @method config
	     * @param $routeProvider
	     * @param $locationProvider
	     */

	    config.$inject = ['$routeProvider', '$locationProvider'];
	    function config($routeProvider, $locationProvider) {
	        $routeProvider.when('/', {
	            controller: 'HomeController',
	            templateUrl: 'home/home.view.html',
	            controllerAs: 'vm'
	        }).when('/login', {
	            controller: 'LoginController',
	            templateUrl: 'login/login.view.html',
	            controllerAs: 'vm'
	        }).when('/register', {
	            controller: 'RegisterController',
	            templateUrl: 'register/register.view.html',
	            controllerAs: 'vm'
	        }).otherwise({ redirectTo: '/login' });
	    };

	    /**
	     * Сохранить пользователя после обновления страницы <br> Перенаправлять на страницу входа в систему, если не был вход в систему
	     * @method run
	     * @param $rootScope
	     * @param $location
	     * @param $cookies
	     * @param $http
	     */

	    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
	    function run($rootScope, $location, $cookies, $http) {
	        // keep user logged in after page refresh
	        $rootScope.globals = $cookies.getObject('globals') || {};
	        if ($rootScope.globals.currentUser) {
	            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
	        }

	        $rootScope.$on('$locationChangeStart', function (event, next, current) {
	            // redirect to login page if not logged in and trying to access a restricted page
	            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
	            var loggedIn = $rootScope.globals.currentUser;
	            if (restrictedPage && !loggedIn) {
	                $location.path('/login');
	            }
	        });

	        //ВЫКЛЮЧАЕМ ОЖИДАНИЕ
	        $("#loader").fadeToggle();
	    }
		})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDdiYzAzOTYzMWFlZTNlMjhiYjZlIiwid2VicGFjazovLy9mcm9udGVuZC9qcy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdiYzAzOTYzMWFlZTNlMjhiYjZlIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0KDQmNCb0J7QltCV0J3QmNCVINCg0JDQl9Cg0JDQkdCQ0KLQq9CS0JDQmyDQmNCh0J/QntCb0KzQl9Cj0K8gKFdpbmRvd3MvQ2hyb21lL05vZGUgdjguOS4xKTo8YnI+XHJcbiAgICAgKiAxLiBndWxwOzxicj5cclxuICAgICAqIDIuIHdlYnBhY2s7PGJyPlxyXG4gICAgICogMy4gYnJvd3Nlci1zeW5jOzxicj5cclxuICAgICAqIDQuIGFuZ3VsYXJqczs8YnI+XHJcbiAgICAgKiA1LiB5dWlkb2M7XHJcbiAgICAgXHJcbiAgICAgKiDQotCe0KfQmtCQINCS0KXQntCU0JAgLSDQpNCQ0JnQmyBmcm9udGVuZC9qcy9hcHAuanMgKNGB0LDQvNC+0LLRi9C30YvQstCw0Y7RidCw0Y/RgdGPINGE0YPQvdC60YbQuNGPKS5cclxuXHJcbiAgICAgICAgYW5ndWxhclxyXG4gICAgICAgICAgICAubW9kdWxlKCdhcHAnLCAgWyd1aS5ncmlkJywgJ3VpLmdyaWQuc2VsZWN0aW9uJywgJ25nUm91dGUnLCAnbmdDb29raWVzJywgJ3VpLnNvcnRhYmxlJ10pXHJcbiAgICAgICAgICAgIC5jb25maWcoY29uZmlnKVxyXG4gICAgICAgICAgICAucnVuKHJ1bik7XHJcblxyXG4gICAgICogQGNsYXNzIEFQUFxyXG4gICAgICogQG1vZHVsZSBhcHBcclxuICAgICAqIEBtYWluIGFwcFxyXG4gICAgICovXHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcsICBbJ3VpLmdyaWQnLCAndWkuZ3JpZC5zZWxlY3Rpb24nLCAnbmdSb3V0ZScsICduZ0Nvb2tpZXMnLCAndWkuc29ydGFibGUnXSlcclxuICAgICAgICAuY29uZmlnKGNvbmZpZylcclxuICAgICAgICAucnVuKHJ1bik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQoNC+0YPRgtC10YBcclxuICAgICAqIEBtZXRob2QgY29uZmlnXHJcbiAgICAgKiBAcGFyYW0gJHJvdXRlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSAkbG9jYXRpb25Qcm92aWRlclxyXG4gICAgICovXHJcblxyXG4gICAgY29uZmlnLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJ107XHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oJy8nLCB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdob21lL2hvbWUudmlldy5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLndoZW4oJy9sb2dpbicsIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdsb2dpbi9sb2dpbi52aWV3Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAud2hlbignL3JlZ2lzdGVyJywge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3JlZ2lzdGVyL3JlZ2lzdGVyLnZpZXcuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC5vdGhlcndpc2UoeyByZWRpcmVjdFRvOiAnL2xvZ2luJyB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQodC+0YXRgNCw0L3QuNGC0Ywg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPINC/0L7RgdC70LUg0L7QsdC90L7QstC70LXQvdC40Y8g0YHRgtGA0LDQvdC40YbRiyA8YnI+INCf0LXRgNC10L3QsNC/0YDQsNCy0LvRj9GC0Ywg0L3QsCDRgdGC0YDQsNC90LjRhtGDINCy0YXQvtC00LAg0LIg0YHQuNGB0YLQtdC80YMsINC10YHQu9C4INC90LUg0LHRi9C7INCy0YXQvtC0INCyINGB0LjRgdGC0LXQvNGDXHJcbiAgICAgKiBAbWV0aG9kIHJ1blxyXG4gICAgICogQHBhcmFtICRyb290U2NvcGVcclxuICAgICAqIEBwYXJhbSAkbG9jYXRpb25cclxuICAgICAqIEBwYXJhbSAkY29va2llc1xyXG4gICAgICogQHBhcmFtICRodHRwXHJcbiAgICAgKi9cclxuXHJcbiAgICBydW4uJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnJGNvb2tpZXMnLCAnJGh0dHAnXTtcclxuICAgIGZ1bmN0aW9uIHJ1bigkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRjb29raWVzLCAkaHR0cCkge1xyXG4gICAgICAgIC8vIGtlZXAgdXNlciBsb2dnZWQgaW4gYWZ0ZXIgcGFnZSByZWZyZXNoXHJcbiAgICAgICAgJHJvb3RTY29wZS5nbG9iYWxzID0gJGNvb2tpZXMuZ2V0T2JqZWN0KCdnbG9iYWxzJykgfHwge307XHJcbiAgICAgICAgaWYgKCRyb290U2NvcGUuZ2xvYmFscy5jdXJyZW50VXNlcikge1xyXG4gICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJ0Jhc2ljICcgKyAkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXIuYXV0aGRhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgLy8gcmVkaXJlY3QgdG8gbG9naW4gcGFnZSBpZiBub3QgbG9nZ2VkIGluIGFuZCB0cnlpbmcgdG8gYWNjZXNzIGEgcmVzdHJpY3RlZCBwYWdlXHJcbiAgICAgICAgICAgIHZhciByZXN0cmljdGVkUGFnZSA9ICQuaW5BcnJheSgkbG9jYXRpb24ucGF0aCgpLCBbJy9sb2dpbicsICcvcmVnaXN0ZXInXSkgPT09IC0xO1xyXG4gICAgICAgICAgICB2YXIgbG9nZ2VkSW4gPSAkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXI7XHJcbiAgICAgICAgICAgIGlmIChyZXN0cmljdGVkUGFnZSAmJiAhbG9nZ2VkSW4pIHtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvbG9naW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL9CS0KvQmtCb0K7Qp9CQ0JXQnCDQntCW0JjQlNCQ0J3QmNCVXHJcbiAgICAgICAgJChcIiNsb2FkZXJcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgfVxyXG5cclxufSkoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvanMvYXBwLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTtBQUNBO0FBSUE7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU9BO0FBQ0E7QUFDQTtBQUhBO0FBT0E7QUFDQTtBQUNBO0FBSEE7QUFPQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==