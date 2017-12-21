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

	    angular.module('app').factory('AuthenticationService', AuthenticationService);

	    /**
	    * @class ServiceAuthentication
	    * @module app
	    * @main ServiceAuthentication
	    */

	    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
	    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {
	        var service = {};

	        service.Login = Login;
	        service.SetCredentials = SetCredentials;
	        service.ClearCredentials = ClearCredentials;

	        return service;

	        function Login(username, password, callback) {

	            /* Dummy authentication for testing, uses $timeout to simulate api call
	             ----------------------------------------------*/
	            $timeout(function () {
	                var response;
	                UserService.GetByUsername(username).then(function (user) {
	                    if (user !== null && user.password === password) {
	                        response = { success: true };
	                    } else {
	                        response = { success: false, message: 'Username or password is incorrect' };
	                    }
	                    callback(response);
	                });
	            }, 1000);

	            /* Use this for real authentication
	             ----------------------------------------------*/
	            //$http.post('/api/authenticate', { username: username, password: password })
	            //    .success(function (response) {
	            //        callback(response);
	            //    });
	        }

	        function SetCredentials(username, password) {
	            var authdata = Base64.encode(username + ':' + password);

	            $rootScope.globals = {
	                currentUser: {
	                    username: username,
	                    authdata: authdata
	                }
	            };

	            // set default auth header for http requests
	            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

	            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
	            var cookieExp = new Date();
	            cookieExp.setDate(cookieExp.getDate() + 7);
	            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
	        }

	        function ClearCredentials() {
	            $rootScope.globals = {};
	            $cookies.remove('globals');
	            $http.defaults.headers.common.Authorization = 'Basic';
	        }
	    }

	    // Base64 encoding service used by AuthenticationService
	    var Base64 = {

	        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

	        encode: function encode(input) {
	            var output = "";
	            var chr1,
	                chr2,
	                chr3 = "";
	            var enc1,
	                enc2,
	                enc3,
	                enc4 = "";
	            var i = 0;

	            do {
	                chr1 = input.charCodeAt(i++);
	                chr2 = input.charCodeAt(i++);
	                chr3 = input.charCodeAt(i++);

	                enc1 = chr1 >> 2;
	                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
	                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
	                enc4 = chr3 & 63;

	                if (isNaN(chr2)) {
	                    enc3 = enc4 = 64;
	                } else if (isNaN(chr3)) {
	                    enc4 = 64;
	                }

	                output = output + this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) + this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
	                chr1 = chr2 = chr3 = "";
	                enc1 = enc2 = enc3 = enc4 = "";
	            } while (i < input.length);

	            return output;
	        },

	        decode: function decode(input) {
	            var output = "";
	            var chr1,
	                chr2,
	                chr3 = "";
	            var enc1,
	                enc2,
	                enc3,
	                enc4 = "";
	            var i = 0;

	            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	            var base64test = /[^A-Za-z0-9\+\/\=]/g;
	            if (base64test.exec(input)) {
	                window.alert("There were invalid base64 characters in the input text.\n" + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" + "Expect errors in decoding.");
	            }
	            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	            do {
	                enc1 = this.keyStr.indexOf(input.charAt(i++));
	                enc2 = this.keyStr.indexOf(input.charAt(i++));
	                enc3 = this.keyStr.indexOf(input.charAt(i++));
	                enc4 = this.keyStr.indexOf(input.charAt(i++));

	                chr1 = enc1 << 2 | enc2 >> 4;
	                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
	                chr3 = (enc3 & 3) << 6 | enc4;

	                output = output + String.fromCharCode(chr1);

	                if (enc3 != 64) {
	                    output = output + String.fromCharCode(chr2);
	                }
	                if (enc4 != 64) {
	                    output = output + String.fromCharCode(chr3);
	                }

	                chr1 = chr2 = chr3 = "";
	                enc1 = enc2 = enc3 = enc4 = "";
	            } while (i < input.length);

	            return output;
	        }
	    };
		})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb25zZXJ2aWNlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDdiYzAzOTYzMWFlZTNlMjhiYjZlP2YwZmUiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvYXV0aGVudGljYXRpb25zZXJ2aWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3YmMwMzk2MzFhZWUzZTI4YmI2ZSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsIEF1dGhlbnRpY2F0aW9uU2VydmljZSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEBjbGFzcyBTZXJ2aWNlQXV0aGVudGljYXRpb25cclxuICAgICogQG1vZHVsZSBhcHBcclxuICAgICogQG1haW4gU2VydmljZUF1dGhlbnRpY2F0aW9uXHJcbiAgICAqLyAgICBcclxuXHJcbiAgICBBdXRoZW50aWNhdGlvblNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJGNvb2tpZXMnLCAnJHJvb3RTY29wZScsICckdGltZW91dCcsICdVc2VyU2VydmljZSddO1xyXG4gICAgZnVuY3Rpb24gQXV0aGVudGljYXRpb25TZXJ2aWNlKCRodHRwLCAkY29va2llcywgJHJvb3RTY29wZSwgJHRpbWVvdXQsIFVzZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7fTtcclxuXHJcbiAgICAgICAgc2VydmljZS5Mb2dpbiA9IExvZ2luO1xyXG4gICAgICAgIHNlcnZpY2UuU2V0Q3JlZGVudGlhbHMgPSBTZXRDcmVkZW50aWFscztcclxuICAgICAgICBzZXJ2aWNlLkNsZWFyQ3JlZGVudGlhbHMgPSBDbGVhckNyZWRlbnRpYWxzO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gTG9naW4odXNlcm5hbWUsIHBhc3N3b3JkLCBjYWxsYmFjaykge1xyXG5cclxuICAgICAgICAgICAgLyogRHVtbXkgYXV0aGVudGljYXRpb24gZm9yIHRlc3RpbmcsIHVzZXMgJHRpbWVvdXQgdG8gc2ltdWxhdGUgYXBpIGNhbGxcclxuICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICBVc2VyU2VydmljZS5HZXRCeVVzZXJuYW1lKHVzZXJuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VyICE9PSBudWxsICYmIHVzZXIucGFzc3dvcmQgPT09IHBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHsgc3VjY2VzczogdHJ1ZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnVXNlcm5hbWUgb3IgcGFzc3dvcmQgaXMgaW5jb3JyZWN0JyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAvKiBVc2UgdGhpcyBmb3IgcmVhbCBhdXRoZW50aWNhdGlvblxyXG4gICAgICAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbiAgICAgICAgICAgIC8vJGh0dHAucG9zdCgnL2FwaS9hdXRoZW50aWNhdGUnLCB7IHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5zdWNjZXNzKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBTZXRDcmVkZW50aWFscyh1c2VybmFtZSwgcGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgdmFyIGF1dGhkYXRhID0gQmFzZTY0LmVuY29kZSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuZ2xvYmFscyA9IHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRVc2VyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhkYXRhOiBhdXRoZGF0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGRlZmF1bHQgYXV0aCBoZWFkZXIgZm9yIGh0dHAgcmVxdWVzdHNcclxuICAgICAgICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9ICdCYXNpYyAnICsgYXV0aGRhdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9yZSB1c2VyIGRldGFpbHMgaW4gZ2xvYmFscyBjb29raWUgdGhhdCBrZWVwcyB1c2VyIGxvZ2dlZCBpbiBmb3IgMSB3ZWVrIChvciB1bnRpbCB0aGV5IGxvZ291dClcclxuICAgICAgICAgICAgdmFyIGNvb2tpZUV4cCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGNvb2tpZUV4cC5zZXREYXRlKGNvb2tpZUV4cC5nZXREYXRlKCkgKyA3KTtcclxuICAgICAgICAgICAgJGNvb2tpZXMucHV0T2JqZWN0KCdnbG9iYWxzJywgJHJvb3RTY29wZS5nbG9iYWxzLCB7IGV4cGlyZXM6IGNvb2tpZUV4cCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIENsZWFyQ3JlZGVudGlhbHMoKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuZ2xvYmFscyA9IHt9O1xyXG4gICAgICAgICAgICAkY29va2llcy5yZW1vdmUoJ2dsb2JhbHMnKTtcclxuICAgICAgICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb24uQXV0aG9yaXphdGlvbiA9ICdCYXNpYyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEJhc2U2NCBlbmNvZGluZyBzZXJ2aWNlIHVzZWQgYnkgQXV0aGVudGljYXRpb25TZXJ2aWNlXHJcbiAgICB2YXIgQmFzZTY0ID0ge1xyXG5cclxuICAgICAgICBrZXlTdHI6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPScsXHJcblxyXG4gICAgICAgIGVuY29kZTogZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgY2hyMSwgY2hyMiwgY2hyMyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBlbmMxLCBlbmMyLCBlbmMzLCBlbmM0ID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgY2hyMSA9IGlucHV0LmNoYXJDb2RlQXQoaSsrKTtcclxuICAgICAgICAgICAgICAgIGNocjIgPSBpbnB1dC5jaGFyQ29kZUF0KGkrKyk7XHJcbiAgICAgICAgICAgICAgICBjaHIzID0gaW5wdXQuY2hhckNvZGVBdChpKyspO1xyXG5cclxuICAgICAgICAgICAgICAgIGVuYzEgPSBjaHIxID4+IDI7XHJcbiAgICAgICAgICAgICAgICBlbmMyID0gKChjaHIxICYgMykgPDwgNCkgfCAoY2hyMiA+PiA0KTtcclxuICAgICAgICAgICAgICAgIGVuYzMgPSAoKGNocjIgJiAxNSkgPDwgMikgfCAoY2hyMyA+PiA2KTtcclxuICAgICAgICAgICAgICAgIGVuYzQgPSBjaHIzICYgNjM7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKGNocjIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5jMyA9IGVuYzQgPSA2NDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNOYU4oY2hyMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmM0ID0gNjQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVN0ci5jaGFyQXQoZW5jMSkgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5U3RyLmNoYXJBdChlbmMyKSArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlTdHIuY2hhckF0KGVuYzMpICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVN0ci5jaGFyQXQoZW5jNCk7XHJcbiAgICAgICAgICAgICAgICBjaHIxID0gY2hyMiA9IGNocjMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZW5jMSA9IGVuYzIgPSBlbmMzID0gZW5jNCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKGkgPCBpbnB1dC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWNvZGU6IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGNocjEsIGNocjIsIGNocjMgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgZW5jMSwgZW5jMiwgZW5jMywgZW5jNCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBpID0gMDtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgQS1aLCBhLXosIDAtOSwgKywgLywgb3IgPVxyXG4gICAgICAgICAgICB2YXIgYmFzZTY0dGVzdCA9IC9bXkEtWmEtejAtOVxcK1xcL1xcPV0vZztcclxuICAgICAgICAgICAgaWYgKGJhc2U2NHRlc3QuZXhlYyhpbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIlRoZXJlIHdlcmUgaW52YWxpZCBiYXNlNjQgY2hhcmFjdGVycyBpbiB0aGUgaW5wdXQgdGV4dC5cXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJWYWxpZCBiYXNlNjQgY2hhcmFjdGVycyBhcmUgQS1aLCBhLXosIDAtOSwgJysnLCAnLycsYW5kICc9J1xcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIkV4cGVjdCBlcnJvcnMgaW4gZGVjb2RpbmcuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csIFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgZW5jMSA9IHRoaXMua2V5U3RyLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xyXG4gICAgICAgICAgICAgICAgZW5jMiA9IHRoaXMua2V5U3RyLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xyXG4gICAgICAgICAgICAgICAgZW5jMyA9IHRoaXMua2V5U3RyLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xyXG4gICAgICAgICAgICAgICAgZW5jNCA9IHRoaXMua2V5U3RyLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNocjEgPSAoZW5jMSA8PCAyKSB8IChlbmMyID4+IDQpO1xyXG4gICAgICAgICAgICAgICAgY2hyMiA9ICgoZW5jMiAmIDE1KSA8PCA0KSB8IChlbmMzID4+IDIpO1xyXG4gICAgICAgICAgICAgICAgY2hyMyA9ICgoZW5jMyAmIDMpIDw8IDYpIHwgZW5jNDtcclxuXHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbmMzICE9IDY0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlbmM0ICE9IDY0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjaHIxID0gY2hyMiA9IGNocjMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZW5jMSA9IGVuYzIgPSBlbmMzID0gZW5jNCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICB9IHdoaWxlIChpIDwgaW5wdXQubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn0pKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvYXV0aGVudGljYXRpb25zZXJ2aWNlLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQTlFQTtBQWlGQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==