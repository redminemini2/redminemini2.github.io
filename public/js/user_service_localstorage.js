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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9zZXJ2aWNlX2xvY2Fsc3RvcmFnZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2NjExYjRkZjc5ODFmY2VmNjVkOT9lZGVmKioqKioqIiwid2VicGFjazovLy9mcm9udGVuZC9hc3NldHMvYXBwLXNlcnZpY2VzL3VzZXJfc2VydmljZV9sb2NhbHN0b3JhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDY2MTFiNGRmNzk4MWZjZWY2NWQ5IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZmFjdG9yeSgnVXNlclNlcnZpY2UnLCBVc2VyU2VydmljZSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqINCS0JrQm9Cu0KfQldCdINCSIEhUTUxcclxuXHJcbiAgICAgICAgPCEtLUZha2UgdXNlciBzZXJ2aWNlIGZvciBkZW1vIHRoYXQgdXNlcyBsb2NhbCBzdG9yYWdlIC0tPlxyXG4gICAgICAgIDxzY3JpcHQgc3JjPVwianMvdXNlcl9zZXJ2aWNlX2xvY2Fsc3RvcmFnZS5qc1wiPjwvc2NyaXB0PlxyXG5cclxuICAgICogQGNsYXNzIFNlcnZpY2VVc2VybG9jYWxTdG9yYWdlXHJcbiAgICAqIEBtb2R1bGUgYXBwXHJcbiAgICAqIEBtYWluIFNlcnZpY2VVc2VybG9jYWxTdG9yYWdlXHJcbiAgICAqLyAgXHJcblxyXG5cclxuICAgIFVzZXJTZXJ2aWNlLiRpbmplY3QgPSBbJyR0aW1lb3V0JywgJyRmaWx0ZXInLCAnJHEnXTtcclxuICAgIGZ1bmN0aW9uIFVzZXJTZXJ2aWNlKCR0aW1lb3V0LCAkZmlsdGVyLCAkcSkge1xyXG5cclxuICAgICAgICB2YXIgc2VydmljZSA9IHt9O1xyXG5cclxuICAgICAgICBzZXJ2aWNlLkdldEFsbCA9IEdldEFsbDtcclxuICAgICAgICBzZXJ2aWNlLkdldEJ5SWQgPSBHZXRCeUlkO1xyXG4gICAgICAgIHNlcnZpY2UuR2V0QnlVc2VybmFtZSA9IEdldEJ5VXNlcm5hbWU7XHJcbiAgICAgICAgc2VydmljZS5DcmVhdGUgPSBDcmVhdGU7XHJcbiAgICAgICAgc2VydmljZS5VcGRhdGUgPSBVcGRhdGU7XHJcbiAgICAgICAgc2VydmljZS5EZWxldGUgPSBEZWxldGU7XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBHZXRBbGwoKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZ2V0VXNlcnMoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gR2V0QnlJZChpZCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSAkZmlsdGVyKCdmaWx0ZXInKShnZXRVc2VycygpLCB7IGlkOiBpZCB9KTtcclxuICAgICAgICAgICAgdmFyIHVzZXIgPSBmaWx0ZXJlZC5sZW5ndGggPyBmaWx0ZXJlZFswXSA6IG51bGw7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gR2V0QnlVc2VybmFtZSh1c2VybmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSAkZmlsdGVyKCdmaWx0ZXInKShnZXRVc2VycygpLCB7IHVzZXJuYW1lOiB1c2VybmFtZSB9KTtcclxuICAgICAgICAgICAgdmFyIHVzZXIgPSBmaWx0ZXJlZC5sZW5ndGggPyBmaWx0ZXJlZFswXSA6IG51bGw7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gQ3JlYXRlKHVzZXIpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNpbXVsYXRlIGFwaSBjYWxsIHdpdGggJHRpbWVvdXRcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgR2V0QnlVc2VybmFtZSh1c2VyLnVzZXJuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkdXBsaWNhdGVVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdXBsaWNhdGVVc2VyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdVc2VybmFtZSBcIicgKyB1c2VyLnVzZXJuYW1lICsgJ1wiIGlzIGFscmVhZHkgdGFrZW4nIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJzID0gZ2V0VXNlcnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhc3NpZ24gaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VXNlciA9IHVzZXJzW3VzZXJzLmxlbmd0aCAtIDFdIHx8IHsgaWQ6IDAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuaWQgPSBsYXN0VXNlci5pZCArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2F2ZSB0byBsb2NhbCBzdG9yYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2Vycy5wdXNoKHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXNlcnModXNlcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoeyBzdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBVcGRhdGUodXNlcikge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVzZXJzID0gZ2V0VXNlcnMoKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1c2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzW2ldLmlkID09PSB1c2VyLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcnNbaV0gPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFVzZXJzKHVzZXJzKTtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBEZWxldGUoaWQpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB1c2VycyA9IGdldFVzZXJzKCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB1c2VyID0gdXNlcnNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlci5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2Vycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VXNlcnModXNlcnMpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFVzZXJzKCkge1xyXG4gICAgICAgICAgICBpZighbG9jYWxTdG9yYWdlLnVzZXJzKXtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS51c2VycyA9IEpTT04uc3RyaW5naWZ5KFtdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLnVzZXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFVzZXJzKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS51c2VycyA9IEpTT04uc3RyaW5naWZ5KHVzZXJzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvdXNlcl9zZXJ2aWNlX2xvY2Fsc3RvcmFnZS5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7Ozs7Ozs7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=