!function(e){function r(t){if(n[t])return n[t].exports;var s=n[t]={exports:{},id:t,loaded:!1};return e[t].call(s.exports,s,s.exports,r),s.loaded=!0,s.exports}var n={};r.m=e,r.c=n,r.p="/js/",r(0)}([function(e,r){"use strict";!function(){function e(e,r,n){function t(e){var t=n.defer(),o=r("filter")(s(),{username:e}),i=o.length?o[0]:null;return t.resolve(i),t.promise}function s(){return localStorage.users||(localStorage.users=JSON.stringify([])),JSON.parse(localStorage.users)}function o(e){localStorage.users=JSON.stringify(e)}var i={};return i.GetAll=function(){var e=n.defer();return e.resolve(s()),e.promise},i.GetById=function(e){var t=n.defer(),o=r("filter")(s(),{id:e}),i=o.length?o[0]:null;return t.resolve(i),t.promise},i.GetByUsername=t,i.Create=function(r){var i=n.defer();return e(function(){t(r.username).then(function(e){if(null!==e)i.resolve({success:!1,message:'Username "'+r.username+'" is already taken'});else{var n=s(),t=n[n.length-1]||{id:0};r.id=t.id+1,n.push(r),o(n),i.resolve({success:!0})}})},1e3),i.promise},i.Update=function(e){for(var r=n.defer(),t=s(),i=0;i<t.length;i++)if(t[i].id===e.id){t[i]=e;break}return o(t),r.resolve(),r.promise},i.Delete=function(e){for(var r=n.defer(),t=s(),i=0;i<t.length;i++)if(t[i].id===e){t.splice(i,1);break}return o(t),r.resolve(),r.promise},i}angular.module("app").factory("UserService",e),e.$inject=["$timeout","$filter","$q"]}()}]);