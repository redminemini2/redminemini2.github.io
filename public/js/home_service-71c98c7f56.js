!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};e.m=t,e.c=r,e.p="/js/",e(0)}([function(t,e){"use strict";!function(){function t(){var t={};return t.getResultFromJson=function(t){try{var e=new XMLHttpRequest;return e.open("GET",t,!1),e.send(),200!=e.status&&alert("Ошибка "+e.status+": "+e.statusText),JSON.parse(e.responseText)}catch(e){return getResultFromJsonNode(t)}},t}angular.module("app").factory("HomeService",t),t.$inject=[]}()}]);