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

	    angular.module('app').factory('UserService', UserService);

	    /**
	    * ВКЛЮЧЕН В HTML
	          <!--Fake user service for demo that uses local storage -->
	        <script src="js/user_service_localstorage.js"></script>
	      * @class ServiceUserlocalStorage
	    * @module app
	    * @main ServiceUserlocalStorage
	    */

	    UserService.$inject = ['$timeout', '$filter', '$q'];
	    function UserService($timeout, $filter, $q) {

	        var service = {};

	        service.GetAll = GetAll;
	        service.GetById = GetById;
	        service.GetByUsername = GetByUsername;
	        service.Create = Create;
	        service.Update = Update;
	        service.Delete = Delete;

	        return service;

	        function GetAll() {
	            var deferred = $q.defer();
	            deferred.resolve(getUsers());
	            return deferred.promise;
	        }

	        function GetById(id) {
	            var deferred = $q.defer();
	            var filtered = $filter('filter')(getUsers(), { id: id });
	            var user = filtered.length ? filtered[0] : null;
	            deferred.resolve(user);
	            return deferred.promise;
	        }

	        function GetByUsername(username) {
	            var deferred = $q.defer();
	            var filtered = $filter('filter')(getUsers(), { username: username });
	            var user = filtered.length ? filtered[0] : null;
	            deferred.resolve(user);
	            return deferred.promise;
	        }

	        function Create(user) {
	            var deferred = $q.defer();

	            // simulate api call with $timeout
	            $timeout(function () {
	                GetByUsername(user.username).then(function (duplicateUser) {
	                    if (duplicateUser !== null) {
	                        deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
	                    } else {
	                        var users = getUsers();

	                        // assign id
	                        var lastUser = users[users.length - 1] || { id: 0 };
	                        user.id = lastUser.id + 1;

	                        // save to local storage
	                        users.push(user);
	                        setUsers(users);

	                        deferred.resolve({ success: true });
	                    }
	                });
	            }, 1000);

	            return deferred.promise;
	        }

	        function Update(user) {
	            var deferred = $q.defer();

	            var users = getUsers();
	            for (var i = 0; i < users.length; i++) {
	                if (users[i].id === user.id) {
	                    users[i] = user;
	                    break;
	                }
	            }
	            setUsers(users);
	            deferred.resolve();

	            return deferred.promise;
	        }

	        function Delete(id) {
	            var deferred = $q.defer();

	            var users = getUsers();
	            for (var i = 0; i < users.length; i++) {
	                var user = users[i];
	                if (user.id === id) {
	                    users.splice(i, 1);
	                    break;
	                }
	            }
	            setUsers(users);
	            deferred.resolve();

	            return deferred.promise;
	        }

	        // private functions

	        function getUsers() {
	            if (!localStorage.users) {
	                localStorage.users = JSON.stringify([]);
	            }

	            return JSON.parse(localStorage.users);
	        }

	        function setUsers(users) {
	            localStorage.users = JSON.stringify(users);
	        }
	    }
	})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9zZXJ2aWNlX2xvY2Fsc3RvcmFnZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlZWI5OGU3MDQ0N2NiOWMxNDYzMT85NGIxKioqKioqKiIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvYXNzZXRzL2FwcC1zZXJ2aWNlcy91c2VyX3NlcnZpY2VfbG9jYWxzdG9yYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZWI5OGU3MDQ0N2NiOWMxNDYzMSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ1VzZXJTZXJ2aWNlJywgVXNlclNlcnZpY2UpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiDQktCa0JvQrtCn0JXQnSDQkiBIVE1MXHJcblxyXG4gICAgICAgIDwhLS1GYWtlIHVzZXIgc2VydmljZSBmb3IgZGVtbyB0aGF0IHVzZXMgbG9jYWwgc3RvcmFnZSAtLT5cclxuICAgICAgICA8c2NyaXB0IHNyYz1cImpzL3VzZXJfc2VydmljZV9sb2NhbHN0b3JhZ2UuanNcIj48L3NjcmlwdD5cclxuXHJcbiAgICAqIEBjbGFzcyBTZXJ2aWNlVXNlcmxvY2FsU3RvcmFnZVxyXG4gICAgKiBAbW9kdWxlIGFwcFxyXG4gICAgKiBAbWFpbiBTZXJ2aWNlVXNlcmxvY2FsU3RvcmFnZVxyXG4gICAgKi8gIFxyXG5cclxuXHJcbiAgICBVc2VyU2VydmljZS4kaW5qZWN0ID0gWyckdGltZW91dCcsICckZmlsdGVyJywgJyRxJ107XHJcbiAgICBmdW5jdGlvbiBVc2VyU2VydmljZSgkdGltZW91dCwgJGZpbHRlciwgJHEpIHtcclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7fTtcclxuXHJcbiAgICAgICAgc2VydmljZS5HZXRBbGwgPSBHZXRBbGw7XHJcbiAgICAgICAgc2VydmljZS5HZXRCeUlkID0gR2V0QnlJZDtcclxuICAgICAgICBzZXJ2aWNlLkdldEJ5VXNlcm5hbWUgPSBHZXRCeVVzZXJuYW1lO1xyXG4gICAgICAgIHNlcnZpY2UuQ3JlYXRlID0gQ3JlYXRlO1xyXG4gICAgICAgIHNlcnZpY2UuVXBkYXRlID0gVXBkYXRlO1xyXG4gICAgICAgIHNlcnZpY2UuRGVsZXRlID0gRGVsZXRlO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gR2V0QWxsKCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGdldFVzZXJzKCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIEdldEJ5SWQoaWQpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkID0gJGZpbHRlcignZmlsdGVyJykoZ2V0VXNlcnMoKSwgeyBpZDogaWQgfSk7XHJcbiAgICAgICAgICAgIHZhciB1c2VyID0gZmlsdGVyZWQubGVuZ3RoID8gZmlsdGVyZWRbMF0gOiBudWxsO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIEdldEJ5VXNlcm5hbWUodXNlcm5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkID0gJGZpbHRlcignZmlsdGVyJykoZ2V0VXNlcnMoKSwgeyB1c2VybmFtZTogdXNlcm5hbWUgfSk7XHJcbiAgICAgICAgICAgIHZhciB1c2VyID0gZmlsdGVyZWQubGVuZ3RoID8gZmlsdGVyZWRbMF0gOiBudWxsO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIENyZWF0ZSh1c2VyKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzaW11bGF0ZSBhcGkgY2FsbCB3aXRoICR0aW1lb3V0XHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIEdldEJ5VXNlcm5hbWUodXNlci51c2VybmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZHVwbGljYXRlVXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHVwbGljYXRlVXNlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnVXNlcm5hbWUgXCInICsgdXNlci51c2VybmFtZSArICdcIiBpcyBhbHJlYWR5IHRha2VuJyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VycyA9IGdldFVzZXJzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXNzaWduIGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdFVzZXIgPSB1c2Vyc1t1c2Vycy5sZW5ndGggLSAxXSB8fCB7IGlkOiAwIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmlkID0gbGFzdFVzZXIuaWQgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhdmUgdG8gbG9jYWwgc3RvcmFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcnMucHVzaCh1c2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVzZXJzKHVzZXJzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHsgc3VjY2VzczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gVXBkYXRlKHVzZXIpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB1c2VycyA9IGdldFVzZXJzKCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2Vyc1tpXS5pZCA9PT0gdXNlci5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJzW2ldID0gdXNlcjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRVc2Vycyh1c2Vycyk7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gRGVsZXRlKGlkKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdXNlcnMgPSBnZXRVc2VycygpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXNlciA9IHVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXIuaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFVzZXJzKHVzZXJzKTtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRVc2VycygpIHtcclxuICAgICAgICAgICAgaWYoIWxvY2FsU3RvcmFnZS51c2Vycyl7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UudXNlcnMgPSBKU09OLnN0cmluZ2lmeShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS51c2Vycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRVc2Vycyh1c2Vycykge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UudXNlcnMgPSBKU09OLnN0cmluZ2lmeSh1c2Vycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9hc3NldHMvYXBwLXNlcnZpY2VzL3VzZXJfc2VydmljZV9sb2NhbHN0b3JhZ2UuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7Ozs7OztBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9