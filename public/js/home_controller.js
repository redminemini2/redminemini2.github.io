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

	    angular.module('app').controller('HomeController', HomeController).filter('id_list', id_list).filter('execution_status', execution_status).filter('id_user', id_user);

	    /**
	    * ПРЕДОСТАВЛЕНИЕ ДАННЫХ В ВИДЕ DRAG&DROP И ng-GRID
	        
	        (function () {
	            angular
	                .module('app')
	                .controller('HomeController', HomeController)
	                .filter('id_list', id_list)
	                .filter('execution_status', execution_status)
	                .filter('id_user', id_user)
	               HomeController.$inject = ['UserService', 'JsonService', 'uiGridConstants','$rootScope', '$timeout'];
	            ........
	      * @class HomeController
	    * @module app
	    * @main HomeController
	    */

	    HomeController.$inject = ['UserService', 'JsonService', 'uiGridConstants', '$rootScope', '$timeout'];

	    function HomeController(UserService, JsonService, uiGridConstants, $rootScope, $timeout) {
	        var vm = this;

	        /*========================ВСЕ ЧТО НУЖНО ДЛЯ HTML========================*/
	        /**
	         * <p>ВСЕ ЧТО "ПРЕДАЕТСЯ"" В HTML</p>
	            vm.tasck_limit = 15;
	            vm.ngGridView = null;
	              vm.user = null;
	            vm.allUsers = [];
	            vm.deleteUser = deleteUser;
	              vm.exit_modal = exit_modal;
	            vm.savetasck = savetasck;
	            vm.edittasck = edittasck;
	            vm.deltasck = deltasck;
	            vm.addtasck = addtasck;
	            vm.def_click = def_click;
	            vm.finish_loader = finish_loader;
	            vm.start_loader = start_loader;
	            vm.logModels = logModels;
	            vm.my_alert = my_alert;
	            vm.change_list = change_list;
	            vm.change = false;
	              vm.rawScreens = [];
	            vm.sortingLog = [];
	              vm.resjsontasks = [];
	            vm.resgetJsonLists = [];
	              vm.sortableOptions = {
	                placeholder: "app",
	                connectWith: ".apps-container",
	                update: function(event, ui) {
	                  if (// ensure we are in the first update() callback
	                      !ui.item.sortable.received &&
	                      // check that its an actual moving
	                      // between the two lists
	                      ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0] &&
	                      // check the size limitation
	                      ui.item.sortable.droptargetModel.length >= vm.tasck_limit) {
	                    ui.item.sortable.cancel();
	                  }
	                },
	                stop: function(event, ui) {
	                  //!!! ОБНОВЛЯЕМ id_list У ПЕРЕМЕЩЕННОЙ ЗАДАЧИ !!!
	                  // var str = Number(ui.item.sortable.droptargetList[0].attributes.id.value.slice(7,10));
	                  // ui.item.sortable.model.id_list = str + 1
	                  
	                  for (let i = 0; i < vm.rawScreens.length; i++) {
	                    vm.rawScreens[i].map(function (x) {
	                        // console.log(x);
	                        x.id_list = i + 1; 
	                    })
	                  }
	                }
	            }; 
	              vm.status = [
	                {id: 1, name:'Ожидает'},
	                {id: 2, name:'В работе'},
	                {id: 3, name:'Выполнено'},
	            ];
	              $('#dtpckr').datepicker();
	              var gridnameJsonLists = [];
	            let curUser = false;
	           * @property ДАННЫЕ ДЛЯ HTML
	         * @type Object
	         * @static
	         * @final
	         */
	        vm.tasck_limit = 15;
	        vm.ngGridView = null;

	        vm.user = null;
	        vm.allUsers = [];
	        vm.deleteUser = deleteUser;

	        vm.exit_modal = exit_modal;
	        vm.savetasck = savetasck;
	        vm.edittasck = edittasck;
	        vm.deltasck = deltasck;
	        vm.addtasck = addtasck;
	        vm.def_click = def_click;
	        vm.finish_loader = finish_loader;
	        vm.start_loader = start_loader;
	        vm.logModels = logModels;
	        vm.my_alert = my_alert;
	        vm.change_list = change_list;
	        vm.change = false;

	        vm.rawScreens = [];
	        vm.sortingLog = [];

	        vm.resjsontasks = [];
	        vm.resgetJsonLists = [];

	        vm.sortableOptions = {
	            placeholder: "app",
	            connectWith: ".apps-container",
	            update: function update(event, ui) {
	                if ( // ensure we are in the first update() callback
	                !ui.item.sortable.received &&
	                // check that its an actual moving
	                // between the two lists
	                ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0] &&
	                // check the size limitation
	                ui.item.sortable.droptargetModel.length >= vm.tasck_limit) {
	                    ui.item.sortable.cancel();
	                }
	            },
	            stop: function stop(event, ui) {
	                var _loop = function _loop(i) {
	                    vm.rawScreens[i].map(function (x) {
	                        // console.log(x);
	                        x.id_list = i + 1;
	                    });
	                };

	                //!!! ОБНОВЛЯЕМ id_list У ПЕРЕМЕЩЕННОЙ ЗАДАЧИ !!!
	                // var str = Number(ui.item.sortable.droptargetList[0].attributes.id.value.slice(7,10));
	                // ui.item.sortable.model.id_list = str + 1

	                for (var i = 0; i < vm.rawScreens.length; i++) {
	                    _loop(i);
	                }
	            }
	        };

	        vm.status = [{ id: 1, name: 'Ожидает' }, { id: 2, name: 'В работе' }, { id: 3, name: 'Выполнено' }];
	        /*=====================================================================*/

	        $('#dtpckr').datepicker();

	        var gridnameJsonLists = [];
	        var curUser = false;
	        /*==============================ИНИЦИАЦИЯ==============================*/
	        //ИНИЦИИРУЕМ КОНТРОЛЛЕР
	        initController();

	        //АГРЕГАТНАЯ ФУНКЦИЯ ИНИЦИИ КОНТРОЛЛЕРА СОСТОИТ ИЗ НЕСКОЛЬКИХ "ВЫЗЫВАЮЩИХ"" ФУНКЦИЙ
	        function initController() {

	            //ЗАГРУЖАЕМ ВСЕХ ЮЗЕРОВ ФАБРИКА UserService
	            loadAllUsers(); //frontend/assets/app-services/user.service.js

	            // ИМПОРТИРУЕМ СПИСОК ЛИСТОВ ФАБРИКА UserService
	            getJsonLists(); //frontend/assets/app-services/json_service.js

	            //ИМПОРТИРУЕМ СПИСОК ЗАДАЧ ФАБРИКА UserService 
	            getJsonTasks(); //frontend/assets/app-services/json_service.js

	            // ИМПОРТИРУЕМ СПИСОК ИМЕН СТОЛБЦОВ ГРИДА
	            getJsonGridname();

	            //ЗАГРУЖАЕМ ТЕКУЩЕГО ЮЗЕРА + СОЗДАЕМ СОДЕРЖИМОЕ ДЛЯ ДРАГнДРОП ЛИСТОВ
	            createSheets(vm.resgetJsonLists);
	        };
	        /*==========================ОПЕРАТИВНЫЕ ФУНКЦИИ==========================*/

	        //ФУНКЦИЯ ИМПОРТА СПИСКА ИМЕН ПОЛЕЙ ГРИДА
	        function getJsonGridname() {
	            gridnameJsonLists = JsonService.getResultFromJson('db/gridname.json');
	        };

	        //ФУНКЦИЯ ИМПОРТА СПИСКА ЛИСТОВ
	        function getJsonLists() {
	            vm.resgetJsonLists = JsonService.getResultFromJson('db/listsName.json');
	            JsonService.list = vm.resgetJsonLists;
	        };

	        //ФУНКЦИЯ ИМПОРТА СПИСКА ЗАДАЧ
	        function getJsonTasks() {
	            vm.resjsontasks = JsonService.getResultFromJson('db/tasks.json');
	        };

	        /**
	         * @description ФУНКЦИОНАЛ makeList (id_list):<br>
	         * ВОЗВРАЩАЕТ ОТФИЛЬТРОВАННЫЙ ПО ПОЛЯМ: id_list/id_user МАССИВ ЗАДАЧ<br>
	                
	                function makeList (id_list) {
	                    var filter_resjsontasks = [];
	                    if(vm.user.id != 1) {
	                        filter_resjsontasks = vm.resjsontasks.filter(item => item.id_list == id_list && item.id_user == vm.user.id);
	                    }else{
	                        filter_resjsontasks = vm.resjsontasks.filter(item => item.id_list == id_list);
	                    }
	                    return filter_resjsontasks;
	                };
	           * @method makeList
	         * @param {Integer} id_list ID ЛИСТА
	         * @return {Object} filter_resjsontasks
	         */
	        function makeList(id_list) {
	            var filter_resjsontasks = [];
	            if (vm.user.id != 1) {
	                filter_resjsontasks = vm.resjsontasks.filter(function (item) {
	                    return item.id_list == id_list && item.id_user == vm.user.id;
	                });
	            } else {
	                filter_resjsontasks = vm.resjsontasks.filter(function (item) {
	                    return item.id_list == id_list;
	                });
	            }
	            return filter_resjsontasks;
	        };

	        /**
	         * @description ФУНКЦИОНАЛ createSheets (resgetJsonLists):<br>
	         * ЦИКЛОМ СОЗДАЮТСЯ ЛИСТЫ. ЛИСТАМ ПРИСВАИВАЕТСЯ ИМЯ И ID<br> СОЗДАННЫЕ ЛИСТЫ ДОБАВЛЯЮТСЯ В МАССИВ vm.rawScreens
	                
	                function createSheets(resgetJsonLists){
	                    if(!curUser){
	                        UserService.GetByUsername($rootScope.globals.currentUser.username)
	                        .then(function (user) {
	                            // console.log('user', user);
	                            vm.user = user;
	                            for(let i=0; i < resgetJsonLists.length; i++){
	                                vm['list_' + resgetJsonLists[i].id] = makeList(resgetJsonLists[i].id);
	                                vm['list_' + resgetJsonLists[i].id].name = resgetJsonLists[i].name;
	                                vm.rawScreens.push(vm['list_' + resgetJsonLists[i].id]);
	                            };
	                            curUser = true;
	                            //СОЗДАЁМ ГРИД
	                            initGrid();
	                        });
	                    }else{
	                        for(let i=0; i < resgetJsonLists.length; i++){
	                            vm['list_' + resgetJsonLists[i].id] = makeList(resgetJsonLists[i].id);
	                            vm['list_' + resgetJsonLists[i].id].name = resgetJsonLists[i].name;
	                            vm.rawScreens.push(vm['list_' + resgetJsonLists[i].id]);
	                        };
	                    }
	                };
	           * ПРИ ПЕРВОМ ПРОХОДЕ СОЗДАЕМ ГРИД 
	         * @method createSheets
	         * @param {Object} resgetJsonLists МАССИВ ИМЕН ЛИСТОВ
	         */
	        //ФУНКЦИЯ СОЗДАНИЯ ЛИСТОВ
	        function createSheets(resgetJsonLists) {
	            if (!curUser) {
	                UserService.GetByUsername($rootScope.globals.currentUser.username).then(function (user) {
	                    // console.log('user', user);
	                    vm.user = user;
	                    for (var i = 0; i < resgetJsonLists.length; i++) {
	                        vm['list_' + resgetJsonLists[i].id] = makeList(resgetJsonLists[i].id);
	                        vm['list_' + resgetJsonLists[i].id].name = resgetJsonLists[i].name;
	                        vm.rawScreens.push(vm['list_' + resgetJsonLists[i].id]);
	                    };
	                    curUser = true;
	                    //СОЗДАЁМ ГРИД
	                    initGrid();
	                });
	            } else {
	                for (var i = 0; i < resgetJsonLists.length; i++) {
	                    vm['list_' + resgetJsonLists[i].id] = makeList(resgetJsonLists[i].id);
	                    vm['list_' + resgetJsonLists[i].id].name = resgetJsonLists[i].name;
	                    vm.rawScreens.push(vm['list_' + resgetJsonLists[i].id]);
	                };
	            }
	        };

	        /**
	         * @description ФУНКЦИОНАЛ initGrid ():<br>
	         * 1. vm.ngGridView - ОТОБРАЖАЕТ ГРИД В HTML<br>
	         * 2. vm.status - МАССИВ СТАТУСОВ ЗАДАЧИ (myCelTemp1 - SELECT ИЗ vm.status)<br>
	         * 3. vm.dragndrop_list - МАССИВ ЛИСТОВ (myCelTemp2 - SELECT ИЗ vm.dragndrop_list) <br>
	         * 4. ВЫВОД ПОЛЕЙ В GRID ПО ПОРЯДКУ СОРТИРОВКИ ПОЛЯ sort МАССИВА ridnameJsonLists<br>
	         * 5. ДЛЯ ОТОБРАЖЕНИЯ В ТАБЛИЦЕ СОЗДАЕМ "СТРОКОВЫЙ ОБЪЕКТ"- str И ПУШИМ ЕГО В columnDefs
	            
	            for(let j=0; j < tt.length; j++){
	                if(tt[j].id != "$$hashKey") {
	                        str = '{"field" : "' + tt[j].id + '"' + ',' + '"displayName" : "' + gridnameJsonLists[j].gridname + '"}' 
	                        vm.gridOptions.columnDefs.push(JSON.parse(str)); 
	                };
	            };
	           * 6. СКРЫВАЕМ ПОЛЕ ЕСЛИ ОНО ПРИСУТСТВУЕТ В МАССИВЕ notVisible ДЛЯ ОСТАЛЬНЫХ - ПЕРЕИМЕНОВЫВАЕМ ПОЛЯ ГРИДА
	            
	            let notVisible = ['id'];//'id_list'
	              //СКРЫВАЕМ ПОЛЕ ЕСЛИ ОНО ПРИСУТСТВУЕТ В МАССИВЕ notVisible ДЛЯ ОСТАЛЬНЫХ - ПЕРЕИМЕНОВЫВАЕМ ПОЛЯ ГРИДА
	            for(let j=0; j < notVisible.length; j++){
	                for(let i=0; i < vm.gridOptions.columnDefs.length; i++){
	                    if(vm.gridOptions.columnDefs[i].field == notVisible[j]){
	                        vm.gridOptions.columnDefs[i].visible = false;
	                    }else{
	                        //НАХОДИМ ПО id (j) ИНДЕКС ЗАДАЧИ В МАССИВЕ vm.resjsontasks
	                        let firstIndex = find_index_by_id(gridnameJsonLists, vm.gridOptions.columnDefs[i].field);
	                        vm.gridOptions.columnDefs[i].displayName = gridnameJsonLists[firstIndex].gridname;
	                        vm.gridOptions.columnDefs[i].width = gridnameJsonLists[firstIndex].width;
	                    }
	                }
	            };
	           * 7. ДОБАВЛЯЕМ КНОПКИ РЕДАКТИРОВАНИЯ И УДАЛЕНИЯ
	         * 8. ДОБАВЛЯЕММ ФИЛЬТРЫ  И ОТМЕНЯЕМ ФИЛЬТРЫ ДЛЯ КНОПОК
	              for(let j=0; j < vm.gridOptions.columnDefs.length; j++){
	                
	                if(vm.gridOptions.columnDefs[j].field == "id_list" || vm.gridOptions.columnDefs[j].field == "execution_status"){
	                    if(vm.gridOptions.columnDefs[j].field == "id_list") {
	                        myFilter = myList
	                    } else  {
	                        myFilter = myStatus
	                    }
	                      str = '{' 
	                        + '"type" : "select",' 
	                        + '"selectOptions"  : [ '
	                        + myFilter 
	                    + ']}'
	                      vm.gridOptions.columnDefs[j].filter = JSON.parse(str);
	                      if(vm.gridOptions.columnDefs[j].field == "id_list") {
	                        vm.gridOptions.columnDefs[j].cellFilter = 'id_list';
	                    }else{
	                        vm.gridOptions.columnDefs[j].cellFilter = 'execution_status';
	                    }
	                  };
	                  if(vm.gridOptions.columnDefs[j].field == "edit" || vm.gridOptions.columnDefs[j].field == "delete") vm.gridOptions.columnDefs[j].enableFiltering = false;
	                if(vm.gridOptions.columnDefs[j].field == "id_user") {
	                    vm.gridOptions.columnDefs[j].cellFilter = 'id_user';
	                    
	                    let dropDown;
	                      if(vm.user.id == 1) {
	                        vm.allUsers.map(item => dropDown = dropDown + '{"value": "' + item.id + '", "label": "' + item.username + '" },');
	                    }else{
	                        vm.allUsers.map(item => {
	                            if(item.id == vm.user.id) {
	                                dropDown = dropDown + '{"value": "' + item.id + '", "label": "' + item.username + '" },'
	                            }
	                        })
	                    }
	                    
	                    str = '{' 
	                        + '"type" : "select",' 
	                        + '"selectOptions"  :  ['
	                        + dropDown.slice(9,-1) 
	                    + ']}';
	                      vm.gridOptions.columnDefs[j].filter = JSON.parse(str);
	                }
	            };
	           * @method initGrid
	         */
	        //ФУНКЦИЯ СОЗДАНИЯ ГРИДА
	        function initGrid() {
	            vm.gridOptions = {
	                enableCellEdit: false,
	                enableColumnResizing: true,
	                enableFiltering: true,
	                showGridFooter: true,
	                onRegisterApi: function onRegisterApi(gridApi) {
	                    vm.gridApi = gridApi;
	                },
	                columnDefs: []
	            };

	            var str = void 0;

	            /* СОРТИРУЕМ gridnameJsonLists ДЛЯ ОТОБРАЖЕНИЯ СТОЛБЦОВ ЗАДАЧ В СООТВЕТСТВИЕ С ПОЛЕМ sort gridnameJsonLists */
	            var tt = gridnameJsonLists.sort(function (a, b) {
	                return a.sort - b.sort;
	            });

	            /*ДЛЯ ОТОБРАЖЕНИЯ В ТАБЛИЦЕ СОЗДАЕМ "СТРОКОВЫЙ ОБЪЕКТ"- str
	            И ПУШИМ ЕГО В columnDefs*/
	            for (var j = 0; j < tt.length; j++) {
	                if (tt[j].id != "$$hashKey") {
	                    str = '{"field" : "' + tt[j].id + '"' + ',' + '"displayName" : "' + gridnameJsonLists[j].gridname + '"}';
	                    vm.gridOptions.columnDefs.push(JSON.parse(str));
	                };
	            };

	            var notVisible = ['id']; //'id_list'

	            //СКРЫВАЕМ ПОЛЕ ЕСЛИ ОНО ПРИСУТСТВУЕТ В МАССИВЕ notVisible ДЛЯ ОСТАЛЬНЫХ - ПЕРЕИМЕНОВЫВАЕМ ПОЛЯ ГРИДА
	            for (var _j = 0; _j < notVisible.length; _j++) {
	                for (var i = 0; i < vm.gridOptions.columnDefs.length; i++) {
	                    if (vm.gridOptions.columnDefs[i].field == notVisible[_j]) {
	                        vm.gridOptions.columnDefs[i].visible = false;
	                    } else {
	                        //НАХОДИМ ПО id (j) ИНДЕКС ЗАДАЧИ В МАССИВЕ vm.resjsontasks
	                        var firstIndex = find_index_by_id(gridnameJsonLists, vm.gridOptions.columnDefs[i].field);
	                        vm.gridOptions.columnDefs[i].displayName = gridnameJsonLists[firstIndex].gridname;
	                        vm.gridOptions.columnDefs[i].width = gridnameJsonLists[firstIndex].width;
	                    }
	                }
	            };

	            /*ДОБАВЛЯЕМ КНОПКУ РЕДАКТИРОВАНИЯ*/
	            var che = '<i class=\'fa fa-pencil-square-o btn btn-success btn-sm\' ng-click=\'grid.appScope.vm.my_alert(row.entity.id,row.entity.id_list,1)\'></i>"';
	            str = '{"field": "edit", "enableSorting": false, "displayName": "...", "width": 38, "cellTemplate": "' + che + '}';
	            // console.log(str); 
	            vm.gridOptions.columnDefs.push(JSON.parse(str));

	            /*ДОБАВЛЯЕМ КНОПКУ УДАЛЕНИЯ*/
	            che = '<div><i class=\'fa fa-trash-o btn btn-danger btn-sm\' ng-click=\'grid.appScope.vm.my_alert(row.entity.id,row.entity.id_list,0)\'></div>"';
	            str = '{"field": "delete", "enableSorting": false, "displayName": "...", "width": 38, "cellTemplate": "' + che + '}';
	            vm.gridOptions.columnDefs.push(JSON.parse(str));

	            var myList = '{"value": "1", "label": "План" }, { "value": "2", "label": "В процессе" }, { "value": "3", "label": "Готово"}';
	            var myStatus = '{"value": "1", "label": "Ожидает" }, { "value": "2", "label": "В работе" }, { "value": "3", "label": "Выполнено"}';
	            var myFilter = void 0;

	            //ДОБАВЛЯЕММ ФИЛЬТРЫ  И ОТМЕНЯЕМ ФИЛЬТРЫ ДЛЯ КНОПОК
	            for (var _j2 = 0; _j2 < vm.gridOptions.columnDefs.length; _j2++) {

	                if (vm.gridOptions.columnDefs[_j2].field == "id_list" || vm.gridOptions.columnDefs[_j2].field == "execution_status") {
	                    if (vm.gridOptions.columnDefs[_j2].field == "id_list") {
	                        myFilter = myList;
	                    } else {
	                        myFilter = myStatus;
	                    }

	                    str = '{' + '"type" : "select",' + '"selectOptions"  : [ ' + myFilter + ']}';

	                    vm.gridOptions.columnDefs[_j2].filter = JSON.parse(str);

	                    if (vm.gridOptions.columnDefs[_j2].field == "id_list") {
	                        vm.gridOptions.columnDefs[_j2].cellFilter = 'id_list';
	                    } else {
	                        vm.gridOptions.columnDefs[_j2].cellFilter = 'execution_status';
	                    }
	                };

	                if (vm.gridOptions.columnDefs[_j2].field == "edit" || vm.gridOptions.columnDefs[_j2].field == "delete") vm.gridOptions.columnDefs[_j2].enableFiltering = false;
	                if (vm.gridOptions.columnDefs[_j2].field == "id_user") {
	                    (function () {
	                        vm.gridOptions.columnDefs[_j2].cellFilter = 'id_user';

	                        var dropDown = void 0;

	                        if (vm.user.id == 1) {
	                            vm.allUsers.map(function (item) {
	                                return dropDown = dropDown + '{"value": "' + item.id + '", "label": "' + item.username + '" },';
	                            });
	                        } else {
	                            vm.allUsers.map(function (item) {
	                                if (item.id == vm.user.id) {
	                                    dropDown = dropDown + '{"value": "' + item.id + '", "label": "' + item.username + '" },';
	                                }
	                            });
	                        }

	                        str = '{' + '"type" : "select",' + '"selectOptions"  :  [' + dropDown.slice(9, -1) + ']}';

	                        vm.gridOptions.columnDefs[_j2].filter = JSON.parse(str);
	                    })();
	                }
	            };

	            refresh_grid();
	        };

	        vm.getProductList = function () {
	            vm.gridOptions.data = vm.resultSimulatedData;
	            vm.mySelectedRows = vm.gridApi.selection.getSelectedRows(); //<--Property undefined error here

	            if (vm.mySelectedRows[0]) {
	                var al = void 0;
	                for (var i = 0; i < vm.mySelectedRows.length; i++) {
	                    al = al + 'Выбрано : ' + (i + 1) + ' ИД = ' + vm.mySelectedRows[i].id + ', Лист = ' + vm.mySelectedRows[i].id_list + '.\n';
	                }
	                alert(al.slice(9));
	            } else {
	                alert('Ничего не выбрано');
	            }

	            $timeout(function () {
	                if (vm.gridApi.selection.selectedRow) {
	                    vm.gridApi.selection.selectRow(vm.gridOptions.data[0]);
	                }
	            });
	        };

	        function my_alert(id, l) {
	            var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'def';

	            // console.log(vm.allUsers);
	            if (type == 0) {
	                deltasck(l, id);
	            }
	            if (type == 1) {
	                //НАЙТИ НОМЕР п.п. ЭТО НУЖНО ТОЛЬКО ДЛЯ АПДЕЙТА ДОБАВЛЕННЫХ ЗАДАЧ
	                var n = null;
	                for (var i = 0; i < vm['list_' + l].length; i++) {
	                    if (vm['list_' + l][i].id == id) {
	                        n = i;
	                    }
	                };
	                edittasck(l, id, n);
	            };
	        };

	        //ФУНКЦИЯ ВЫВОДА СОДЕРЖИМОГО ЛИСТОВ 
	        function logModels() {
	            vm.sortingLog = [];
	            for (var i = 0; i < vm.rawScreens.length; i++) {
	                var logEntry = vm.rawScreens[i].map(function (x) {
	                    return x.title + '-' + x.id_list + '|';
	                }).join(', ');
	                logEntry = 'container ' + (i + 1) + ': ' + logEntry;
	                vm.sortingLog.push(logEntry);
	            }
	        };

	        //ФУНКЦИЯ УДАЛЕНИЯ ЗАДАЧИ ИЗ ЛИСТА(!ДЛЯ ЭТОЙ ЗАДАЧИ НУЖНО ПОДКЛЮЧИТЬ LODASH !!!)
	        function deltasck(i, j) {
	            event.preventDefault();
	            // vm['list_' + i].splice(j, 1);
	            vm['list_' + i].splice(_.indexOf(vm['list_' + i], _.find(vm['list_' + i], function (item) {
	                return item.id === j;
	            })), 1);

	            if (vm.user.id != 1) {
	                vm.resjsontasks.splice(_.indexOf(vm.resjsontasks, _.find(vm.resjsontasks, function (item) {
	                    return item.id === j;
	                })), 1);
	                vm.gridOptions.data = vm.resjsontasks.filter(function (item) {
	                    return item.id_user == vm.user.id;
	                });
	            } else {
	                vm.resjsontasks.splice(_.indexOf(vm.resjsontasks, _.find(vm.resjsontasks, function (item) {
	                    return item.id === j;
	                })), 1);
	            }
	        };

	        function refresh_rawScreens() {
	            vm.rawScreens = [];
	            createSheets(vm.resgetJsonLists);
	        };

	        function refresh_grid() {
	            if (vm.user.id != 1) {
	                vm.gridOptions.data = vm.resjsontasks.filter(function (item) {
	                    return item.id_user == vm.user.id;
	                });
	            } else {
	                vm.gridOptions.data = vm.resjsontasks;
	            }
	        };

	        var tasck_count = 0;

	        /**
	         * @description ФУНКЦИОНАЛ addtasck (i):<br>
	         * 1. ФОРМИРУЕТ ИЗ СТРОКИ ОБЪЕКТ-ЗАДАЧУ<br> 
	         * 2. ДОБАВЛЯЕТ ОБЪЕКТ В vm.resjsontasks <br>
	         * 3. ОБНОВЛЯЕТ vm.rawScreens И ГРИД
	         * @method addtasck
	         * @param {Integer} i НОМЕР ЛИСТА DRAG&DROP
	         */
	        //ФУНКЦИЯ ДОБАВЛЕНИЯ ЗАДАЧИ 
	        function addtasck(i) {
	            event.preventDefault();

	            if (vm['list_' + i].length < vm.tasck_limit) {
	                var addTasck = vm.resjsontasks[0];

	                //СОЗДАЕМ "СТРОКОВЫЙ ОБЪЕКТ"- str ДЛЯ ДАЛЬНЕЙШЕГО JSON.parse(str)
	                var str = '{';
	                for (var k in addTasck) {
	                    if (k != "id") {
	                        if (k == "title") {
	                            str = str + '"' + k + '"' + ': "NewTasck ' + i + tasck_count + '",';
	                        } else {
	                            if (k == "id_list") {
	                                str = str + '"' + k + '"' + ': ' + Number(i) + ',';
	                            } else if (k == "id_user") {
	                                str = str + '"' + k + '"' + ': ' + vm.user.id + ',';
	                            } else if (k == "description" || k == "date") {
	                                if (k == "date") {
	                                    str = str + '"' + k + '"' + ' : "08.12.2017"' + ',';
	                                } else {
	                                    str = str + '"' + k + '"' + ' : "1"' + ',';
	                                }
	                            } else {
	                                if (k != "$$hashKey") str = str + '"' + k + '"' + ' : 1' + ',';
	                            }
	                        }
	                    } else {
	                        str = str + '"id" : ' + Math.floor(Date.now() / 1000) + ',';
	                    }
	                };
	                str = str.slice(0, -1);
	                str = str + '}';

	                vm.resjsontasks.push(JSON.parse(str));

	                refresh_rawScreens();

	                refresh_grid();

	                tasck_count++;
	            }
	        };

	        /**
	         * @description ФУНКЦИОНАЛ edittasck (i, j, t_index):<br>
	         * ОТКРЫТИЕ ЗАДАЧИ ДЛЯ ПОДРОБНОГО ПРОСМОТРА И ВОЗМОЖНОГО РЕДАКТИРОВАНИЯ
	         * @method edittasck
	         * @param {Integer} i НОМЕР ЛИСТА DRAG&DROP
	         * @param {Integer} j id ЗАДАЧИ
	         * @param {Integer} t_index ПОРЯДКОВЫЙ НОМЕР ЗАДАЧИ В DRAG&DROP
	         */
	        //ФУНКЦИЯ ПРОСМОТРА ЗАДАЧИ 
	        function edittasck(i, j, t_index) {
	            event.preventDefault();
	            //ФИЛЬТРУЕМ ПО ЛИСТУ И ИД ЗАДАЧИ
	            var f = _.find(vm['list_' + i], function (item) {
	                return item.id === j;
	            });

	            //ВСЕ "КЛЮЧИ" С ДАННЫМИ ЗАГОНЯЕМ В ПЕРЕМЕННЫЕ ФОРМЫ
	            for (var k in f) {
	                vm['html_' + k] = f[k];
	            };
	            vm['html_t_index'] = t_index + 1;

	            //ОТКРЫВАЕММ ДИАЛОГОВОЕ ОКНО
	            $("#openModal").fadeToggle();
	        };

	        function change_list() {
	            vm.change = true;
	        }

	        /**
	         * @description ФУНКЦИОНАЛ find_index_by_id(source, id) :<br>
	         * ПОИСК ИНДЕКСА ЗАДАЧИ В МАССИВЕ ПЕРЕДАННОГО ОБЪЕКТА - source ПО ПЕРЕДАННОМУ id
	                function find_index_by_id(source,id){
	                    let indexes = $.map(source, function(obj, index) {
	                            if(obj.id == id) {
	                                return index;
	                            }
	                        }) 
	                    return indexes[0];
	                };
	         * @method find_index_by_id
	         * @param {Object} source МАССИВ ОБЪЕКТОВ
	         * @param {Integer} index id ЗАДАЧИ
	         * @return {Integer} НАЙДЕННЫЙ ИНДЕКС
	         */
	        //ФУНКЦИЯ ПОИСКА ПО ИД
	        function find_index_by_id(source, id) {
	            var indexes = $.map(source, function (obj, index) {
	                if (obj.id == id) {
	                    return index;
	                }
	            });
	            return indexes[0];
	        };

	        /**
	         * @method savetasck
	         * @description ФУНКЦИОНАЛ savetasck() :<br>
	         * 1. ПОИСК ИНДЕКСА ЗАДАЧИ В МАССИВЕ vm.resjsontasks<br> 
	         * 2. ОБНОВЛЕНИЕ ПОЛЕЙ В ЗАДАЧЕ (ИЗ МАССИВА vm.resjsontasks)<br>
	         * 3. ЕСЛИ БЫЛ ИЗМЕНЕН СТАТУС ЗАДАЧИ - ОБНОВЛЕНИЕ МАССИВА vm.rawScreens<br>
	         */
	        //ФУНКЦИЯ СОХРАНЕНИЯ ЗАДАЧИ
	        function savetasck(i, j, t_index) {
	            event.preventDefault();
	            if (confirm("Сохранить?") == true) {

	                //НАХОДИМ ПО id (j) ИНДЕКС ЗАДАЧИ В МАССИВЕ vm.resjsontasks
	                var firstIndex = find_index_by_id(vm.resjsontasks, j);

	                for (var k in vm.resjsontasks[0]) {
	                    if (k != "$$hashKey") {
	                        if (k == "date" || k == "title") {
	                            if (k == "date") {
	                                vm.resjsontasks[firstIndex]["date"] = $('#dtpckr')[0].value;
	                            } else {
	                                vm.resjsontasks[firstIndex]["title"] = $('#ttl')[0].value;
	                                // console.log($('#ttl')[0].value);
	                            }
	                        } else {
	                            vm.resjsontasks[firstIndex][k] = vm['html_' + k];
	                        }
	                        /*? СПЕЦИАЛЬНО ДЛЯ ОБНОВЛЕНИЯ !!! ТОЛЬКО ДОБАВЛЕННЫХ ЗАДАЧ В drag&drop */
	                        // vm['list_' + i][t_index - 1][k] = vm['html_' + k];
	                    };
	                };

	                if (vm.change == true) {
	                    // console.log(vm.change);
	                    refresh_rawScreens();

	                    refresh_grid();

	                    vm.change = false;
	                    // console.log(vm.change);              
	                };
	            };

	            // console.log(vm.resjsontasks);
	            $(".modalDialog").fadeToggle();
	        };

	        //ФУНКЦИЯ ВЫХОДА ИЗ modalDialog БЕЗ СОХРАНЕНИЯ ДАННЫХХ
	        function exit_modal() {
	            event.preventDefault();
	            $(".modalDialog").fadeToggle();
	        };

	        function def_click() {
	            event.preventDefault();
	        };

	        //ФУНКЦИЯ СКРЫТИЯ ИНДИКАТОРА ОЖИДАНИЯ
	        function finish_loader() {
	            if ($("#loader").is(":visible")) {
	                $("#loader").fadeToggle();
	            }
	        };

	        //ФУНКЦИЯ ВИЗУАЛИЗАЦИИ ИНДИКАТОРА ОЖИДАНИЯ
	        function start_loader() {
	            if (!$("#loader").is(":visible")) {
	                $("#loader").fadeToggle();
	            }
	        };

	        //ФУНКЦИЯ ЗАГРУЗКИ ТЕКУЩЕГО ЮЗЕРА 
	        function loadCurrentUser() {
	            UserService.GetByUsername($rootScope.globals.currentUser.username).then(function (user) {
	                vm.user = user;
	            });
	        };

	        //ФУНКЦИЯ ЗАГРУЗКИ ВСЕХ ЮЗЕРОВ 
	        function loadAllUsers() {
	            UserService.GetAll().then(function (users) {
	                vm.allUsers = users;
	                JsonService.Users = vm.allUsers;
	            });
	        };

	        //ФУНКЦИЯ УДАЛЕНИЯ ЮЗЕРА 
	        function deleteUser(id) {
	            UserService.Delete(id).then(function () {
	                loadAllUsers();
	            });
	        };
	    };

	    /*===================ФИЛЬТРЫ ДЛЯ ЗАМЕНЫ ДАННЫХ В ГРИДЕ===================*/

	    //КОНВЕРТАЦИЯ МАССИВА ОБЪЕКТОВ В ОБЪЕКТ ДЛЯ ФИЛЬТРОВ
	    function create_obj_for_filter(obj, obj_id, obj_field) {
	        var objFilter = '{';
	        for (var j = 0; j < obj.length; j++) {
	            objFilter = objFilter + '"' + obj[j][obj_id] + '"' + ': ' + '"' + obj[j][obj_field] + '"' + ', ';
	        };

	        objFilter = objFilter.slice(0, -2) + '}';
	        return JSON.parse(objFilter);
	    };

	    //ЗАМЕНА ДАННЫХ В ГРИДЕ (ПОЛЕ - id_list)
	    function id_list(JsonService) {
	        var id_listHash = create_obj_for_filter(JsonService.list, 'id', 'name');

	        return function (input) {
	            if (!input) {
	                return '';
	            } else {
	                return id_listHash[input];
	            }
	        };
	    };

	    //ЗАМЕНА ДАННЫХ В ГРИДЕ (ПОЛЕ - execution_status)
	    function execution_status(JsonService) {
	        var execution_statusHash = JsonService.status;

	        return function (input) {
	            if (!input) {
	                return '';
	            } else {
	                return execution_statusHash[input];
	            }
	        };
	    };

	    //ЗАМЕНА ДАННЫХ В ГРИДЕ (ПОЛЕ - id_user)
	    function id_user(JsonService) {
	        var id_usertHash = create_obj_for_filter(JsonService.Users, 'id', 'username');

	        return function (input) {
	            if (!input) {
	                return '';
	            } else {
	                return id_usertHash[input];
	            }
	        };
	    }
		})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZV9jb250cm9sbGVyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDdiYzAzOTYzMWFlZTNlMjhiYjZlP2YwZmUqKiIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvYXNzZXRzL2hvbWUvaG9tZS5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3YmMwMzk2MzFhZWUzZTI4YmI2ZSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgSG9tZUNvbnRyb2xsZXIpXHJcbiAgICAgICAgLmZpbHRlcignaWRfbGlzdCcsIGlkX2xpc3QpXHJcbiAgICAgICAgLmZpbHRlcignZXhlY3V0aW9uX3N0YXR1cycsIGV4ZWN1dGlvbl9zdGF0dXMpXHJcbiAgICAgICAgLmZpbHRlcignaWRfdXNlcicsIGlkX3VzZXIpXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog0J/QoNCV0JTQntCh0KLQkNCS0JvQldCd0JjQlSDQlNCQ0J3QndCr0KUg0JIg0JLQmNCU0JUgRFJBRyZEUk9QINCYIG5nLUdSSURcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyXHJcbiAgICAgICAgICAgICAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAgICAgICAgICAgICAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBIb21lQ29udHJvbGxlcilcclxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCdpZF9saXN0JywgaWRfbGlzdClcclxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCdleGVjdXRpb25fc3RhdHVzJywgZXhlY3V0aW9uX3N0YXR1cylcclxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCdpZF91c2VyJywgaWRfdXNlcilcclxuXHJcbiAgICAgICAgICAgICAgICAgSG9tZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCAnSnNvblNlcnZpY2UnLCAndWlHcmlkQ29uc3RhbnRzJywnJHJvb3RTY29wZScsICckdGltZW91dCddO1xyXG4gICAgICAgICAgICAgICAgLi4uLi4uLi5cclxuXHJcbiAgICAgICAgKiBAY2xhc3MgSG9tZUNvbnRyb2xsZXJcclxuICAgICAgICAqIEBtb2R1bGUgYXBwXHJcbiAgICAgICAgKiBAbWFpbiBIb21lQ29udHJvbGxlclxyXG4gICAgICAgICovXHJcblxyXG4gICAgSG9tZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCAnSnNvblNlcnZpY2UnLCAndWlHcmlkQ29uc3RhbnRzJywnJHJvb3RTY29wZScsICckdGltZW91dCddO1xyXG5cclxuICAgIGZ1bmN0aW9uIEhvbWVDb250cm9sbGVyKFVzZXJTZXJ2aWNlLCBKc29uU2VydmljZSwgdWlHcmlkQ29uc3RhbnRzLCAkcm9vdFNjb3BlLCAkdGltZW91dCkge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT3QktCh0JUg0KfQotCeINCd0KPQltCd0J4g0JTQm9CvIEhUTUw9PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIDxwPtCS0KHQlSDQp9Ci0J4gXCLQn9Cg0JXQlNCQ0JXQotCh0K9cIlwiINCSIEhUTUw8L3A+XHJcbiAgICAgICAgICAgIHZtLnRhc2NrX2xpbWl0ID0gMTU7XHJcbiAgICAgICAgICAgIHZtLm5nR3JpZFZpZXcgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgdm0udXNlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHZtLmFsbFVzZXJzID0gW107XHJcbiAgICAgICAgICAgIHZtLmRlbGV0ZVVzZXIgPSBkZWxldGVVc2VyO1xyXG5cclxuICAgICAgICAgICAgdm0uZXhpdF9tb2RhbCA9IGV4aXRfbW9kYWw7XHJcbiAgICAgICAgICAgIHZtLnNhdmV0YXNjayA9IHNhdmV0YXNjaztcclxuICAgICAgICAgICAgdm0uZWRpdHRhc2NrID0gZWRpdHRhc2NrO1xyXG4gICAgICAgICAgICB2bS5kZWx0YXNjayA9IGRlbHRhc2NrO1xyXG4gICAgICAgICAgICB2bS5hZGR0YXNjayA9IGFkZHRhc2NrO1xyXG4gICAgICAgICAgICB2bS5kZWZfY2xpY2sgPSBkZWZfY2xpY2s7XHJcbiAgICAgICAgICAgIHZtLmZpbmlzaF9sb2FkZXIgPSBmaW5pc2hfbG9hZGVyO1xyXG4gICAgICAgICAgICB2bS5zdGFydF9sb2FkZXIgPSBzdGFydF9sb2FkZXI7XHJcbiAgICAgICAgICAgIHZtLmxvZ01vZGVscyA9IGxvZ01vZGVscztcclxuICAgICAgICAgICAgdm0ubXlfYWxlcnQgPSBteV9hbGVydDtcclxuICAgICAgICAgICAgdm0uY2hhbmdlX2xpc3QgPSBjaGFuZ2VfbGlzdDtcclxuICAgICAgICAgICAgdm0uY2hhbmdlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB2bS5yYXdTY3JlZW5zID0gW107XHJcbiAgICAgICAgICAgIHZtLnNvcnRpbmdMb2cgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZtLnJlc2pzb250YXNrcyA9IFtdO1xyXG4gICAgICAgICAgICB2bS5yZXNnZXRKc29uTGlzdHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZtLnNvcnRhYmxlT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcImFwcFwiLFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdFdpdGg6IFwiLmFwcHMtY29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoLy8gZW5zdXJlIHdlIGFyZSBpbiB0aGUgZmlyc3QgdXBkYXRlKCkgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICF1aS5pdGVtLnNvcnRhYmxlLnJlY2VpdmVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGF0IGl0cyBhbiBhY3R1YWwgbW92aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBiZXR3ZWVuIHRoZSB0d28gbGlzdHNcclxuICAgICAgICAgICAgICAgICAgICAgIHVpLml0ZW0uc29ydGFibGUuc291cmNlWzBdICE9PSB1aS5pdGVtLnNvcnRhYmxlLmRyb3B0YXJnZXRbMF0gJiZcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRoZSBzaXplIGxpbWl0YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgIHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldE1vZGVsLmxlbmd0aCA+PSB2bS50YXNja19saW1pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpLml0ZW0uc29ydGFibGUuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdG9wOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgICAgLy8hISEg0J7QkdCd0J7QktCb0K/QldCcIGlkX2xpc3Qg0KMg0J/QldCg0JXQnNCV0KnQldCd0J3QntCZINCX0JDQlNCQ0KfQmCAhISFcclxuICAgICAgICAgICAgICAgICAgLy8gdmFyIHN0ciA9IE51bWJlcih1aS5pdGVtLnNvcnRhYmxlLmRyb3B0YXJnZXRMaXN0WzBdLmF0dHJpYnV0ZXMuaWQudmFsdWUuc2xpY2UoNywxMCkpO1xyXG4gICAgICAgICAgICAgICAgICAvLyB1aS5pdGVtLnNvcnRhYmxlLm1vZGVsLmlkX2xpc3QgPSBzdHIgKyAxXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZtLnJhd1NjcmVlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5yYXdTY3JlZW5zW2ldLm1hcChmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeC5pZF9saXN0ID0gaSArIDE7IFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTsgXHJcblxyXG4gICAgICAgICAgICB2bS5zdGF0dXMgPSBbXHJcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIG5hbWU6J9Ce0LbQuNC00LDQtdGCJ30sXHJcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIG5hbWU6J9CSINGA0LDQsdC+0YLQtSd9LFxyXG4gICAgICAgICAgICAgICAge2lkOiAzLCBuYW1lOifQktGL0L/QvtC70L3QtdC90L4nfSxcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgICQoJyNkdHBja3InKS5kYXRlcGlja2VyKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ3JpZG5hbWVKc29uTGlzdHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGN1clVzZXIgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICogQHByb3BlcnR5INCU0JDQndCd0KvQlSDQlNCb0K8gSFRNTFxyXG4gICAgICAgICAqIEB0eXBlIE9iamVjdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAZmluYWxcclxuICAgICAgICAgKi9cclxuICAgICAgICB2bS50YXNja19saW1pdCA9IDE1O1xyXG4gICAgICAgIHZtLm5nR3JpZFZpZXcgPSBudWxsO1xyXG5cclxuICAgICAgICB2bS51c2VyID0gbnVsbDtcclxuICAgICAgICB2bS5hbGxVc2VycyA9IFtdO1xyXG4gICAgICAgIHZtLmRlbGV0ZVVzZXIgPSBkZWxldGVVc2VyO1xyXG5cclxuICAgICAgICB2bS5leGl0X21vZGFsID0gZXhpdF9tb2RhbDtcclxuICAgICAgICB2bS5zYXZldGFzY2sgPSBzYXZldGFzY2s7XHJcbiAgICAgICAgdm0uZWRpdHRhc2NrID0gZWRpdHRhc2NrO1xyXG4gICAgICAgIHZtLmRlbHRhc2NrID0gZGVsdGFzY2s7XHJcbiAgICAgICAgdm0uYWRkdGFzY2sgPSBhZGR0YXNjaztcclxuICAgICAgICB2bS5kZWZfY2xpY2sgPSBkZWZfY2xpY2s7XHJcbiAgICAgICAgdm0uZmluaXNoX2xvYWRlciA9IGZpbmlzaF9sb2FkZXI7XHJcbiAgICAgICAgdm0uc3RhcnRfbG9hZGVyID0gc3RhcnRfbG9hZGVyO1xyXG4gICAgICAgIHZtLmxvZ01vZGVscyA9IGxvZ01vZGVscztcclxuICAgICAgICB2bS5teV9hbGVydCA9IG15X2FsZXJ0O1xyXG4gICAgICAgIHZtLmNoYW5nZV9saXN0ID0gY2hhbmdlX2xpc3Q7XHJcbiAgICAgICAgdm0uY2hhbmdlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZtLnJhd1NjcmVlbnMgPSBbXTtcclxuICAgICAgICB2bS5zb3J0aW5nTG9nID0gW107XHJcblxyXG4gICAgICAgIHZtLnJlc2pzb250YXNrcyA9IFtdO1xyXG4gICAgICAgIHZtLnJlc2dldEpzb25MaXN0cyA9IFtdO1xyXG5cclxuICAgICAgICB2bS5zb3J0YWJsZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBjb25uZWN0V2l0aDogXCIuYXBwcy1jb250YWluZXJcIixcclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICBpZiAoLy8gZW5zdXJlIHdlIGFyZSBpbiB0aGUgZmlyc3QgdXBkYXRlKCkgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgIXVpLml0ZW0uc29ydGFibGUucmVjZWl2ZWQgJiZcclxuICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdGhhdCBpdHMgYW4gYWN0dWFsIG1vdmluZ1xyXG4gICAgICAgICAgICAgICAgICAvLyBiZXR3ZWVuIHRoZSB0d28gbGlzdHNcclxuICAgICAgICAgICAgICAgICAgdWkuaXRlbS5zb3J0YWJsZS5zb3VyY2VbMF0gIT09IHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldFswXSAmJlxyXG4gICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGUgc2l6ZSBsaW1pdGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgIHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldE1vZGVsLmxlbmd0aCA+PSB2bS50YXNja19saW1pdCkge1xyXG4gICAgICAgICAgICAgICAgdWkuaXRlbS5zb3J0YWJsZS5jYW5jZWwoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgIC8vISEhINCe0JHQndCe0JLQm9Cv0JXQnCBpZF9saXN0INCjINCf0JXQoNCV0JzQldCp0JXQndCd0J7QmSDQl9CQ0JTQkNCn0JggISEhXHJcbiAgICAgICAgICAgICAgLy8gdmFyIHN0ciA9IE51bWJlcih1aS5pdGVtLnNvcnRhYmxlLmRyb3B0YXJnZXRMaXN0WzBdLmF0dHJpYnV0ZXMuaWQudmFsdWUuc2xpY2UoNywxMCkpO1xyXG4gICAgICAgICAgICAgIC8vIHVpLml0ZW0uc29ydGFibGUubW9kZWwuaWRfbGlzdCA9IHN0ciArIDFcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZtLnJhd1NjcmVlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZtLnJhd1NjcmVlbnNbaV0ubWFwKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeC5pZF9saXN0ID0gaSArIDE7IFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9OyBcclxuXHJcbiAgICAgICAgdm0uc3RhdHVzID0gW1xyXG4gICAgICAgICAgICB7aWQ6IDEsIG5hbWU6J9Ce0LbQuNC00LDQtdGCJ30sXHJcbiAgICAgICAgICAgIHtpZDogMiwgbmFtZTon0JIg0YDQsNCx0L7RgtC1J30sXHJcbiAgICAgICAgICAgIHtpZDogMywgbmFtZTon0JLRi9C/0L7Qu9C90LXQvdC+J30sXHJcbiAgICAgICAgXTtcclxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuICAgICAgICBcclxuICAgICAgICAkKCcjZHRwY2tyJykuZGF0ZXBpY2tlcigpO1xyXG5cclxuICAgICAgICB2YXIgZ3JpZG5hbWVKc29uTGlzdHMgPSBbXTtcclxuICAgICAgICBsZXQgY3VyVXNlciA9IGZhbHNlO1xyXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3QmNCd0JjQptCY0JDQptCY0K89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG4gICAgICAgIC8v0JjQndCY0KbQmNCY0KDQo9CV0Jwg0JrQntCd0KLQoNCe0JvQm9CV0KBcclxuICAgICAgICBpbml0Q29udHJvbGxlcigpO1xyXG5cclxuICAgICAgICAvL9CQ0JPQoNCV0JPQkNCi0J3QkNCvINCk0KPQndCa0KbQmNCvINCY0J3QmNCm0JjQmCDQmtCe0J3QotCg0J7Qm9Cb0JXQoNCQINCh0J7QodCi0J7QmNCiINCY0Jcg0J3QldCh0JrQntCb0KzQmtCY0KUgXCLQktCr0JfQq9CS0JDQrtCp0JjQpVwiXCIg0KTQo9Cd0JrQptCY0JlcclxuICAgICAgICBmdW5jdGlvbiBpbml0Q29udHJvbGxlcigpIHtcclxuXHJcbiAgICAgICAgICAgIC8v0JfQkNCT0KDQo9CW0JDQldCcINCS0KHQldClINCu0JfQldCg0J7QkiDQpNCQ0JHQoNCY0JrQkCBVc2VyU2VydmljZVxyXG4gICAgICAgICAgICBsb2FkQWxsVXNlcnMoKTsgLy9mcm9udGVuZC9hc3NldHMvYXBwLXNlcnZpY2VzL3VzZXIuc2VydmljZS5qc1xyXG5cclxuICAgICAgICAgICAgLy8g0JjQnNCf0J7QoNCi0JjQoNCj0JXQnCDQodCf0JjQodCe0Jog0JvQmNCh0KLQntCSINCk0JDQkdCg0JjQmtCQIFVzZXJTZXJ2aWNlXHJcbiAgICAgICAgICAgIGdldEpzb25MaXN0cygpOyAvL2Zyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvanNvbl9zZXJ2aWNlLmpzXHJcblxyXG4gICAgICAgICAgICAvL9CY0JzQn9Ce0KDQotCY0KDQo9CV0Jwg0KHQn9CY0KHQntCaINCX0JDQlNCQ0Kcg0KTQkNCR0KDQmNCa0JAgVXNlclNlcnZpY2UgXHJcbiAgICAgICAgICAgIGdldEpzb25UYXNrcygpOyAvL2Zyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvanNvbl9zZXJ2aWNlLmpzXHJcblxyXG4gICAgICAgICAgICAvLyDQmNCc0J/QntCg0KLQmNCg0KPQldCcINCh0J/QmNCh0J7QmiDQmNCc0JXQnSDQodCi0J7Qm9CR0KbQntCSINCT0KDQmNCU0JBcclxuICAgICAgICAgICAgZ2V0SnNvbkdyaWRuYW1lKCk7ICAgXHJcblxyXG4gICAgICAgICAgICAvL9CX0JDQk9Cg0KPQltCQ0JXQnCDQotCV0JrQo9Cp0JXQk9CeINCu0JfQldCg0JAgKyDQodCe0JfQlNCQ0JXQnCDQodCe0JTQldCg0JbQmNCc0J7QlSDQlNCb0K8g0JTQoNCQ0JPQvdCU0KDQntCfINCb0JjQodCi0J7QklxyXG4gICAgICAgICAgICBjcmVhdGVTaGVldHModm0ucmVzZ2V0SnNvbkxpc3RzKTtcclxuICAgICAgICB9OyBcclxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT3QntCf0JXQoNCQ0KLQmNCS0J3Qq9CVINCk0KPQndCa0KbQmNCYPT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCY0JzQn9Ce0KDQotCQINCh0J/QmNCh0JrQkCDQmNCc0JXQnSDQn9Ce0JvQldCZINCT0KDQmNCU0JBcclxuICAgICAgICBmdW5jdGlvbiBnZXRKc29uR3JpZG5hbWUoKXtcclxuICAgICAgICAgICAgZ3JpZG5hbWVKc29uTGlzdHMgPSBKc29uU2VydmljZS5nZXRSZXN1bHRGcm9tSnNvbignZGIvZ3JpZG5hbWUuanNvbicpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQmNCc0J/QntCg0KLQkCDQodCf0JjQodCa0JAg0JvQmNCh0KLQntCSXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SnNvbkxpc3RzKCl7XHJcbiAgICAgICAgICAgIHZtLnJlc2dldEpzb25MaXN0cyA9IEpzb25TZXJ2aWNlLmdldFJlc3VsdEZyb21Kc29uKCdkYi9saXN0c05hbWUuanNvbicpXHJcbiAgICAgICAgICAgIEpzb25TZXJ2aWNlLmxpc3QgPSB2bS5yZXNnZXRKc29uTGlzdHM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQmNCc0J/QntCg0KLQkCDQodCf0JjQodCa0JAg0JfQkNCU0JDQp1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEpzb25UYXNrcygpe1xyXG4gICAgICAgICAgICB2bS5yZXNqc29udGFza3MgPSBKc29uU2VydmljZS5nZXRSZXN1bHRGcm9tSnNvbignZGIvdGFza3MuanNvbicpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIG1ha2VMaXN0IChpZF9saXN0KTo8YnI+XHJcbiAgICAgICAgICog0JLQntCX0JLQoNCQ0KnQkNCV0KIg0J7QotCk0JjQm9Cs0KLQoNCe0JLQkNCd0J3Qq9CZINCf0J4g0J/QntCb0K/QnDogaWRfbGlzdC9pZF91c2VyINCc0JDQodCh0JjQkiDQl9CQ0JTQkNCnPGJyPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYWtlTGlzdCAoaWRfbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJfcmVzanNvbnRhc2tzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm0udXNlci5pZCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcl9yZXNqc29udGFza3MgPSB2bS5yZXNqc29udGFza3MuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZF9saXN0ID09IGlkX2xpc3QgJiYgaXRlbS5pZF91c2VyID09IHZtLnVzZXIuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJfcmVzanNvbnRhc2tzID0gdm0ucmVzanNvbnRhc2tzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWRfbGlzdCA9PSBpZF9saXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcl9yZXNqc29udGFza3M7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgKiBAbWV0aG9kIG1ha2VMaXN0XHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpZF9saXN0IElEINCb0JjQodCi0JBcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGZpbHRlcl9yZXNqc29udGFza3NcclxuICAgICAgICAgKi8gXHJcbiAgICAgICAgZnVuY3Rpb24gbWFrZUxpc3QgKGlkX2xpc3QpIHtcclxuICAgICAgICAgICAgdmFyIGZpbHRlcl9yZXNqc29udGFza3MgPSBbXTtcclxuICAgICAgICAgICAgaWYodm0udXNlci5pZCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJfcmVzanNvbnRhc2tzID0gdm0ucmVzanNvbnRhc2tzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWRfbGlzdCA9PSBpZF9saXN0ICYmIGl0ZW0uaWRfdXNlciA9PSB2bS51c2VyLmlkKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJfcmVzanNvbnRhc2tzID0gdm0ucmVzanNvbnRhc2tzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWRfbGlzdCA9PSBpZF9saXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyX3Jlc2pzb250YXNrcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0JsgY3JlYXRlU2hlZXRzIChyZXNnZXRKc29uTGlzdHMpOjxicj5cclxuICAgICAgICAgKiDQptCY0JrQm9Ce0Jwg0KHQntCX0JTQkNCu0KLQodCvINCb0JjQodCi0KsuINCb0JjQodCi0JDQnCDQn9Cg0JjQodCS0JDQmNCS0JDQldCi0KHQryDQmNCc0K8g0JggSUQ8YnI+INCh0J7Ql9CU0JDQndCd0KvQlSDQm9CY0KHQotCrINCU0J7QkdCQ0JLQm9Cv0K7QotCh0K8g0JIg0JzQkNCh0KHQmNCSIHZtLnJhd1NjcmVlbnNcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlU2hlZXRzKHJlc2dldEpzb25MaXN0cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWN1clVzZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVc2VyU2VydmljZS5HZXRCeVVzZXJuYW1lKCRyb290U2NvcGUuZ2xvYmFscy5jdXJyZW50VXNlci51c2VybmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VyJywgdXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS51c2VyID0gdXNlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgcmVzZ2V0SnNvbkxpc3RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSA9IG1ha2VMaXN0KHJlc2dldEpzb25MaXN0c1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0ubmFtZSA9IHJlc2dldEpzb25MaXN0c1tpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnJhd1NjcmVlbnMucHVzaCh2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyVXNlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL9Ch0J7Ql9CU0JDQgdCcINCT0KDQmNCUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCByZXNnZXRKc29uTGlzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0gPSBtYWtlTGlzdChyZXNnZXRKc29uTGlzdHNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0ubmFtZSA9IHJlc2dldEpzb25MaXN0c1tpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVucy5wdXNoKHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgKiDQn9Cg0Jgg0J/QldCg0JLQntCcINCf0KDQntCl0J7QlNCVINCh0J7Ql9CU0JDQldCcINCT0KDQmNCUIFxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlU2hlZXRzXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHJlc2dldEpzb25MaXN0cyDQnNCQ0KHQodCY0JIg0JjQnNCV0J0g0JvQmNCh0KLQntCSXHJcbiAgICAgICAgICovIFxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0KHQntCX0JTQkNCd0JjQryDQm9CY0KHQotCe0JJcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTaGVldHMocmVzZ2V0SnNvbkxpc3RzKXtcclxuICAgICAgICAgICAgaWYoIWN1clVzZXIpe1xyXG4gICAgICAgICAgICAgICAgVXNlclNlcnZpY2UuR2V0QnlVc2VybmFtZSgkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXIudXNlcm5hbWUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VyJywgdXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCByZXNnZXRKc29uTGlzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSA9IG1ha2VMaXN0KHJlc2dldEpzb25MaXN0c1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdLm5hbWUgPSByZXNnZXRKc29uTGlzdHNbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVucy5wdXNoKHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1clVzZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v0KHQntCX0JTQkNCB0Jwg0JPQoNCY0JRcclxuICAgICAgICAgICAgICAgICAgICBpbml0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCByZXNnZXRKc29uTGlzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdID0gbWFrZUxpc3QocmVzZ2V0SnNvbkxpc3RzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXS5uYW1lID0gcmVzZ2V0SnNvbkxpc3RzW2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVucy5wdXNoKHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0JsgaW5pdEdyaWQgKCk6PGJyPlxyXG4gICAgICAgICAqIDEuIHZtLm5nR3JpZFZpZXcgLSDQntCi0J7QkdCg0JDQltCQ0JXQoiDQk9Cg0JjQlCDQkiBIVE1MPGJyPlxyXG4gICAgICAgICAqIDIuIHZtLnN0YXR1cyAtINCc0JDQodCh0JjQkiDQodCi0JDQotCj0KHQntCSINCX0JDQlNCQ0KfQmCAobXlDZWxUZW1wMSAtIFNFTEVDVCDQmNCXIHZtLnN0YXR1cyk8YnI+XHJcbiAgICAgICAgICogMy4gdm0uZHJhZ25kcm9wX2xpc3QgLSDQnNCQ0KHQodCY0JIg0JvQmNCh0KLQntCSIChteUNlbFRlbXAyIC0gU0VMRUNUINCY0Jcgdm0uZHJhZ25kcm9wX2xpc3QpIDxicj5cclxuICAgICAgICAgKiA0LiDQktCr0JLQntCUINCf0J7Qm9CV0Jkg0JIgR1JJRCDQn9CeINCf0J7QoNCv0JTQmtCjINCh0J7QoNCi0JjQoNCe0JLQmtCYINCf0J7Qm9CvIHNvcnQg0JzQkNCh0KHQmNCS0JAgcmlkbmFtZUpzb25MaXN0czxicj5cclxuICAgICAgICAgKiA1LiDQlNCb0K8g0J7QotCe0JHQoNCQ0JbQldCd0JjQryDQkiDQotCQ0JHQm9CY0KbQlSDQodCe0JfQlNCQ0JXQnCBcItCh0KLQoNCe0JrQntCS0KvQmSDQntCR0KrQldCa0KJcIi0gc3RyINCYINCf0KPQqNCY0Jwg0JXQk9CeINCSIGNvbHVtbkRlZnNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgdHQubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodHRbal0uaWQgIT0gXCIkJGhhc2hLZXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSAne1wiZmllbGRcIiA6IFwiJyArIHR0W2pdLmlkICsgJ1wiJyArICcsJyArICdcImRpc3BsYXlOYW1lXCIgOiBcIicgKyBncmlkbmFtZUpzb25MaXN0c1tqXS5ncmlkbmFtZSArICdcIn0nIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLnB1c2goSlNPTi5wYXJzZShzdHIpKTsgXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgKiA2LiDQodCa0KDQq9CS0JDQldCcINCf0J7Qm9CVINCV0KHQm9CYINCe0J3QniDQn9Cg0JjQodCj0KLQodCi0JLQo9CV0KIg0JIg0JzQkNCh0KHQmNCS0JUgbm90VmlzaWJsZSDQlNCb0K8g0J7QodCi0JDQm9Cs0J3Qq9ClIC0g0J/QldCg0JXQmNCc0JXQndCe0JLQq9CS0JDQldCcINCf0J7Qm9CvINCT0KDQmNCU0JBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub3RWaXNpYmxlID0gWydpZCddOy8vJ2lkX2xpc3QnXHJcblxyXG4gICAgICAgICAgICAvL9Ch0JrQoNCr0JLQkNCV0Jwg0J/QntCb0JUg0JXQodCb0Jgg0J7QndCeINCf0KDQmNCh0KPQotCh0KLQktCj0JXQoiDQkiDQnNCQ0KHQodCY0JLQlSBub3RWaXNpYmxlINCU0JvQryDQntCh0KLQkNCb0KzQndCr0KUgLSDQn9CV0KDQldCY0JzQldCd0J7QktCr0JLQkNCV0Jwg0J/QntCb0K8g0JPQoNCY0JTQkFxyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IG5vdFZpc2libGUubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLmZpZWxkID09IG5vdFZpc2libGVbal0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/QndCQ0KXQntCU0JjQnCDQn9CeIGlkIChqKSDQmNCd0JTQldCa0KEg0JfQkNCU0JDQp9CYINCSINCc0JDQodCh0JjQktCVIHZtLnJlc2pzb250YXNrc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RJbmRleCA9IGZpbmRfaW5kZXhfYnlfaWQoZ3JpZG5hbWVKc29uTGlzdHMsIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0uZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLmRpc3BsYXlOYW1lID0gZ3JpZG5hbWVKc29uTGlzdHNbZmlyc3RJbmRleF0uZ3JpZG5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0ud2lkdGggPSBncmlkbmFtZUpzb25MaXN0c1tmaXJzdEluZGV4XS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAqIDcuINCU0J7QkdCQ0JLQm9Cv0JXQnCDQmtCd0J7Qn9Ca0Jgg0KDQldCU0JDQmtCi0JjQoNCe0JLQkNCd0JjQryDQmCDQo9CU0JDQm9CV0J3QmNCvXHJcbiAgICAgICAgICogOC4g0JTQntCR0JDQktCb0K/QldCc0Jwg0KTQmNCb0KzQotCg0KsgINCYINCe0KLQnNCV0J3Qr9CV0Jwg0KTQmNCb0KzQotCg0Ksg0JTQm9CvINCa0J3QntCf0J7QmlxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBqPTA7IGogPCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImlkX2xpc3RcIiB8fCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiZXhlY3V0aW9uX3N0YXR1c1wiKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiaWRfbGlzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15RmlsdGVyID0gbXlMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15RmlsdGVyID0gbXlTdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0ciA9ICd7JyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnXCJ0eXBlXCIgOiBcInNlbGVjdFwiLCcgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1wic2VsZWN0T3B0aW9uc1wiICA6IFsgJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArIG15RmlsdGVyIFxyXG4gICAgICAgICAgICAgICAgICAgICsgJ119J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpbHRlciA9IEpTT04ucGFyc2Uoc3RyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImlkX2xpc3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmNlbGxGaWx0ZXIgPSAnaWRfbGlzdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uY2VsbEZpbHRlciA9ICdleGVjdXRpb25fc3RhdHVzJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiZWRpdFwiIHx8IHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJkZWxldGVcIikgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5lbmFibGVGaWx0ZXJpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJpZF91c2VyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmNlbGxGaWx0ZXIgPSAnaWRfdXNlcic7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRyb3BEb3duO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih2bS51c2VyLmlkID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uYWxsVXNlcnMubWFwKGl0ZW0gPT4gZHJvcERvd24gPSBkcm9wRG93biArICd7XCJ2YWx1ZVwiOiBcIicgKyBpdGVtLmlkICsgJ1wiLCBcImxhYmVsXCI6IFwiJyArIGl0ZW0udXNlcm5hbWUgKyAnXCIgfSwnKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uYWxsVXNlcnMubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5pZCA9PSB2bS51c2VyLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcERvd24gPSBkcm9wRG93biArICd7XCJ2YWx1ZVwiOiBcIicgKyBpdGVtLmlkICsgJ1wiLCBcImxhYmVsXCI6IFwiJyArIGl0ZW0udXNlcm5hbWUgKyAnXCIgfSwnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ciA9ICd7JyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnXCJ0eXBlXCIgOiBcInNlbGVjdFwiLCcgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1wic2VsZWN0T3B0aW9uc1wiICA6ICBbJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArIGRyb3BEb3duLnNsaWNlKDksLTEpIFxyXG4gICAgICAgICAgICAgICAgICAgICsgJ119JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWx0ZXIgPSBKU09OLnBhcnNlKHN0cik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAqIEBtZXRob2QgaW5pdEdyaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCh0J7Ql9CU0JDQndCY0K8g0JPQoNCY0JTQkFxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRHcmlkKCkge1xyXG4gICAgICAgICAgICB2bS5ncmlkT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZUNlbGxFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZUNvbHVtblJlc2l6aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlRmlsdGVyaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0dyaWRGb290ZXI6dHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9uUmVnaXN0ZXJBcGk6IGZ1bmN0aW9uKGdyaWRBcGkpe1xyXG4gICAgICAgICAgICAgICAgICB2bS5ncmlkQXBpID0gZ3JpZEFwaTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5EZWZzOiBbXVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0cjtcclxuXHJcbiAgICAgICAgICAgIC8qINCh0J7QoNCi0JjQoNCj0JXQnCBncmlkbmFtZUpzb25MaXN0cyDQlNCb0K8g0J7QotCe0JHQoNCQ0JbQldCd0JjQryDQodCi0J7Qm9CR0KbQntCSINCX0JDQlNCQ0Kcg0JIg0KHQntCe0KLQktCV0KLQodCi0JLQmNCVINChINCf0J7Qm9CV0Jwgc29ydCBncmlkbmFtZUpzb25MaXN0cyAqL1xyXG4gICAgICAgICAgICBsZXQgdHQgPSBncmlkbmFtZUpzb25MaXN0cy5zb3J0KChhLGIpID0+IGEuc29ydCAtIGIuc29ydCk7XHJcblxyXG4gICAgICAgICAgICAvKtCU0JvQryDQntCi0J7QkdCg0JDQltCV0J3QmNCvINCSINCi0JDQkdCb0JjQptCVINCh0J7Ql9CU0JDQldCcIFwi0KHQotCg0J7QmtCe0JLQq9CZINCe0JHQqtCV0JrQolwiLSBzdHJcclxuICAgICAgICAgICAg0Jgg0J/Qo9Co0JjQnCDQldCT0J4g0JIgY29sdW1uRGVmcyovXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgdHQubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodHRbal0uaWQgIT0gXCIkJGhhc2hLZXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSAne1wiZmllbGRcIiA6IFwiJyArIHR0W2pdLmlkICsgJ1wiJyArICcsJyArICdcImRpc3BsYXlOYW1lXCIgOiBcIicgKyBncmlkbmFtZUpzb25MaXN0c1tqXS5ncmlkbmFtZSArICdcIn0nIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLnB1c2goSlNPTi5wYXJzZShzdHIpKTsgXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IG5vdFZpc2libGUgPSBbJ2lkJ107Ly8naWRfbGlzdCdcclxuXHJcbiAgICAgICAgICAgIC8v0KHQmtCg0KvQktCQ0JXQnCDQn9Ce0JvQlSDQldCh0JvQmCDQntCd0J4g0J/QoNCY0KHQo9Ci0KHQotCS0KPQldCiINCSINCc0JDQodCh0JjQktCVIG5vdFZpc2libGUg0JTQm9CvINCe0KHQotCQ0JvQrNCd0KvQpSAtINCf0JXQoNCV0JjQnNCV0J3QntCS0KvQktCQ0JXQnCDQn9Ce0JvQryDQk9Cg0JjQlNCQXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgbm90VmlzaWJsZS5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0uZmllbGQgPT0gbm90VmlzaWJsZVtqXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL9Cd0JDQpdCe0JTQmNCcINCf0J4gaWQgKGopINCY0J3QlNCV0JrQoSDQl9CQ0JTQkNCn0Jgg0JIg0JzQkNCh0KHQmNCS0JUgdm0ucmVzanNvbnRhc2tzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdEluZGV4ID0gZmluZF9pbmRleF9ieV9pZChncmlkbmFtZUpzb25MaXN0cywgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS5maWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0uZGlzcGxheU5hbWUgPSBncmlkbmFtZUpzb25MaXN0c1tmaXJzdEluZGV4XS5ncmlkbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS53aWR0aCA9IGdyaWRuYW1lSnNvbkxpc3RzW2ZpcnN0SW5kZXhdLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8q0JTQntCR0JDQktCb0K/QldCcINCa0J3QntCf0JrQoyDQoNCV0JTQkNCa0KLQmNCg0J7QktCQ0J3QmNCvKi9cclxuICAgICAgICAgICAgbGV0IGNoZSA9ICc8aSBjbGFzcz1cXCdmYSBmYS1wZW5jaWwtc3F1YXJlLW8gYnRuIGJ0bi1zdWNjZXNzIGJ0bi1zbVxcJyBuZy1jbGljaz1cXCdncmlkLmFwcFNjb3BlLnZtLm15X2FsZXJ0KHJvdy5lbnRpdHkuaWQscm93LmVudGl0eS5pZF9saXN0LDEpXFwnPjwvaT5cIic7XHJcbiAgICAgICAgICAgIHN0ciA9J3tcImZpZWxkXCI6IFwiZWRpdFwiLCBcImVuYWJsZVNvcnRpbmdcIjogZmFsc2UsIFwiZGlzcGxheU5hbWVcIjogXCIuLi5cIiwgXCJ3aWR0aFwiOiAzOCwgXCJjZWxsVGVtcGxhdGVcIjogXCInICsgY2hlICsgJ30nXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0cik7IFxyXG4gICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLnB1c2goSlNPTi5wYXJzZShzdHIpKTtcclxuXHJcbiAgICAgICAgICAgIC8q0JTQntCR0JDQktCb0K/QldCcINCa0J3QntCf0JrQoyDQo9CU0JDQm9CV0J3QmNCvKi9cclxuICAgICAgICAgICAgY2hlID0gJzxkaXY+PGkgY2xhc3M9XFwnZmEgZmEtdHJhc2gtbyBidG4gYnRuLWRhbmdlciBidG4tc21cXCcgbmctY2xpY2s9XFwnZ3JpZC5hcHBTY29wZS52bS5teV9hbGVydChyb3cuZW50aXR5LmlkLHJvdy5lbnRpdHkuaWRfbGlzdCwwKVxcJz48L2Rpdj5cIic7XHJcbiAgICAgICAgICAgIHN0ciA9J3tcImZpZWxkXCI6IFwiZGVsZXRlXCIsIFwiZW5hYmxlU29ydGluZ1wiOiBmYWxzZSwgXCJkaXNwbGF5TmFtZVwiOiBcIi4uLlwiLCBcIndpZHRoXCI6IDM4LCBcImNlbGxUZW1wbGF0ZVwiOiBcIicgKyBjaGUgKyAnfSdcclxuICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmcy5wdXNoKEpTT04ucGFyc2Uoc3RyKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IG15TGlzdCA9ICd7XCJ2YWx1ZVwiOiBcIjFcIiwgXCJsYWJlbFwiOiBcItCf0LvQsNC9XCIgfSwgeyBcInZhbHVlXCI6IFwiMlwiLCBcImxhYmVsXCI6IFwi0JIg0L/RgNC+0YbQtdGB0YHQtVwiIH0sIHsgXCJ2YWx1ZVwiOiBcIjNcIiwgXCJsYWJlbFwiOiBcItCT0L7RgtC+0LLQvlwifSdcclxuICAgICAgICAgICAgbGV0IG15U3RhdHVzID0gJ3tcInZhbHVlXCI6IFwiMVwiLCBcImxhYmVsXCI6IFwi0J7QttC40LTQsNC10YJcIiB9LCB7IFwidmFsdWVcIjogXCIyXCIsIFwibGFiZWxcIjogXCLQkiDRgNCw0LHQvtGC0LVcIiB9LCB7IFwidmFsdWVcIjogXCIzXCIsIFwibGFiZWxcIjogXCLQktGL0L/QvtC70L3QtdC90L5cIn0nXHJcbiAgICAgICAgICAgIGxldCBteUZpbHRlcjtcclxuXHJcbiAgICAgICAgICAgIC8v0JTQntCR0JDQktCb0K/QldCc0Jwg0KTQmNCb0KzQotCg0KsgINCYINCe0KLQnNCV0J3Qr9CV0Jwg0KTQmNCb0KzQotCg0Ksg0JTQm9CvINCa0J3QntCf0J7QmlxyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiaWRfbGlzdFwiIHx8IHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJleGVjdXRpb25fc3RhdHVzXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJpZF9saXN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlGaWx0ZXIgPSBteUxpc3RcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlGaWx0ZXIgPSBteVN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gJ3snIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArICdcInR5cGVcIiA6IFwic2VsZWN0XCIsJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnXCJzZWxlY3RPcHRpb25zXCIgIDogWyAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgbXlGaWx0ZXIgXHJcbiAgICAgICAgICAgICAgICAgICAgKyAnXX0nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmlsdGVyID0gSlNPTi5wYXJzZShzdHIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiaWRfbGlzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uY2VsbEZpbHRlciA9ICdpZF9saXN0JztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5jZWxsRmlsdGVyID0gJ2V4ZWN1dGlvbl9zdGF0dXMnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJlZGl0XCIgfHwgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImRlbGV0ZVwiKSB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmVuYWJsZUZpbHRlcmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImlkX3VzZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uY2VsbEZpbHRlciA9ICdpZF91c2VyJztcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZHJvcERvd247XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtLnVzZXIuaWQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5hbGxVc2Vycy5tYXAoaXRlbSA9PiBkcm9wRG93biA9IGRyb3BEb3duICsgJ3tcInZhbHVlXCI6IFwiJyArIGl0ZW0uaWQgKyAnXCIsIFwibGFiZWxcIjogXCInICsgaXRlbS51c2VybmFtZSArICdcIiB9LCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5hbGxVc2Vycy5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLmlkID09IHZtLnVzZXIuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wRG93biA9IGRyb3BEb3duICsgJ3tcInZhbHVlXCI6IFwiJyArIGl0ZW0uaWQgKyAnXCIsIFwibGFiZWxcIjogXCInICsgaXRlbS51c2VybmFtZSArICdcIiB9LCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gJ3snIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArICdcInR5cGVcIiA6IFwic2VsZWN0XCIsJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnXCJzZWxlY3RPcHRpb25zXCIgIDogIFsnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgZHJvcERvd24uc2xpY2UoOSwtMSkgXHJcbiAgICAgICAgICAgICAgICAgICAgKyAnXX0nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpbHRlciA9IEpTT04ucGFyc2Uoc3RyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlZnJlc2hfZ3JpZCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLmdldFByb2R1Y3RMaXN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmRhdGEgPSB2bS5yZXN1bHRTaW11bGF0ZWREYXRhO1xyXG4gICAgICAgICAgICB2bS5teVNlbGVjdGVkUm93cyA9IHZtLmdyaWRBcGkuc2VsZWN0aW9uLmdldFNlbGVjdGVkUm93cygpOyAvLzwtLVByb3BlcnR5IHVuZGVmaW5lZCBlcnJvciBoZXJlXHJcblxyXG4gICAgICAgICAgICBpZiAodm0ubXlTZWxlY3RlZFJvd3NbMF0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBhbDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdm0ubXlTZWxlY3RlZFJvd3MubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGFsID0gYWwgKyfQktGL0LHRgNCw0L3QviA6ICcgKyAoaSArIDEpICsgJyDQmNCUID0gJyArIHZtLm15U2VsZWN0ZWRSb3dzW2ldLmlkICsgJywg0JvQuNGB0YIgPSAnICsgdm0ubXlTZWxlY3RlZFJvd3NbaV0uaWRfbGlzdCArICcuXFxuJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWxlcnQoYWwuc2xpY2UoOSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ9Cd0LjRh9C10LPQviDQvdC1INCy0YvQsdGA0LDQvdC+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIGlmICh2bS5ncmlkQXBpLnNlbGVjdGlvbi5zZWxlY3RlZFJvdykge1xyXG4gICAgICAgICAgICAgICAgICB2bS5ncmlkQXBpLnNlbGVjdGlvbi5zZWxlY3RSb3codm0uZ3JpZE9wdGlvbnMuZGF0YVswXSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBteV9hbGVydCAoaWQsIGwsIHR5cGU9J2RlZicpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codm0uYWxsVXNlcnMpO1xyXG4gICAgICAgICAgICBpZih0eXBlID09IDApIHtcclxuICAgICAgICAgICAgICAgIGRlbHRhc2NrIChsLCBpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvL9Cd0JDQmdCi0Jgg0J3QntCc0JXQoCDQvy7Qvy4g0K3QotCeINCd0KPQltCd0J4g0KLQntCb0KzQmtCeINCU0JvQryDQkNCf0JTQldCZ0KLQkCDQlNCe0JHQkNCS0JvQldCd0J3Qq9ClINCX0JDQlNCQ0KdcclxuICAgICAgICAgICAgICAgIGxldCBuID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdm1bJ2xpc3RfJyArIGxdLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih2bVsnbGlzdF8nICsgbF1baV0uaWQgPT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZWRpdHRhc2NrIChsLCBpZCwgbik7XHJcbiAgICAgICAgICAgIH07ICAgXHJcbiAgICAgICAgfTtcclxuICAgICAgXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQktCr0JLQntCU0JAg0KHQntCU0JXQoNCW0JjQnNCe0JPQniDQm9CY0KHQotCe0JIgXHJcbiAgICAgICAgZnVuY3Rpb24gbG9nTW9kZWxzICgpIHtcclxuICAgICAgICAgICAgdm0uc29ydGluZ0xvZyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZtLnJhd1NjcmVlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgbG9nRW50cnkgPSB2bS5yYXdTY3JlZW5zW2ldLm1hcChmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHgudGl0bGUgKyAnLScgKyB4LmlkX2xpc3QgKyAnfCc7XHJcbiAgICAgICAgICAgICAgfSkuam9pbignLCAnKTtcclxuICAgICAgICAgICAgICBsb2dFbnRyeSA9ICdjb250YWluZXIgJyArIChpKzEpICsgJzogJyArIGxvZ0VudHJ5O1xyXG4gICAgICAgICAgICAgIHZtLnNvcnRpbmdMb2cucHVzaChsb2dFbnRyeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCj0JTQkNCb0JXQndCY0K8g0JfQkNCU0JDQp9CYINCY0Jcg0JvQmNCh0KLQkCgh0JTQm9CvINCt0KLQntCZINCX0JDQlNCQ0KfQmCDQndCj0JbQndCeINCf0J7QlNCa0JvQrtCn0JjQotCsIExPREFTSCAhISEpXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsdGFzY2sgKGksIGopIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy8gdm1bJ2xpc3RfJyArIGldLnNwbGljZShqLCAxKTtcclxuICAgICAgICAgICAgdm1bJ2xpc3RfJyArIGldLnNwbGljZShfLmluZGV4T2Yodm1bJ2xpc3RfJyArIGldLCBfLmZpbmQodm1bJ2xpc3RfJyArIGldLCBmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS5pZCA9PT0gajsgfSkpLCAxKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHZtLnVzZXIuaWQgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzLnNwbGljZShfLmluZGV4T2Yodm0ucmVzanNvbnRhc2tzLCBfLmZpbmQodm0ucmVzanNvbnRhc2tzLCBmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS5pZCA9PT0gajsgfSkpLCAxKTtcclxuICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmRhdGEgPSB2bS5yZXNqc29udGFza3MuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZF91c2VyID09IHZtLnVzZXIuaWQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZtLnJlc2pzb250YXNrcy5zcGxpY2UoXy5pbmRleE9mKHZtLnJlc2pzb250YXNrcywgXy5maW5kKHZtLnJlc2pzb250YXNrcywgZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uaWQgPT09IGo7IH0pKSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWZyZXNoX3Jhd1NjcmVlbnMoKXtcclxuICAgICAgICAgICAgdm0ucmF3U2NyZWVucyA9IFtdO1xyXG4gICAgICAgICAgICBjcmVhdGVTaGVldHModm0ucmVzZ2V0SnNvbkxpc3RzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWZyZXNoX2dyaWQoKXtcclxuICAgICAgICAgICAgaWYodm0udXNlci5pZCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5kYXRhID0gdm0ucmVzanNvbnRhc2tzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWRfdXNlciA9PSB2bS51c2VyLmlkKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5kYXRhID0gdm0ucmVzanNvbnRhc2tzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgdGFzY2tfY291bnQgPSAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0JsgYWRkdGFzY2sgKGkpOjxicj5cclxuICAgICAgICAgKiAxLiDQpNCe0KDQnNCY0KDQo9CV0KIg0JjQlyDQodCi0KDQntCa0Jgg0J7QkdCq0JXQmtCiLdCX0JDQlNCQ0KfQozxicj4gXHJcbiAgICAgICAgICogMi4g0JTQntCR0JDQktCb0K/QldCiINCe0JHQqtCV0JrQoiDQkiB2bS5yZXNqc29udGFza3MgPGJyPlxyXG4gICAgICAgICAqIDMuINCe0JHQndCe0JLQm9Cv0JXQoiB2bS5yYXdTY3JlZW5zINCYINCT0KDQmNCUXHJcbiAgICAgICAgICogQG1ldGhvZCBhZGR0YXNja1xyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaSDQndCe0JzQldCgINCb0JjQodCi0JAgRFJBRyZEUk9QXHJcbiAgICAgICAgICovIFxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JTQntCR0JDQktCb0JXQndCY0K8g0JfQkNCU0JDQp9CYIFxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZHRhc2NrIChpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZih2bVsnbGlzdF8nICsgaV0ubGVuZ3RoIDwgdm0udGFzY2tfbGltaXQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGFkZFRhc2NrID0gdm0ucmVzanNvbnRhc2tzWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v0KHQntCX0JTQkNCV0JwgXCLQodCi0KDQntCa0J7QktCr0Jkg0J7QkdCq0JXQmtCiXCItIHN0ciDQlNCb0K8g0JTQkNCb0KzQndCV0JnQqNCV0JPQniBKU09OLnBhcnNlKHN0cilcclxuICAgICAgICAgICAgICAgIGxldCBzdHIgPSd7JztcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgayBpbiBhZGRUYXNjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGsgIT0gXCJpZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGsgPT0gXCJ0aXRsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnXCInICsgayArICdcIicgICsgJzogXCJOZXdUYXNjayAnICsgaSArIHRhc2NrX2NvdW50ICsgJ1wiLCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihrID09IFwiaWRfbGlzdFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnXCInICsgayArICdcIicgICsgJzogJyArICBOdW1iZXIoaSkgKyAnLCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGsgPT0gXCJpZF91c2VyXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICdcIicgKyBrICsgJ1wiJyAgKyAnOiAnICsgIHZtLnVzZXIuaWQgKyAnLCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGsgPT0gXCJkZXNjcmlwdGlvblwiIHx8IGsgPT0gXCJkYXRlXCIpeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihrID09IFwiZGF0ZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJ1wiJyArIGsgKyAnXCInICsgJyA6IFwiMDguMTIuMjAxN1wiJyArICcsJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle3N0ciA9IHN0ciArICdcIicgKyBrICsgJ1wiJyArICcgOiBcIjFcIicgKyAnLCd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihrICE9IFwiJCRoYXNoS2V5XCIpIHN0ciA9IHN0ciArICdcIicgKyBrICsgJ1wiJyArICcgOiAxJyArICcsJyAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJ1wiaWRcIiA6ICcgKyBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKSArICcsJyBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKDAsLTEpXHJcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnfSc7XHJcblxyXG4gICAgICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzLnB1c2goSlNPTi5wYXJzZShzdHIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoX3Jhd1NjcmVlbnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoX2dyaWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0YXNja19jb3VudCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0JsgZWRpdHRhc2NrIChpLCBqLCB0X2luZGV4KTo8YnI+XHJcbiAgICAgICAgICog0J7QotCa0KDQq9Ci0JjQlSDQl9CQ0JTQkNCn0Jgg0JTQm9CvINCf0J7QlNCg0J7QkdCd0J7Qk9CeINCf0KDQntCh0JzQntCi0KDQkCDQmCDQktCe0JfQnNCe0JbQndCe0JPQniDQoNCV0JTQkNCa0KLQmNCg0J7QktCQ0J3QmNCvXHJcbiAgICAgICAgICogQG1ldGhvZCBlZGl0dGFzY2tcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGkg0J3QntCc0JXQoCDQm9CY0KHQotCQIERSQUcmRFJPUFxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaiBpZCDQl9CQ0JTQkNCn0JhcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRfaW5kZXgg0J/QntCg0K/QlNCa0J7QktCr0Jkg0J3QntCc0JXQoCDQl9CQ0JTQkNCn0Jgg0JIgRFJBRyZEUk9QXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQn9Cg0J7QodCc0J7QotCg0JAg0JfQkNCU0JDQp9CYIFxyXG4gICAgICAgIGZ1bmN0aW9uIGVkaXR0YXNjayAoaSwgaiwgdF9pbmRleCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvL9Ck0JjQm9Cs0KLQoNCj0JXQnCDQn9CeINCb0JjQodCi0KMg0Jgg0JjQlCDQl9CQ0JTQkNCn0JhcclxuICAgICAgICAgICAgbGV0IGYgPSBfLmZpbmQodm1bJ2xpc3RfJyArIGldLCBmdW5jdGlvbiAoaXRlbSl7IHJldHVybiBpdGVtLmlkID09PSBqO30pO1xyXG5cclxuICAgICAgICAgICAgLy/QktCh0JUgXCLQmtCb0K7Qp9CYXCIg0KEg0JTQkNCd0J3Qq9Cc0Jgg0JfQkNCT0J7QndCv0JXQnCDQkiDQn9CV0KDQldCc0JXQndCd0KvQlSDQpNCe0KDQnNCrXHJcbiAgICAgICAgICAgIGZvcihsZXQgayBpbiBmKSB7XHJcbiAgICAgICAgICAgICAgICB2bVsnaHRtbF8nICsga10gPSBmW2tdO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2bVsnaHRtbF90X2luZGV4J10gPSB0X2luZGV4ICsgMTtcclxuXHJcbiAgICAgICAgICAgIC8v0J7QotCa0KDQq9CS0JDQldCc0Jwg0JTQmNCQ0JvQntCT0J7QktCe0JUg0J7QmtCd0J5cclxuICAgICAgICAgICAgJChcIiNvcGVuTW9kYWxcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZV9saXN0KCl7XHJcbiAgICAgICAgICAgIHZtLmNoYW5nZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0JsgZmluZF9pbmRleF9ieV9pZChzb3VyY2UsIGlkKSA6PGJyPlxyXG4gICAgICAgICAqINCf0J7QmNCh0Jog0JjQndCU0JXQmtCh0JAg0JfQkNCU0JDQp9CYINCSINCc0JDQodCh0JjQktCVINCf0JXQoNCV0JTQkNCd0J3QntCT0J4g0J7QkdCq0JXQmtCi0JAgLSBzb3VyY2Ug0J/QniDQn9CV0KDQldCU0JDQndCd0J7QnNCjIGlkXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBmaW5kX2luZGV4X2J5X2lkKHNvdXJjZSxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ZXMgPSAkLm1hcChzb3VyY2UsIGZ1bmN0aW9uKG9iaiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9iai5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ZXNbMF07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAqIEBtZXRob2QgZmluZF9pbmRleF9ieV9pZFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2Ug0JzQkNCh0KHQmNCSINCe0JHQqtCV0JrQotCe0JJcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IGlkINCX0JDQlNCQ0KfQmFxyXG4gICAgICAgICAqIEByZXR1cm4ge0ludGVnZXJ9INCd0JDQmdCU0JXQndCd0KvQmSDQmNCd0JTQldCa0KFcclxuICAgICAgICAgKi8gXHJcbiAgICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0J/QntCY0KHQmtCQINCf0J4g0JjQlFxyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRfaW5kZXhfYnlfaWQoc291cmNlLGlkKXtcclxuICAgICAgICAgICAgbGV0IGluZGV4ZXMgPSAkLm1hcChzb3VyY2UsIGZ1bmN0aW9uKG9iaiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihvYmouaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICByZXR1cm4gaW5kZXhlc1swXTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQG1ldGhvZCBzYXZldGFzY2tcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0Jsgc2F2ZXRhc2NrKCkgOjxicj5cclxuICAgICAgICAgKiAxLiDQn9Ce0JjQodCaINCY0J3QlNCV0JrQodCQINCX0JDQlNCQ0KfQmCDQkiDQnNCQ0KHQodCY0JLQlSB2bS5yZXNqc29udGFza3M8YnI+IFxyXG4gICAgICAgICAqIDIuINCe0JHQndCe0JLQm9CV0J3QmNCVINCf0J7Qm9CV0Jkg0JIg0JfQkNCU0JDQp9CVICjQmNCXINCc0JDQodCh0JjQktCQIHZtLnJlc2pzb250YXNrcyk8YnI+XHJcbiAgICAgICAgICogMy4g0JXQodCb0Jgg0JHQq9CbINCY0JfQnNCV0J3QldCdINCh0KLQkNCi0KPQoSDQl9CQ0JTQkNCn0JggLSDQntCR0J3QntCS0JvQldCd0JjQlSDQnNCQ0KHQodCY0JLQkCB2bS5yYXdTY3JlZW5zPGJyPlxyXG4gICAgICAgICAqLyBcclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCh0J7QpdCg0JDQndCV0J3QmNCvINCX0JDQlNCQ0KfQmFxyXG4gICAgICAgIGZ1bmN0aW9uIHNhdmV0YXNjayAoaSwgaiwgdF9pbmRleCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZihjb25maXJtKFwi0KHQvtGF0YDQsNC90LjRgtGMP1wiKSA9PSB0cnVlKXtcclxuXHJcbiAgICAgICAgICAgICAgICAvL9Cd0JDQpdCe0JTQmNCcINCf0J4gaWQgKGopINCY0J3QlNCV0JrQoSDQl9CQ0JTQkNCn0Jgg0JIg0JzQkNCh0KHQmNCS0JUgdm0ucmVzanNvbnRhc2tzXHJcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RJbmRleCA9IGZpbmRfaW5kZXhfYnlfaWQodm0ucmVzanNvbnRhc2tzLCBqKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgaW4gdm0ucmVzanNvbnRhc2tzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoayAhPSBcIiQkaGFzaEtleVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGsgPT0gXCJkYXRlXCIgfHwgayA9PSBcInRpdGxlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGsgPT0gXCJkYXRlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5yZXNqc29udGFza3NbZmlyc3RJbmRleF1bXCJkYXRlXCJdID0gICQoJyNkdHBja3InKVswXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnJlc2pzb250YXNrc1tmaXJzdEluZGV4XVtcInRpdGxlXCJdID0gJCgnI3R0bCcpWzBdLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCQoJyN0dGwnKVswXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnJlc2pzb250YXNrc1tmaXJzdEluZGV4XVtrXSA9IHZtWydodG1sXycgKyBrXTsgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qPyDQodCf0JXQptCY0JDQm9Cs0J3QniDQlNCb0K8g0J7QkdCd0J7QktCb0JXQndCY0K8gISEhINCi0J7Qm9Cs0JrQniDQlNCe0JHQkNCS0JvQldCd0J3Qq9ClINCX0JDQlNCQ0Kcg0JIgZHJhZyZkcm9wICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZtWydsaXN0XycgKyBpXVt0X2luZGV4IC0gMV1ba10gPSB2bVsnaHRtbF8nICsga107XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodm0uY2hhbmdlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZtLmNoYW5nZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaF9yYXdTY3JlZW5zKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hfZ3JpZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2bS5jaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2bS5jaGFuZ2UpOyAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codm0ucmVzanNvbnRhc2tzKTtcclxuICAgICAgICAgICAgJChcIi5tb2RhbERpYWxvZ1wiKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQktCr0KXQntCU0JAg0JjQlyBtb2RhbERpYWxvZyDQkdCV0Jcg0KHQntCl0KDQkNCd0JXQndCY0K8g0JTQkNCd0J3Qq9Cl0KVcclxuICAgICAgICBmdW5jdGlvbiBleGl0X21vZGFsKCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKFwiLm1vZGFsRGlhbG9nXCIpLmZhZGVUb2dnbGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBkZWZfY2xpY2soKXtldmVudC5wcmV2ZW50RGVmYXVsdCgpO307XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0KHQmtCg0KvQotCY0K8g0JjQndCU0JjQmtCQ0KLQntCg0JAg0J7QltCY0JTQkNCd0JjQr1xyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmlzaF9sb2FkZXIoKXtcclxuICAgICAgICAgICAgaWYgKCQoXCIjbG9hZGVyXCIpLmlzKFwiOnZpc2libGVcIikpe1xyXG4gICAgICAgICAgICAgICAgJChcIiNsb2FkZXJcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQktCY0JfQo9CQ0JvQmNCX0JDQptCY0Jgg0JjQndCU0JjQmtCQ0KLQntCg0JAg0J7QltCY0JTQkNCd0JjQr1xyXG4gICAgICAgIGZ1bmN0aW9uIHN0YXJ0X2xvYWRlcigpe1xyXG4gICAgICAgICAgICBpZiAoISQoXCIjbG9hZGVyXCIpLmlzKFwiOnZpc2libGVcIikpe1xyXG4gICAgICAgICAgICAgICAgJChcIiNsb2FkZXJcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JfQkNCT0KDQo9CX0JrQmCDQotCV0JrQo9Cp0JXQk9CeINCu0JfQldCg0JAgXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZEN1cnJlbnRVc2VyKCkge1xyXG4gICAgICAgICAgICBVc2VyU2VydmljZS5HZXRCeVVzZXJuYW1lKCRyb290U2NvcGUuZ2xvYmFscy5jdXJyZW50VXNlci51c2VybmFtZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCX0JDQk9Cg0KPQl9Ca0Jgg0JLQodCV0KUg0K7Ql9CV0KDQntCSIFxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRBbGxVc2VycygpIHtcclxuICAgICAgICAgICAgVXNlclNlcnZpY2UuR2V0QWxsKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmFsbFVzZXJzID0gdXNlcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgSnNvblNlcnZpY2UuVXNlcnMgPSB2bS5hbGxVc2VycztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0KPQlNCQ0JvQldCd0JjQryDQrtCX0JXQoNCQIFxyXG4gICAgICAgIGZ1bmN0aW9uIGRlbGV0ZVVzZXIoaWQpIHtcclxuICAgICAgICAgICAgVXNlclNlcnZpY2UuRGVsZXRlKGlkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRBbGxVc2VycygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qPT09PT09PT09PT09PT09PT09PdCk0JjQm9Cs0KLQoNCrINCU0JvQryDQl9CQ0JzQldCd0Ksg0JTQkNCd0J3Qq9ClINCSINCT0KDQmNCU0JU9PT09PT09PT09PT09PT09PT09Ki9cclxuXHJcbiAgICAvL9Ca0J7QndCS0JXQoNCi0JDQptCY0K8g0JzQkNCh0KHQmNCS0JAg0J7QkdCq0JXQmtCi0J7QkiDQkiDQntCR0KrQldCa0KIg0JTQm9CvINCk0JjQm9Cs0KLQoNCe0JJcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZV9vYmpfZm9yX2ZpbHRlcihvYmosIG9ial9pZCwgb2JqX2ZpZWxkKXtcclxuICAgICAgICBsZXQgb2JqRmlsdGVyID0gJ3snO1xyXG4gICAgICAgIGZvcihsZXQgaj0wOyBqIDwgb2JqLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgb2JqRmlsdGVyID0gb2JqRmlsdGVyICsgJ1wiJyArIG9ialtqXVtvYmpfaWRdICsgJ1wiJyArICc6ICcgKyAnXCInICsgb2JqW2pdW29ial9maWVsZF0gKyAnXCInICsgJywgJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iakZpbHRlciA9IG9iakZpbHRlci5zbGljZSgwLC0yKSArICd9JztcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShvYmpGaWx0ZXIpXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvL9CX0JDQnNCV0J3QkCDQlNCQ0J3QndCr0KUg0JIg0JPQoNCY0JTQlSAo0J/QntCb0JUgLSBpZF9saXN0KVxyXG4gICAgZnVuY3Rpb24gaWRfbGlzdCAoSnNvblNlcnZpY2Upe1xyXG4gICAgICAgIHZhciBpZF9saXN0SGFzaCA9IGNyZWF0ZV9vYmpfZm9yX2ZpbHRlcihKc29uU2VydmljZS5saXN0LCAnaWQnLCAnbmFtZScpIFxyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICAgICAgaWYgKCFpbnB1dCl7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJldHVybiBpZF9saXN0SGFzaFtpbnB1dF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy/Ql9CQ0JzQldCd0JAg0JTQkNCd0J3Qq9ClINCSINCT0KDQmNCU0JUgKNCf0J7Qm9CVIC0gZXhlY3V0aW9uX3N0YXR1cylcclxuICAgIGZ1bmN0aW9uIGV4ZWN1dGlvbl9zdGF0dXMoSnNvblNlcnZpY2Upe1xyXG4gICAgICAgIHZhciBleGVjdXRpb25fc3RhdHVzSGFzaCA9IEpzb25TZXJ2aWNlLnN0YXR1cztcclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmICghaW5wdXQpe1xyXG4gICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZXhlY3V0aW9uX3N0YXR1c0hhc2hbaW5wdXRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy/Ql9CQ0JzQldCd0JAg0JTQkNCd0J3Qq9ClINCSINCT0KDQmNCU0JUgKNCf0J7Qm9CVIC0gaWRfdXNlcilcclxuICAgIGZ1bmN0aW9uIGlkX3VzZXIoSnNvblNlcnZpY2Upe1xyXG4gICAgICAgIHZhciBpZF91c2VydEhhc2ggPSBjcmVhdGVfb2JqX2Zvcl9maWx0ZXIoSnNvblNlcnZpY2UuVXNlcnMsICdpZCcsICd1c2VybmFtZScpXHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgICAgICAgICBpZiAoIWlucHV0KXtcclxuICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGlkX3VzZXJ0SGFzaFtpbnB1dF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxufSkoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvYXNzZXRzL2hvbWUvaG9tZS5jb250cm9sbGVyLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUtBO0FBQ0E7QUF6QkE7QUFDQTtBQTJCQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQXJCQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Iiwic291cmNlUm9vdCI6IiJ9