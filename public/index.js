!function(){"use strict";function e(e,t,s,i,n){function l(e){return 1!=g.user.id?g.resjsontasks.filter(t=>t.id_list==e&&t.id_user==g.user.id):g.resjsontasks.filter(t=>t.id_list==e)}function r(t){if(m)for(let e=0;e<t.length;e++)g["list_"+t[e].id]=l(t[e].id),g["list_"+t[e].id].name=t[e].name,g.rawScreens.push(g["list_"+t[e].id]);else e.GetByUsername(i.globals.currentUser.username).then(function(e){g.user=e;for(let e=0;e<t.length;e++)g["list_"+t[e].id]=l(t[e].id),g["list_"+t[e].id].name=t[e].name,g.rawScreens.push(g["list_"+t[e].id]);m=!0,function(){g.gridOptions={enableCellEdit:!1,enableColumnResizing:!0,enableFiltering:!0,showGridFooter:!0,onRegisterApi:function(e){g.gridApi=e},columnDefs:[]};let e,t=p.sort((e,t)=>e.sort-t.sort);for(let s=0;s<t.length;s++)"$$hashKey"!=t[s].id&&(e='{"field" : "'+t[s].id+'","displayName" : "'+p[s].gridname+'"}',g.gridOptions.columnDefs.push(JSON.parse(e)));let s=["id"];for(let e=0;e<s.length;e++)for(let t=0;t<g.gridOptions.columnDefs.length;t++)if(g.gridOptions.columnDefs[t].field==s[e])g.gridOptions.columnDefs[t].visible=!1;else{let e=c(p,g.gridOptions.columnDefs[t].field);g.gridOptions.columnDefs[t].displayName=p[e].gridname,g.gridOptions.columnDefs[t].width=p[e].width}let i="<i class='fa fa-pencil-square-o btn btn-success btn-sm' ng-click='grid.appScope.vm.my_alert(row.entity.id,row.entity.id_list,1)'></i>\"";e='{"field": "edit", "enableSorting": false, "displayName": "...", "width": 38, "cellTemplate": "'+i+"}",g.gridOptions.columnDefs.push(JSON.parse(e)),e='{"field": "delete", "enableSorting": false, "displayName": "...", "width": 38, "cellTemplate": "'+(i="<div><i class='fa fa-trash-o btn btn-danger btn-sm' ng-click='grid.appScope.vm.my_alert(row.entity.id,row.entity.id_list,0)'></div>\"")+"}",g.gridOptions.columnDefs.push(JSON.parse(e));let n;for(let t=0;t<g.gridOptions.columnDefs.length;t++)if("id_list"!=g.gridOptions.columnDefs[t].field&&"execution_status"!=g.gridOptions.columnDefs[t].field||(n="id_list"==g.gridOptions.columnDefs[t].field?'{"value": "1", "label": "План" }, { "value": "2", "label": "В процессе" }, { "value": "3", "label": "Готово"}':'{"value": "1", "label": "Ожидает" }, { "value": "2", "label": "В работе" }, { "value": "3", "label": "Выполнено"}',e='{"type" : "select","selectOptions"  : [ '+n+"]}",g.gridOptions.columnDefs[t].filter=JSON.parse(e),"id_list"==g.gridOptions.columnDefs[t].field?g.gridOptions.columnDefs[t].cellFilter="id_list":g.gridOptions.columnDefs[t].cellFilter="execution_status"),"edit"!=g.gridOptions.columnDefs[t].field&&"delete"!=g.gridOptions.columnDefs[t].field||(g.gridOptions.columnDefs[t].enableFiltering=!1),"id_user"==g.gridOptions.columnDefs[t].field){g.gridOptions.columnDefs[t].cellFilter="id_user";let s;1==g.user.id?g.allUsers.map(e=>s=s+'{"value": "'+e.id+'", "label": "'+e.username+'" },'):g.allUsers.map(e=>{e.id==g.user.id&&(s=s+'{"value": "'+e.id+'", "label": "'+e.username+'" },')}),e='{"type" : "select","selectOptions"  :  ['+s.slice(9,-1)+"]}",g.gridOptions.columnDefs[t].filter=JSON.parse(e)}d()}()})}function o(e,t){event.preventDefault(),g["list_"+e].splice(_.indexOf(g["list_"+e],_.find(g["list_"+e],function(e){return e.id===t})),1),1!=g.user.id?(g.resjsontasks.splice(_.indexOf(g.resjsontasks,_.find(g.resjsontasks,function(e){return e.id===t})),1),g.gridOptions.data=g.resjsontasks.filter(e=>e.id_user==g.user.id)):g.resjsontasks.splice(_.indexOf(g.resjsontasks,_.find(g.resjsontasks,function(e){return e.id===t})),1)}function a(){g.rawScreens=[],r(g.resgetJsonLists)}function d(){1!=g.user.id?g.gridOptions.data=g.resjsontasks.filter(e=>e.id_user==g.user.id):g.gridOptions.data=g.resjsontasks}function u(e,t,s){event.preventDefault();let i=_.find(g["list_"+e],function(e){return e.id===t});for(let e in i)g["html_"+e]=i[e];g.html_t_index=s+1,$("#openModal").fadeToggle()}function c(e,t){return $.map(e,function(e,s){if(e.id==t)return s})[0]}function f(){e.GetAll().then(function(e){g.allUsers=e,t.Users=g.allUsers})}var g=this;g.tasck_limit=15,g.ngGridView=null,g.user=null,g.allUsers=[],g.deleteUser=function(t){e.Delete(t).then(function(){f()})},g.exit_modal=function(){event.preventDefault(),$(".modalDialog").fadeToggle()},g.savetasck=function(e,t,s){if(event.preventDefault(),1==confirm("Сохранить?")){let e=c(g.resjsontasks,t);for(let t in g.resjsontasks[0])"$$hashKey"!=t&&("date"==t||"title"==t?"date"==t?g.resjsontasks[e].date=$("#dtpckr")[0].value:g.resjsontasks[e].title=$("#ttl")[0].value:g.resjsontasks[e][t]=g["html_"+t]);1==g.change&&(a(),d(),g.change=!1)}$(".modalDialog").fadeToggle()},g.edittasck=u,g.deltasck=o,g.addtasck=function(e){if(event.preventDefault(),g["list_"+e].length<g.tasck_limit){var t=g.resjsontasks[0];let s="{";for(let i in t)"id"!=i?"title"==i?s=s+'"'+i+'": "NewTasck '+e+h+'",':"id_list"==i?s=s+'"'+i+'": '+Number(e)+",":"id_user"==i?s=s+'"'+i+'": '+g.user.id+",":"description"==i||"date"==i?s="date"==i?s+'"'+i+'" : "08.12.2017",':s+'"'+i+'" : "1",':"$$hashKey"!=i&&(s=s+'"'+i+'" : 1,'):s=s+'"id" : '+Math.floor(Date.now()/1e3)+",";s=s.slice(0,-1),s+="}",g.resjsontasks.push(JSON.parse(s)),a(),d(),h++}},g.def_click=function(){event.preventDefault()},g.finish_loader=function(){$("#loader").is(":visible")&&$("#loader").fadeToggle()},g.start_loader=function(){$("#loader").is(":visible")||$("#loader").fadeToggle()},g.logModels=function(){g.sortingLog=[];for(let t=0;t<g.rawScreens.length;t++){var e=g.rawScreens[t].map(function(e){return e.title+"-"+e.id_list+"|"}).join(", ");e="container "+(t+1)+": "+e,g.sortingLog.push(e)}},g.my_alert=function(e,t,s="def"){if(0==s&&o(t,e),1==s){let s=null;for(let i=0;i<g["list_"+t].length;i++)g["list_"+t][i].id==e&&(s=i);u(t,e,s)}},g.change_list=function(){g.change=!0},g.change=!1,g.rawScreens=[],g.sortingLog=[],g.resjsontasks=[],g.resgetJsonLists=[],g.sortableOptions={placeholder:"app",connectWith:".apps-container",update:function(e,t){!t.item.sortable.received&&t.item.sortable.source[0]!==t.item.sortable.droptarget[0]&&t.item.sortable.droptargetModel.length>=g.tasck_limit&&t.item.sortable.cancel()},stop:function(e,t){for(let e=0;e<g.rawScreens.length;e++)g.rawScreens[e].map(function(t){t.id_list=e+1})}},g.status=[{id:1,name:"Ожидает"},{id:2,name:"В работе"},{id:3,name:"Выполнено"}],$("#dtpckr").datepicker();var p=[];let m=!1;f(),g.resgetJsonLists=t.getResultFromJson("db/listsName.json"),t.list=g.resgetJsonLists,g.resjsontasks=t.getResultFromJson("db/tasks.json"),p=t.getResultFromJson("db/gridname.json"),r(g.resgetJsonLists),g.getProductList=function(){if(g.gridOptions.data=g.resultSimulatedData,g.mySelectedRows=g.gridApi.selection.getSelectedRows(),g.mySelectedRows[0]){let e;for(let t=0;t<g.mySelectedRows.length;t++)e=e+"Выбрано : "+(t+1)+" ИД = "+g.mySelectedRows[t].id+", Лист = "+g.mySelectedRows[t].id_list+".\n";alert(e.slice(9))}else alert("Ничего не выбрано");n(function(){g.gridApi.selection.selectedRow&&g.gridApi.selection.selectRow(g.gridOptions.data[0])})};var h=0}function t(e,t,s){let i="{";for(let n=0;n<e.length;n++)i=i+'"'+e[n][t]+'": "'+e[n][s]+'", ';return i=i.slice(0,-2)+"}",JSON.parse(i)}angular.module("app").controller("HomeController",e).filter("id_list",function(e){var s=t(e.list,"id","name");return function(e){return e?s[e]:""}}).filter("execution_status",function(e){var t=e.status;return function(e){return e?t[e]:""}}).filter("id_user",function(e){var s=t(e.Users,"id","username");return function(e){return e?s[e]:""}}),e.$inject=["UserService","JsonService","uiGridConstants","$rootScope","$timeout"]}();