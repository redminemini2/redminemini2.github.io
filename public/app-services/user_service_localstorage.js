!function(){"use strict";function e(e,r,n){function t(e){var t=n.defer(),i=r("filter")(s(),{username:e}),o=i.length?i[0]:null;return t.resolve(o),t.promise}function s(){return localStorage.users||(localStorage.users=JSON.stringify([])),JSON.parse(localStorage.users)}function i(e){localStorage.users=JSON.stringify(e)}var o={};return o.GetAll=function(){var e=n.defer();return e.resolve(s()),e.promise},o.GetById=function(e){var t=n.defer(),i=r("filter")(s(),{id:e}),o=i.length?i[0]:null;return t.resolve(o),t.promise},o.GetByUsername=t,o.Create=function(r){var o=n.defer();return e(function(){t(r.username).then(function(e){if(null!==e)o.resolve({success:!1,message:'Username "'+r.username+'" is already taken'});else{var n=s(),t=n[n.length-1]||{id:0};r.id=t.id+1,n.push(r),i(n),o.resolve({success:!0})}})},1e3),o.promise},o.Update=function(e){for(var r=n.defer(),t=s(),o=0;o<t.length;o++)if(t[o].id===e.id){t[o]=e;break}return i(t),r.resolve(),r.promise},o.Delete=function(e){for(var r=n.defer(),t=s(),o=0;o<t.length;o++)if(t[o].id===e){t.splice(o,1);break}return i(t),r.resolve(),r.promise},o}angular.module("app").factory("UserService",e),e.$inject=["$timeout","$filter","$q"]}();