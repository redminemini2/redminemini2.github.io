!function(){"use strict";function t(){var t={};return t.getResultFromJson=function(t){try{var e=new XMLHttpRequest;return e.open("GET",t,!1),e.send(),200!=e.status&&alert("Ошибка "+e.status+": "+e.statusText),JSON.parse(e.responseText)}catch(e){return getResultFromJsonNode(t)}},t}angular.module("app").factory("HomeService",t),t.$inject=[]}();