!function(o){function e(t){if(r[t])return r[t].exports;var l=r[t]={exports:{},id:t,loaded:!1};return o[t].call(l.exports,l,l.exports,e),l.loaded=!0,l.exports}var r={};e.m=o,e.c=r,e.p="/js/",e(0)}([function(o,e){"use strict";!function(){function o(o,e){o.when("/",{controller:"HomeController",templateUrl:"home/home.view.html",controllerAs:"vm"}).when("/login",{controller:"LoginController",templateUrl:"login/login.view.html",controllerAs:"vm"}).when("/register",{controller:"RegisterController",templateUrl:"register/register.view.html",controllerAs:"vm"}).otherwise({redirectTo:"/login"})}function e(o,e,r,t){o.globals=r.getObject("globals")||{},o.globals.currentUser&&(t.defaults.headers.common.Authorization="Basic "+o.globals.currentUser.authdata),o.$on("$locationChangeStart",function(r,t,l){var n=-1===$.inArray(e.path(),["/login","/register"]),i=o.globals.currentUser;n&&!i&&e.path("/login")}),$("#loader").fadeToggle()}angular.module("app",["ui.grid","ui.grid.selection","ngRoute","ngCookies","ui.sortable","ui.grid.exporter","ui.grid.pagination"]).config(o).run(e),o.$inject=["$routeProvider","$locationProvider"],e.$inject=["$rootScope","$location","$cookies","$http"]}()}]);