!function(e){function t(a){if(r[a])return r[a].exports;var n=r[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};t.m=e,t.c=r,t.p="/js/",t(0)}([function(e,t){"use strict";!function(){function e(e,r,a,n,o){var i={};return i.Login=function(e,t,r){n(function(){var a;o.GetByUsername(e).then(function(e){a=null!==e&&e.password===t?{success:!0}:{success:!1,message:"Username or password is incorrect"},r(a)})},1e3)},i.SetCredentials=function(n,o){var i=t.encode(n+":"+o);a.globals={currentUser:{username:n,authdata:i}},e.defaults.headers.common.Authorization="Basic "+i;var s=new Date;s.setDate(s.getDate()+7),r.putObject("globals",a.globals,{expires:s})},i.ClearCredentials=function(){a.globals={},r.remove("globals"),e.defaults.headers.common.Authorization="Basic"},i}angular.module("app").factory("AuthenticationService",e),e.$inject=["$http","$cookies","$rootScope","$timeout","UserService"];var t={keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t,r,a,n,o,i="",s="",c="",h=0;do{a=(t=e.charCodeAt(h++))>>2,n=(3&t)<<4|(r=e.charCodeAt(h++))>>4,o=(15&r)<<2|(s=e.charCodeAt(h++))>>6,c=63&s,isNaN(r)?o=c=64:isNaN(s)&&(c=64),i=i+this.keyStr.charAt(a)+this.keyStr.charAt(n)+this.keyStr.charAt(o)+this.keyStr.charAt(c),t=r=s="",a=n=o=c=""}while(h<e.length);return i},decode:function(e){var t,r,a,n,o="",i="",s="",c=0;/[^A-Za-z0-9\+\/\=]/g.exec(e)&&window.alert("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{t=this.keyStr.indexOf(e.charAt(c++))<<2|(a=this.keyStr.indexOf(e.charAt(c++)))>>4,r=(15&a)<<4|(n=this.keyStr.indexOf(e.charAt(c++)))>>2,i=(3&n)<<6|(s=this.keyStr.indexOf(e.charAt(c++))),o+=String.fromCharCode(t),64!=n&&(o+=String.fromCharCode(r)),64!=s&&(o+=String.fromCharCode(i)),t=r=i="",a=n=s=""}while(c<e.length);return o}}}()}]);