!function(e){function n(r){if(o[r])return o[r].exports;var t=o[r]={exports:{},id:r,loaded:!1};return e[r].call(t.exports,t,t.exports,n),t.loaded=!0,t.exports}var o={};n.m=e,n.c=o,n.p="/js/",n(0)}([function(e,n){"use strict";!function(){function e(e,n,o){var r=this;r.login=function(){r.dataLoading=!0,n.Login(r.username,r.password,function(t){t.success?(n.SetCredentials(r.username,r.password),e.path("/")):(o.Error(t.message),r.dataLoading=!1)})},n.ClearCredentials()}angular.module("app").controller("LoginController",e),e.$inject=["$location","AuthenticationService","FlashService"]}()}]);