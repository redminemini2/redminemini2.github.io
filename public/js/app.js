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

	    angular.module('app', ['ui.grid', 'ui.grid.selection', 'ngRoute', 'ngCookies', 'ui.sortable', 'ui.grid.exporter']).config(config).run(run);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGVlYjk4ZTcwNDQ3Y2I5YzE0NjMxIiwid2VicGFjazovLy9mcm9udGVuZC9qcy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGVlYjk4ZTcwNDQ3Y2I5YzE0NjMxIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0KDQmNCb0J7QltCV0J3QmNCVINCg0JDQl9Cg0JDQkdCQ0KLQq9CS0JDQmyDQmNCh0J/QntCb0KzQl9Cj0K8gKFdpbmRvd3MvQ2hyb21lL05vZGUgdjguOS4xKTo8YnI+XHJcbiAgICAgKiAxLiBndWxwOzxicj5cclxuICAgICAqIDIuIHdlYnBhY2s7PGJyPlxyXG4gICAgICogMy4gYnJvd3Nlci1zeW5jOzxicj5cclxuICAgICAqIDQuIGFuZ3VsYXJqczs8YnI+XHJcbiAgICAgKiA1LiB5dWlkb2M7XHJcbiAgICAgXHJcbiAgICAgKiDQotCe0KfQmtCQINCS0KXQntCU0JAgLSDQpNCQ0JnQmyBmcm9udGVuZC9qcy9hcHAuanMgKNGB0LDQvNC+0LLRi9C30YvQstCw0Y7RidCw0Y/RgdGPINGE0YPQvdC60YbQuNGPKS5cclxuXHJcbiAgICAgICAgYW5ndWxhclxyXG4gICAgICAgICAgICAubW9kdWxlKCdhcHAnLCAgWyd1aS5ncmlkJywgJ3VpLmdyaWQuc2VsZWN0aW9uJywgJ25nUm91dGUnLCAnbmdDb29raWVzJywgJ3VpLnNvcnRhYmxlJ10pXHJcbiAgICAgICAgICAgIC5jb25maWcoY29uZmlnKVxyXG4gICAgICAgICAgICAucnVuKHJ1bik7XHJcblxyXG4gICAgICogQGNsYXNzIEFQUFxyXG4gICAgICogQG1vZHVsZSBhcHBcclxuICAgICAqIEBtYWluIGFwcFxyXG4gICAgICovXHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcsICBbJ3VpLmdyaWQnLCAndWkuZ3JpZC5zZWxlY3Rpb24nLCAnbmdSb3V0ZScsICduZ0Nvb2tpZXMnLCAndWkuc29ydGFibGUnLCAndWkuZ3JpZC5leHBvcnRlciddKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKVxyXG4gICAgICAgIC5ydW4ocnVuKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqINCg0L7Rg9GC0LXRgFxyXG4gICAgICogQG1ldGhvZCBjb25maWdcclxuICAgICAqIEBwYXJhbSAkcm91dGVQcm92aWRlclxyXG4gICAgICogQHBhcmFtICRsb2NhdGlvblByb3ZpZGVyXHJcbiAgICAgKi9cclxuXHJcbiAgICBjb25maWcuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInXTtcclxuICAgIGZ1bmN0aW9uIGNvbmZpZygkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignLycsIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUvaG9tZS52aWV3Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAud2hlbignL2xvZ2luJywge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2xvZ2luL2xvZ2luLnZpZXcuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC53aGVuKCcvcmVnaXN0ZXInLCB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUmVnaXN0ZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVnaXN0ZXIvcmVnaXN0ZXIudmlldy5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLm90aGVyd2lzZSh7IHJlZGlyZWN0VG86ICcvbG9naW4nIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqINCh0L7RhdGA0LDQvdC40YLRjCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8g0L/QvtGB0LvQtSDQvtCx0L3QvtCy0LvQtdC90LjRjyDRgdGC0YDQsNC90LjRhtGLIDxicj4g0J/QtdGA0LXQvdCw0L/RgNCw0LLQu9GP0YLRjCDQvdCwINGB0YLRgNCw0L3QuNGG0YMg0LLRhdC+0LTQsCDQsiDRgdC40YHRgtC10LzRgywg0LXRgdC70Lgg0L3QtSDQsdGL0Lsg0LLRhdC+0LQg0LIg0YHQuNGB0YLQtdC80YNcclxuICAgICAqIEBtZXRob2QgcnVuXHJcbiAgICAgKiBAcGFyYW0gJHJvb3RTY29wZVxyXG4gICAgICogQHBhcmFtICRsb2NhdGlvblxyXG4gICAgICogQHBhcmFtICRjb29raWVzXHJcbiAgICAgKiBAcGFyYW0gJGh0dHBcclxuICAgICAqL1xyXG5cclxuICAgIHJ1bi4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICckY29va2llcycsICckaHR0cCddO1xyXG4gICAgZnVuY3Rpb24gcnVuKCRyb290U2NvcGUsICRsb2NhdGlvbiwgJGNvb2tpZXMsICRodHRwKSB7XHJcbiAgICAgICAgLy8ga2VlcCB1c2VyIGxvZ2dlZCBpbiBhZnRlciBwYWdlIHJlZnJlc2hcclxuICAgICAgICAkcm9vdFNjb3BlLmdsb2JhbHMgPSAkY29va2llcy5nZXRPYmplY3QoJ2dsb2JhbHMnKSB8fCB7fTtcclxuICAgICAgICBpZiAoJHJvb3RTY29wZS5nbG9iYWxzLmN1cnJlbnRVc2VyKSB7XHJcbiAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSAnQmFzaWMgJyArICRyb290U2NvcGUuZ2xvYmFscy5jdXJyZW50VXNlci5hdXRoZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdGFydCcsIGZ1bmN0aW9uIChldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG4gICAgICAgICAgICAvLyByZWRpcmVjdCB0byBsb2dpbiBwYWdlIGlmIG5vdCBsb2dnZWQgaW4gYW5kIHRyeWluZyB0byBhY2Nlc3MgYSByZXN0cmljdGVkIHBhZ2VcclxuICAgICAgICAgICAgdmFyIHJlc3RyaWN0ZWRQYWdlID0gJC5pbkFycmF5KCRsb2NhdGlvbi5wYXRoKCksIFsnL2xvZ2luJywgJy9yZWdpc3RlciddKSA9PT0gLTE7XHJcbiAgICAgICAgICAgIHZhciBsb2dnZWRJbiA9ICRyb290U2NvcGUuZ2xvYmFscy5jdXJyZW50VXNlcjtcclxuICAgICAgICAgICAgaWYgKHJlc3RyaWN0ZWRQYWdlICYmICFsb2dnZWRJbikge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v0JLQq9Ca0JvQrtCn0JDQldCcINCe0JbQmNCU0JDQndCY0JVcclxuICAgICAgICAkKFwiI2xvYWRlclwiKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICB9XHJcblxyXG59KSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9qcy9hcHAuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBO0FBQ0E7QUFJQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBT0E7QUFDQTtBQUNBO0FBSEE7QUFPQTtBQUNBO0FBQ0E7QUFIQTtBQU9BO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Iiwic291cmNlUm9vdCI6IiJ9