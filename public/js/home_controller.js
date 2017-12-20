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

	    angular.module('app').controller('HomeController', HomeController);

	    /**
	    * ПРЕДОСТАВЛЕНИЕ ДАННЫХ В ВИДЕ DRAG&DROP И ng-GRID
	        HomeController.$inject = ['UserService', 'JsonService', '$rootScope'];
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
	            vm.tasck_limit = 15; //ОГРАНИЧИТЕЛЬ ЗАДАЧ В ЛИСТЕ
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
	            $('#dtpckr').datepicker();
	         * @property ДАННЫЕ ДЛЯ HTML
	         * @type Object
	         * @static
	         * @final
	         */
	        vm.tasck_limit = 15; //ОГРАНИЧИТЕЛЬ ЗАДАЧ В ЛИСТЕ
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
	        vm.clickHandler = {
	            onClick: function onClick(value) {
	                alert('Name: ' + value);
	            }
	        };

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

	        /*==============================ИНИЦИАЦИЯ==============================*/
	        $('#dtpckr').datepicker();

	        var gridnameJsonLists = [];
	        var curUser = false;

	        //ИНИЦИИРУЕМ КОНТРОЛЛЕР
	        initController();

	        //АГРЕГАТНАЯ ФУНКЦИЯ ИНИЦИИ КОНТРОЛЛЕРА СОСТОИТ ИЗ НЕСКОЛЬКИХ "ВЫЗЫВАЮЩИХ"" ФУНКЦИЙ
	        function initController() {

	            //ЗАГРУЖАЕМ ТЕКУЩЕГО ЮЗЕРА ФАБРИКА UserService
	            // loadCurrentUser(); //frontend/assets/app-services/user.service.js

	            //ЗАГРУЖАЕМ ВСЕХ ЮЗЕРОВ ФАБРИКА UserService
	            loadAllUsers(); //frontend/assets/app-services/user.service.js       

	            // ИМПОРТИРУЕМ СПИСОК ЛИСТОВ ФАБРИКА UserService
	            getJsonLists(); //frontend/assets/app-services/json_service.js

	            //ИМПОРТИРУЕМ СПИСОК ЗАДАЧ ФАБРИКА UserService 
	            getJsonTasks(); //frontend/assets/app-services/json_service.js

	            // ИМПОРТИРУЕМ СПИСОК ИМЕН СТОЛБЦОВ ГРИДА
	            getJsonGridname();

	            //СОЗДАЕМ СОДЕРЖИМОЕ ДЛЯ ДРАГнДРОП ЛИСТОВ
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
	        };

	        //ФУНКЦИЯ ИМПОРТА СПИСКА ЗАДАЧ
	        function getJsonTasks() {
	            vm.resjsontasks = JsonService.getResultFromJson('db/tasks.json');
	        };

	        /**
	         * @description ФУНКЦИОНАЛ makeList (id_list):<br>
	         * ВОЗВРАЩАЕТ ОТФИЛЬТРОВАННЫЙ ПО ПОЛЮ - id_list МАССИВ ЗАДАЧ<br>
	                function makeList (id_list) {
	                    var filter_resjsontasks = [];
	                    filter_resjsontasks = vm.resjsontasks.filter(item => item.id_list == id_list);
	                    return filter_resjsontasks;
	                };
	         * @method makeList
	         * @param {Integer} id_list ID ЛИСТА
	         * @return {Object} filter_resjsontasks
	         */
	        //ФУНКЦИЯ НАПОЛНЕНИЯ КАЖДОГО ЛИСТА ЗАДАЧАМИ (ПО id_list) ВЫЗЫВАЕТСЯ ИЗ  createSheets()
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
	                    for(let i=0; i < resgetJsonLists.length; i++){
	                        vm['list_' + resgetJsonLists[i].id] = makeList(resgetJsonLists[i].id);
	                        vm['list_' + resgetJsonLists[i].id].name = resgetJsonLists[i].name;
	                        vm.rawScreens.push(vm['list_' + resgetJsonLists[i].id]);
	                    };
	                };
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
	                    if(tt[j].id == "execution_status" || tt[j].id == "id_list"){
	                        if(tt[j].id == "execution_status") {
	                            myCelTemp = myCelTemp1;
	                        }else{
	                            myCelTemp = myCelTemp2;
	                        };
	                        str = '{"field" : "' + tt[j].id + '"' + ',' + '"cellTemplate" : "' + myCelTemp + '"}' //' + '"enableFiltering" : ' + false + 
	                        vm.ngGridView.columnDefs.push(JSON.parse(str)); 
	                    }else{
	                        str = '{"field" : "' + tt[j].id + '"' + ',' + '"displayName" : "' + gridnameJsonLists[j].id + '"}' //' + '"enableFiltering" : ' + false + 
	                        vm.ngGridView.columnDefs.push(JSON.parse(str)); 
	                    }
	                }
	            };
	         * 6. СКРЫВАЕМ ПОЛЕ ЕСЛИ ОНО ПРИСУТСТВУЕТ В МАССИВЕ notVisible ДЛЯ ОСТАЛЬНЫХ - ПЕРЕИМЕНОВЫВАЕМ ПОЛЯ ГРИДА
	            
	            for(let j=0; j < notVisible.length; j++){
	                for(let i=0; i < vm.ngGridView.columnDefs.length; i++){
	                    if(vm.ngGridView.columnDefs[i].field == notVisible[j]){
	                        vm.ngGridView.columnDefs[i].visible = false;
	                    }else{
	                        //НАХОДИМ ПО id (j) ИНДЕКС ЗАДАЧИ В МАССИВЕ vm.resjsontasks
	                        let firstIndex = find_index_by_id(gridnameJsonLists, vm.ngGridView.columnDefs[i].field);
	                        vm.ngGridView.columnDefs[i].displayName = gridnameJsonLists[firstIndex].gridname;
	                        vm.ngGridView.columnDefs[i].width = gridnameJsonLists[firstIndex].width;
	                    }
	                }
	            };
	         * 7. ДОБАВЛЯЕМ КНОПКИ РЕДАКТИРОВАНИЯ И УДАЛЕНИЯ
	         * @method initGrid
	         */
	        //ФУНКЦИЯ СОЗДАНИЯ ГРИДА
	        function initGrid() {
	            vm.gridOptions = {
	                enableCellEdit: false,
	                multiSelect: true,
	                enableColumnResizing: true,
	                enableRowSelection: false,
	                enableSelectAll: true,
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

	            vm.arrlist = [{ 1: "Ожидает" }, { 2: "В работе" }, { 3: "Выполнено" }];

	            //ДОБАВЛЯЕММ ФИЛЬТРЫ SELECT И ОТМЕНЯЕМ ФИЛЬТРЫ ДЛЯ КНОПОК
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

	                        //     let myCelTempl = '<select  ng-cell-input '
	                        //         + 'ng-options=\'s.id as s.value for s in vm.arrlist\''
	                        //         + 'ng-class=\'colt\''
	                        //         + 'ng-model=\'COL_FIELD\''
	                        //         + 'ng-input=\'COL_FIELD\''
	                        //         + 'data-placeholder=\'-- Select One --\'>'
	                        //     + '</select>'

	                        // vm.gridOptions.columnDefs[j].cellTemplate = myCelTempl;
	                        // vm.gridOptions.columnDefs[j].enableCellEdit = true;

	                        vm.gridOptions.columnDefs[_j2].name = "id_list";
	                        vm.gridOptions.columnDefs[_j2].editDropdownValueLabel = "id_list";
	                        vm.gridOptions.columnDefs[_j2].editableCellTemplate = "ui-grid/dropdownEditor";
	                        vm.gridOptions.columnDefs[_j2].editDropdownOptionsArray = vm.arrlist;
	                    }
	                };

	                if (vm.gridOptions.columnDefs[_j2].field == "edit" || vm.gridOptions.columnDefs[_j2].field == "delete") vm.gridOptions.columnDefs[_j2].enableFiltering = false;

	                // if(vm.gridOptions.columnDefs[j].field == "date" ){
	                //     vm.gridOptions.columnDefs[j].type = 'date',
	                //     vm.gridOptions.columnDefs[j].cellFilter = 'date:"yyyy-MM-dd"'
	                // }
	            };
	            // console.log(vm.gridOptions.columnDefs);

	            // vm.gridOptions.multiSelect = true;

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
	         * 3. ОБНОВЛЯЕТ vm.rawScreens
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
	                // vm.rawScreens.push(JSON.parse(str));
	                // vm['list_' + i].push(JSON.parse(str));
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
	            });
	        };

	        //ФУНКЦИЯ УДАЛЕНИЯ ЮЗЕРА 
	        function deleteUser(id) {
	            UserService.Delete(id).then(function () {
	                loadAllUsers();
	            });
	        };
	    }
		})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZV9jb250cm9sbGVyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGRhYWE0ZTgwODBkM2M3YTVmNWZhIiwid2VicGFjazovLy9mcm9udGVuZC9hc3NldHMvaG9tZS9ob21lLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRhYWE0ZTgwODBkM2M3YTVmNWZhIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBIb21lQ29udHJvbGxlcik7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog0J/QoNCV0JTQntCh0KLQkNCS0JvQldCd0JjQlSDQlNCQ0J3QndCr0KUg0JIg0JLQmNCU0JUgRFJBRyZEUk9QINCYIG5nLUdSSURcclxuICAgICAgICAgICAgSG9tZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCAnSnNvblNlcnZpY2UnLCAnJHJvb3RTY29wZSddO1xyXG4gICAgICAgICAgICAuLi4uLi4uLlxyXG4gICAgICAgICogQGNsYXNzIEhvbWVDb250cm9sbGVyXHJcbiAgICAgICAgKiBAbW9kdWxlIGFwcFxyXG4gICAgICAgICogQG1haW4gSG9tZUNvbnRyb2xsZXJcclxuICAgICAgICAqL1xyXG5cclxuICAgIEhvbWVDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJywgJ0pzb25TZXJ2aWNlJywgJ3VpR3JpZENvbnN0YW50cycsJyRyb290U2NvcGUnLCAnJHRpbWVvdXQnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBIb21lQ29udHJvbGxlcihVc2VyU2VydmljZSwgSnNvblNlcnZpY2UsIHVpR3JpZENvbnN0YW50cywgJHJvb3RTY29wZSwgJHRpbWVvdXQpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT090JLQodCVINCn0KLQniDQndCj0JbQndCeINCU0JvQryBIVE1MPT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiA8cD7QktCh0JUg0KfQotCeIFwi0J/QoNCV0JTQkNCV0KLQodCvXCJcIiDQkiBIVE1MPC9wPlxyXG4gICAgICAgICAgICB2bS50YXNja19saW1pdCA9IDE1OyAvL9Ce0JPQoNCQ0J3QmNCn0JjQotCV0JvQrCDQl9CQ0JTQkNCnINCSINCb0JjQodCi0JVcclxuICAgICAgICAgICAgdm0ubmdHcmlkVmlldyA9IG51bGw7XHJcbiAgICAgICAgICAgIHZtLnVzZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB2bS5hbGxVc2VycyA9IFtdO1xyXG4gICAgICAgICAgICB2bS5kZWxldGVVc2VyID0gZGVsZXRlVXNlcjtcclxuICAgICAgICAgICAgdm0uZXhpdF9tb2RhbCA9IGV4aXRfbW9kYWw7XHJcbiAgICAgICAgICAgIHZtLnNhdmV0YXNjayA9IHNhdmV0YXNjaztcclxuICAgICAgICAgICAgdm0uZWRpdHRhc2NrID0gZWRpdHRhc2NrO1xyXG4gICAgICAgICAgICB2bS5kZWx0YXNjayA9IGRlbHRhc2NrO1xyXG4gICAgICAgICAgICB2bS5hZGR0YXNjayA9IGFkZHRhc2NrO1xyXG4gICAgICAgICAgICB2bS5kZWZfY2xpY2sgPSBkZWZfY2xpY2s7XHJcbiAgICAgICAgICAgIHZtLmZpbmlzaF9sb2FkZXIgPSBmaW5pc2hfbG9hZGVyO1xyXG4gICAgICAgICAgICB2bS5zdGFydF9sb2FkZXIgPSBzdGFydF9sb2FkZXI7XHJcbiAgICAgICAgICAgIHZtLmxvZ01vZGVscyA9IGxvZ01vZGVscztcclxuICAgICAgICAgICAgdm0ubXlfYWxlcnQgPSBteV9hbGVydDtcclxuICAgICAgICAgICAgdm0uY2hhbmdlX2xpc3QgPSBjaGFuZ2VfbGlzdDtcclxuICAgICAgICAgICAgdm0uY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZtLnJhd1NjcmVlbnMgPSBbXTtcclxuICAgICAgICAgICAgdm0uc29ydGluZ0xvZyA9IFtdO1xyXG4gICAgICAgICAgICB2bS5yZXNqc29udGFza3MgPSBbXTtcclxuICAgICAgICAgICAgdm0ucmVzZ2V0SnNvbkxpc3RzID0gW107XHJcbiAgICAgICAgICAgIHZtLnNvcnRhYmxlT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcImFwcFwiLFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdFdpdGg6IFwiLmFwcHMtY29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoLy8gZW5zdXJlIHdlIGFyZSBpbiB0aGUgZmlyc3QgdXBkYXRlKCkgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICF1aS5pdGVtLnNvcnRhYmxlLnJlY2VpdmVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGF0IGl0cyBhbiBhY3R1YWwgbW92aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBiZXR3ZWVuIHRoZSB0d28gbGlzdHNcclxuICAgICAgICAgICAgICAgICAgICAgIHVpLml0ZW0uc29ydGFibGUuc291cmNlWzBdICE9PSB1aS5pdGVtLnNvcnRhYmxlLmRyb3B0YXJnZXRbMF0gJiZcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRoZSBzaXplIGxpbWl0YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgIHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldE1vZGVsLmxlbmd0aCA+PSB2bS50YXNja19saW1pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpLml0ZW0uc29ydGFibGUuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdG9wOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgICAgLy8hISEg0J7QkdCd0J7QktCb0K/QldCcIGlkX2xpc3Qg0KMg0J/QldCg0JXQnNCV0KnQldCd0J3QntCZINCX0JDQlNCQ0KfQmCAhISFcclxuICAgICAgICAgICAgICAgICAgLy8gdmFyIHN0ciA9IE51bWJlcih1aS5pdGVtLnNvcnRhYmxlLmRyb3B0YXJnZXRMaXN0WzBdLmF0dHJpYnV0ZXMuaWQudmFsdWUuc2xpY2UoNywxMCkpO1xyXG4gICAgICAgICAgICAgICAgICAvLyB1aS5pdGVtLnNvcnRhYmxlLm1vZGVsLmlkX2xpc3QgPSBzdHIgKyAxXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZtLnJhd1NjcmVlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5yYXdTY3JlZW5zW2ldLm1hcChmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeC5pZF9saXN0ID0gaSArIDE7IFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJCgnI2R0cGNrcicpLmRhdGVwaWNrZXIoKTtcclxuICAgICAgICAgKiBAcHJvcGVydHkg0JTQkNCd0J3Qq9CVINCU0JvQryBIVE1MXHJcbiAgICAgICAgICogQHR5cGUgT2JqZWN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBmaW5hbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZtLnRhc2NrX2xpbWl0ID0gMTU7IC8v0J7Qk9Cg0JDQndCY0KfQmNCi0JXQm9CsINCX0JDQlNCQ0Kcg0JIg0JvQmNCh0KLQlVxyXG4gICAgICAgIHZtLm5nR3JpZFZpZXcgPSBudWxsO1xyXG5cclxuICAgICAgICB2bS51c2VyID0gbnVsbDtcclxuICAgICAgICB2bS5hbGxVc2VycyA9IFtdO1xyXG4gICAgICAgIHZtLmRlbGV0ZVVzZXIgPSBkZWxldGVVc2VyO1xyXG5cclxuICAgICAgICB2bS5leGl0X21vZGFsID0gZXhpdF9tb2RhbDtcclxuICAgICAgICB2bS5zYXZldGFzY2sgPSBzYXZldGFzY2s7XHJcbiAgICAgICAgdm0uZWRpdHRhc2NrID0gZWRpdHRhc2NrO1xyXG4gICAgICAgIHZtLmRlbHRhc2NrID0gZGVsdGFzY2s7XHJcbiAgICAgICAgdm0uYWRkdGFzY2sgPSBhZGR0YXNjaztcclxuICAgICAgICB2bS5kZWZfY2xpY2sgPSBkZWZfY2xpY2s7XHJcbiAgICAgICAgdm0uZmluaXNoX2xvYWRlciA9IGZpbmlzaF9sb2FkZXI7XHJcbiAgICAgICAgdm0uc3RhcnRfbG9hZGVyID0gc3RhcnRfbG9hZGVyO1xyXG4gICAgICAgIHZtLmxvZ01vZGVscyA9IGxvZ01vZGVscztcclxuICAgICAgICB2bS5teV9hbGVydCA9IG15X2FsZXJ0O1xyXG4gICAgICAgIHZtLmNoYW5nZV9saXN0ID0gY2hhbmdlX2xpc3Q7XHJcbiAgICAgICAgdm0uY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgdm0uY2xpY2tIYW5kbGVyID0ge1xyXG4gICAgICAgICAgICAgb25DbGljayA6IGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdOYW1lOiAnK3ZhbHVlKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0ucmF3U2NyZWVucyA9IFtdO1xyXG4gICAgICAgIHZtLnNvcnRpbmdMb2cgPSBbXTtcclxuXHJcbiAgICAgICAgdm0ucmVzanNvbnRhc2tzID0gW107XHJcbiAgICAgICAgdm0ucmVzZ2V0SnNvbkxpc3RzID0gW107XHJcblxyXG4gICAgICAgIHZtLnNvcnRhYmxlT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGNvbm5lY3RXaXRoOiBcIi5hcHBzLWNvbnRhaW5lclwiLFxyXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgIGlmICgvLyBlbnN1cmUgd2UgYXJlIGluIHRoZSBmaXJzdCB1cGRhdGUoKSBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAhdWkuaXRlbS5zb3J0YWJsZS5yZWNlaXZlZCAmJlxyXG4gICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGF0IGl0cyBhbiBhY3R1YWwgbW92aW5nXHJcbiAgICAgICAgICAgICAgICAgIC8vIGJldHdlZW4gdGhlIHR3byBsaXN0c1xyXG4gICAgICAgICAgICAgICAgICB1aS5pdGVtLnNvcnRhYmxlLnNvdXJjZVswXSAhPT0gdWkuaXRlbS5zb3J0YWJsZS5kcm9wdGFyZ2V0WzBdICYmXHJcbiAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRoZSBzaXplIGxpbWl0YXRpb25cclxuICAgICAgICAgICAgICAgICAgdWkuaXRlbS5zb3J0YWJsZS5kcm9wdGFyZ2V0TW9kZWwubGVuZ3RoID49IHZtLnRhc2NrX2xpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICB1aS5pdGVtLnNvcnRhYmxlLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgLy8hISEg0J7QkdCd0J7QktCb0K/QldCcIGlkX2xpc3Qg0KMg0J/QldCg0JXQnNCV0KnQldCd0J3QntCZINCX0JDQlNCQ0KfQmCAhISFcclxuICAgICAgICAgICAgICAvLyB2YXIgc3RyID0gTnVtYmVyKHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldExpc3RbMF0uYXR0cmlidXRlcy5pZC52YWx1ZS5zbGljZSg3LDEwKSk7XHJcbiAgICAgICAgICAgICAgLy8gdWkuaXRlbS5zb3J0YWJsZS5tb2RlbC5pZF9saXN0ID0gc3RyICsgMVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdm0ucmF3U2NyZWVucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVuc1tpXS5tYXAoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh4KTtcclxuICAgICAgICAgICAgICAgICAgICB4LmlkX2xpc3QgPSBpICsgMTsgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07IFxyXG5cclxuICAgICAgICB2bS5zdGF0dXMgPSBbXHJcbiAgICAgICAgICAgIHtpZDogMSwgbmFtZTon0J7QttC40LTQsNC10YInfSxcclxuICAgICAgICAgICAge2lkOiAyLCBuYW1lOifQkiDRgNCw0LHQvtGC0LUnfSxcclxuICAgICAgICAgICAge2lkOiAzLCBuYW1lOifQktGL0L/QvtC70L3QtdC90L4nfSxcclxuICAgICAgICBdO1xyXG5cclxuXHJcbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PdCY0J3QmNCm0JjQkNCm0JjQrz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbiAgICAgICAgJCgnI2R0cGNrcicpLmRhdGVwaWNrZXIoKTtcclxuXHJcbiAgICAgICAgdmFyIGdyaWRuYW1lSnNvbkxpc3RzID0gW107XHJcbiAgICAgICAgbGV0IGN1clVzZXIgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy/QmNCd0JjQptCY0JjQoNCj0JXQnCDQmtCe0J3QotCg0J7Qm9Cb0JXQoFxyXG4gICAgICAgIGluaXRDb250cm9sbGVyKCk7XHJcblxyXG4gICAgICAgIC8v0JDQk9Cg0JXQk9CQ0KLQndCQ0K8g0KTQo9Cd0JrQptCY0K8g0JjQndCY0KbQmNCYINCa0J7QndCi0KDQntCb0JvQldCg0JAg0KHQntCh0KLQntCY0KIg0JjQlyDQndCV0KHQmtCe0JvQrNCa0JjQpSBcItCS0KvQl9Cr0JLQkNCu0KnQmNClXCJcIiDQpNCj0J3QmtCm0JjQmVxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRDb250cm9sbGVyKCkge1xyXG5cclxuICAgICAgICAgICAgLy/Ql9CQ0JPQoNCj0JbQkNCV0Jwg0KLQldCa0KPQqdCV0JPQniDQrtCX0JXQoNCQINCk0JDQkdCg0JjQmtCQIFVzZXJTZXJ2aWNlXHJcbiAgICAgICAgICAgIC8vIGxvYWRDdXJyZW50VXNlcigpOyAvL2Zyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvdXNlci5zZXJ2aWNlLmpzXHJcblxyXG4gICAgICAgICAgICAvL9CX0JDQk9Cg0KPQltCQ0JXQnCDQktCh0JXQpSDQrtCX0JXQoNCe0JIg0KTQkNCR0KDQmNCa0JAgVXNlclNlcnZpY2VcclxuICAgICAgICAgICAgbG9hZEFsbFVzZXJzKCk7IC8vZnJvbnRlbmQvYXNzZXRzL2FwcC1zZXJ2aWNlcy91c2VyLnNlcnZpY2UuanMgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyDQmNCc0J/QntCg0KLQmNCg0KPQldCcINCh0J/QmNCh0J7QmiDQm9CY0KHQotCe0JIg0KTQkNCR0KDQmNCa0JAgVXNlclNlcnZpY2VcclxuICAgICAgICAgICAgZ2V0SnNvbkxpc3RzKCk7IC8vZnJvbnRlbmQvYXNzZXRzL2FwcC1zZXJ2aWNlcy9qc29uX3NlcnZpY2UuanNcclxuXHJcbiAgICAgICAgICAgIC8v0JjQnNCf0J7QoNCi0JjQoNCj0JXQnCDQodCf0JjQodCe0Jog0JfQkNCU0JDQpyDQpNCQ0JHQoNCY0JrQkCBVc2VyU2VydmljZSBcclxuICAgICAgICAgICAgZ2V0SnNvblRhc2tzKCk7IC8vZnJvbnRlbmQvYXNzZXRzL2FwcC1zZXJ2aWNlcy9qc29uX3NlcnZpY2UuanNcclxuXHJcbiAgICAgICAgICAgIC8vINCY0JzQn9Ce0KDQotCY0KDQo9CV0Jwg0KHQn9CY0KHQntCaINCY0JzQldCdINCh0KLQntCb0JHQptCe0JIg0JPQoNCY0JTQkFxyXG4gICAgICAgICAgICBnZXRKc29uR3JpZG5hbWUoKTtcclxuXHJcbiAgICAgICAgICAgIC8v0KHQntCX0JTQkNCV0Jwg0KHQntCU0JXQoNCW0JjQnNCe0JUg0JTQm9CvINCU0KDQkNCT0L3QlNCg0J7QnyDQm9CY0KHQotCe0JJcclxuICAgICAgICAgICAgY3JlYXRlU2hlZXRzKHZtLnJlc2dldEpzb25MaXN0cyk7XHJcbiAgICAgICAgfTsgXHJcblxyXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PdCe0J/QldCg0JDQotCY0JLQndCr0JUg0KTQo9Cd0JrQptCY0Jg9PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JjQnNCf0J7QoNCi0JAg0KHQn9CY0KHQmtCQINCY0JzQldCdINCf0J7Qm9CV0Jkg0JPQoNCY0JTQkFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEpzb25HcmlkbmFtZSgpe1xyXG4gICAgICAgICAgICBncmlkbmFtZUpzb25MaXN0cyA9IEpzb25TZXJ2aWNlLmdldFJlc3VsdEZyb21Kc29uKCdkYi9ncmlkbmFtZS5qc29uJylcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCY0JzQn9Ce0KDQotCQINCh0J/QmNCh0JrQkCDQm9CY0KHQotCe0JJcclxuICAgICAgICBmdW5jdGlvbiBnZXRKc29uTGlzdHMoKXtcclxuICAgICAgICAgICAgdm0ucmVzZ2V0SnNvbkxpc3RzID0gSnNvblNlcnZpY2UuZ2V0UmVzdWx0RnJvbUpzb24oJ2RiL2xpc3RzTmFtZS5qc29uJylcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCY0JzQn9Ce0KDQotCQINCh0J/QmNCh0JrQkCDQl9CQ0JTQkNCnXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SnNvblRhc2tzKCl7XHJcbiAgICAgICAgICAgIHZtLnJlc2pzb250YXNrcyA9IEpzb25TZXJ2aWNlLmdldFJlc3VsdEZyb21Kc29uKCdkYi90YXNrcy5qc29uJylcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0JsgbWFrZUxpc3QgKGlkX2xpc3QpOjxicj5cclxuICAgICAgICAgKiDQktCe0JfQktCg0JDQqdCQ0JXQoiDQntCi0KTQmNCb0KzQotCg0J7QktCQ0J3QndCr0Jkg0J/QniDQn9Ce0JvQriAtIGlkX2xpc3Qg0JzQkNCh0KHQmNCSINCX0JDQlNCQ0Kc8YnI+XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYWtlTGlzdCAoaWRfbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJfcmVzanNvbnRhc2tzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyX3Jlc2pzb250YXNrcyA9IHZtLnJlc2pzb250YXNrcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkX2xpc3QgPT0gaWRfbGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcl9yZXNqc29udGFza3M7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAqIEBtZXRob2QgbWFrZUxpc3RcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGlkX2xpc3QgSUQg0JvQmNCh0KLQkFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gZmlsdGVyX3Jlc2pzb250YXNrc1xyXG4gICAgICAgICAqLyBcclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCd0JDQn9Ce0JvQndCV0J3QmNCvINCa0JDQltCU0J7Qk9CeINCb0JjQodCi0JAg0JfQkNCU0JDQp9CQ0JzQmCAo0J/QniBpZF9saXN0KSDQktCr0JfQq9CS0JDQldCi0KHQryDQmNCXICBjcmVhdGVTaGVldHMoKVxyXG4gICAgICAgIGZ1bmN0aW9uIG1ha2VMaXN0IChpZF9saXN0KSB7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJfcmVzanNvbnRhc2tzID0gW107XHJcbiAgICAgICAgICAgIGlmKHZtLnVzZXIuaWQgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyX3Jlc2pzb250YXNrcyA9IHZtLnJlc2pzb250YXNrcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkX2xpc3QgPT0gaWRfbGlzdCAmJiBpdGVtLmlkX3VzZXIgPT0gdm0udXNlci5pZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyX3Jlc2pzb250YXNrcyA9IHZtLnJlc2pzb250YXNrcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkX2xpc3QgPT0gaWRfbGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcl9yZXNqc29udGFza3M7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIGNyZWF0ZVNoZWV0cyAocmVzZ2V0SnNvbkxpc3RzKTo8YnI+XHJcbiAgICAgICAgICog0KbQmNCa0JvQntCcINCh0J7Ql9CU0JDQrtCi0KHQryDQm9CY0KHQotCrLiDQm9CY0KHQotCQ0Jwg0J/QoNCY0KHQktCQ0JjQktCQ0JXQotCh0K8g0JjQnNCvINCYIElEPGJyPiDQodCe0JfQlNCQ0J3QndCr0JUg0JvQmNCh0KLQqyDQlNCe0JHQkNCS0JvQr9Cu0KLQodCvINCSINCc0JDQodCh0JjQkiB2bS5yYXdTY3JlZW5zXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVTaGVldHMocmVzZ2V0SnNvbkxpc3RzKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHJlc2dldEpzb25MaXN0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdID0gbWFrZUxpc3QocmVzZ2V0SnNvbkxpc3RzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0ubmFtZSA9IHJlc2dldEpzb25MaXN0c1tpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5yYXdTY3JlZW5zLnB1c2godm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlU2hlZXRzXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHJlc2dldEpzb25MaXN0cyDQnNCQ0KHQodCY0JIg0JjQnNCV0J0g0JvQmNCh0KLQntCSXHJcbiAgICAgICAgICovIFxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0KHQntCX0JTQkNCd0JjQryDQm9CY0KHQotCe0JJcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTaGVldHMocmVzZ2V0SnNvbkxpc3RzKXtcclxuICAgICAgICAgICAgaWYoIWN1clVzZXIpe1xyXG4gICAgICAgICAgICAgICAgVXNlclNlcnZpY2UuR2V0QnlVc2VybmFtZSgkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXIudXNlcm5hbWUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VyJywgdXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCByZXNnZXRKc29uTGlzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSA9IG1ha2VMaXN0KHJlc2dldEpzb25MaXN0c1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdLm5hbWUgPSByZXNnZXRKc29uTGlzdHNbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVucy5wdXNoKHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1clVzZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v0KHQntCX0JTQkNCB0Jwg0JPQoNCY0JRcclxuICAgICAgICAgICAgICAgICAgICBpbml0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCByZXNnZXRKc29uTGlzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdID0gbWFrZUxpc3QocmVzZ2V0SnNvbkxpc3RzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXS5uYW1lID0gcmVzZ2V0SnNvbkxpc3RzW2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVucy5wdXNoKHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0JsgaW5pdEdyaWQgKCk6PGJyPlxyXG4gICAgICAgICAqIDEuIHZtLm5nR3JpZFZpZXcgLSDQntCi0J7QkdCg0JDQltCQ0JXQoiDQk9Cg0JjQlCDQkiBIVE1MPGJyPlxyXG4gICAgICAgICAqIDIuIHZtLnN0YXR1cyAtINCc0JDQodCh0JjQkiDQodCi0JDQotCj0KHQntCSINCX0JDQlNCQ0KfQmCAobXlDZWxUZW1wMSAtIFNFTEVDVCDQmNCXIHZtLnN0YXR1cyk8YnI+XHJcbiAgICAgICAgICogMy4gdm0uZHJhZ25kcm9wX2xpc3QgLSDQnNCQ0KHQodCY0JIg0JvQmNCh0KLQntCSIChteUNlbFRlbXAyIC0gU0VMRUNUINCY0Jcgdm0uZHJhZ25kcm9wX2xpc3QpIDxicj5cclxuICAgICAgICAgKiA0LiDQktCr0JLQntCUINCf0J7Qm9CV0Jkg0JIgR1JJRCDQn9CeINCf0J7QoNCv0JTQmtCjINCh0J7QoNCi0JjQoNCe0JLQmtCYINCf0J7Qm9CvIHNvcnQg0JzQkNCh0KHQmNCS0JAgcmlkbmFtZUpzb25MaXN0czxicj5cclxuICAgICAgICAgKiA1LiDQlNCb0K8g0J7QotCe0JHQoNCQ0JbQldCd0JjQryDQkiDQotCQ0JHQm9CY0KbQlSDQodCe0JfQlNCQ0JXQnCBcItCh0KLQoNCe0JrQntCS0KvQmSDQntCR0KrQldCa0KJcIi0gc3RyINCYINCf0KPQqNCY0Jwg0JXQk9CeINCSIGNvbHVtbkRlZnNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgdHQubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodHRbal0uaWQgIT0gXCIkJGhhc2hLZXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR0W2pdLmlkID09IFwiZXhlY3V0aW9uX3N0YXR1c1wiIHx8IHR0W2pdLmlkID09IFwiaWRfbGlzdFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHRbal0uaWQgPT0gXCJleGVjdXRpb25fc3RhdHVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15Q2VsVGVtcCA9IG15Q2VsVGVtcDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDZWxUZW1wID0gbXlDZWxUZW1wMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gJ3tcImZpZWxkXCIgOiBcIicgKyB0dFtqXS5pZCArICdcIicgKyAnLCcgKyAnXCJjZWxsVGVtcGxhdGVcIiA6IFwiJyArIG15Q2VsVGVtcCArICdcIn0nIC8vJyArICdcImVuYWJsZUZpbHRlcmluZ1wiIDogJyArIGZhbHNlICsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLm5nR3JpZFZpZXcuY29sdW1uRGVmcy5wdXNoKEpTT04ucGFyc2Uoc3RyKSk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSAne1wiZmllbGRcIiA6IFwiJyArIHR0W2pdLmlkICsgJ1wiJyArICcsJyArICdcImRpc3BsYXlOYW1lXCIgOiBcIicgKyBncmlkbmFtZUpzb25MaXN0c1tqXS5pZCArICdcIn0nIC8vJyArICdcImVuYWJsZUZpbHRlcmluZ1wiIDogJyArIGZhbHNlICsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLm5nR3JpZFZpZXcuY29sdW1uRGVmcy5wdXNoKEpTT04ucGFyc2Uoc3RyKSk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgKiA2LiDQodCa0KDQq9CS0JDQldCcINCf0J7Qm9CVINCV0KHQm9CYINCe0J3QniDQn9Cg0JjQodCj0KLQodCi0JLQo9CV0KIg0JIg0JzQkNCh0KHQmNCS0JUgbm90VmlzaWJsZSDQlNCb0K8g0J7QodCi0JDQm9Cs0J3Qq9ClIC0g0J/QldCg0JXQmNCc0JXQndCe0JLQq9CS0JDQldCcINCf0J7Qm9CvINCT0KDQmNCU0JBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgbm90VmlzaWJsZS5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHZtLm5nR3JpZFZpZXcuY29sdW1uRGVmcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm0ubmdHcmlkVmlldy5jb2x1bW5EZWZzW2ldLmZpZWxkID09IG5vdFZpc2libGVbal0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5uZ0dyaWRWaWV3LmNvbHVtbkRlZnNbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL9Cd0JDQpdCe0JTQmNCcINCf0J4gaWQgKGopINCY0J3QlNCV0JrQoSDQl9CQ0JTQkNCn0Jgg0JIg0JzQkNCh0KHQmNCS0JUgdm0ucmVzanNvbnRhc2tzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdEluZGV4ID0gZmluZF9pbmRleF9ieV9pZChncmlkbmFtZUpzb25MaXN0cywgdm0ubmdHcmlkVmlldy5jb2x1bW5EZWZzW2ldLmZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0ubmdHcmlkVmlldy5jb2x1bW5EZWZzW2ldLmRpc3BsYXlOYW1lID0gZ3JpZG5hbWVKc29uTGlzdHNbZmlyc3RJbmRleF0uZ3JpZG5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLm5nR3JpZFZpZXcuY29sdW1uRGVmc1tpXS53aWR0aCA9IGdyaWRuYW1lSnNvbkxpc3RzW2ZpcnN0SW5kZXhdLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgKiA3LiDQlNCe0JHQkNCS0JvQr9CV0Jwg0JrQndCe0J/QmtCYINCg0JXQlNCQ0JrQotCY0KDQntCS0JDQndCY0K8g0Jgg0KPQlNCQ0JvQldCd0JjQr1xyXG4gICAgICAgICAqIEBtZXRob2QgaW5pdEdyaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCh0J7Ql9CU0JDQndCY0K8g0JPQoNCY0JTQkFxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRHcmlkKCkge1xyXG4gICAgICAgICAgICB2bS5ncmlkT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZUNlbGxFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlQ29sdW1uUmVzaXppbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVSb3dTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlU2VsZWN0QWxsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlRmlsdGVyaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0dyaWRGb290ZXI6dHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9uUmVnaXN0ZXJBcGk6IGZ1bmN0aW9uKGdyaWRBcGkpe1xyXG4gICAgICAgICAgICAgICAgICB2bS5ncmlkQXBpID0gZ3JpZEFwaTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5EZWZzOiBbXVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0cjtcclxuXHJcbiAgICAgICAgICAgIC8qINCh0J7QoNCi0JjQoNCj0JXQnCBncmlkbmFtZUpzb25MaXN0cyDQlNCb0K8g0J7QotCe0JHQoNCQ0JbQldCd0JjQryDQodCi0J7Qm9CR0KbQntCSINCX0JDQlNCQ0Kcg0JIg0KHQntCe0KLQktCV0KLQodCi0JLQmNCVINChINCf0J7Qm9CV0Jwgc29ydCBncmlkbmFtZUpzb25MaXN0cyAqL1xyXG4gICAgICAgICAgICBsZXQgdHQgPSBncmlkbmFtZUpzb25MaXN0cy5zb3J0KChhLGIpID0+IGEuc29ydCAtIGIuc29ydCk7XHJcblxyXG4gICAgICAgICAgICAvKtCU0JvQryDQntCi0J7QkdCg0JDQltCV0J3QmNCvINCSINCi0JDQkdCb0JjQptCVINCh0J7Ql9CU0JDQldCcIFwi0KHQotCg0J7QmtCe0JLQq9CZINCe0JHQqtCV0JrQolwiLSBzdHJcclxuICAgICAgICAgICAg0Jgg0J/Qo9Co0JjQnCDQldCT0J4g0JIgY29sdW1uRGVmcyovXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgdHQubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodHRbal0uaWQgIT0gXCIkJGhhc2hLZXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSAne1wiZmllbGRcIiA6IFwiJyArIHR0W2pdLmlkICsgJ1wiJyArICcsJyArICdcImRpc3BsYXlOYW1lXCIgOiBcIicgKyBncmlkbmFtZUpzb25MaXN0c1tqXS5ncmlkbmFtZSArICdcIn0nIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLnB1c2goSlNPTi5wYXJzZShzdHIpKTsgXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IG5vdFZpc2libGUgPSBbJ2lkJ107Ly8naWRfbGlzdCdcclxuXHJcbiAgICAgICAgICAgIC8v0KHQmtCg0KvQktCQ0JXQnCDQn9Ce0JvQlSDQldCh0JvQmCDQntCd0J4g0J/QoNCY0KHQo9Ci0KHQotCS0KPQldCiINCSINCc0JDQodCh0JjQktCVIG5vdFZpc2libGUg0JTQm9CvINCe0KHQotCQ0JvQrNCd0KvQpSAtINCf0JXQoNCV0JjQnNCV0J3QntCS0KvQktCQ0JXQnCDQn9Ce0JvQryDQk9Cg0JjQlNCQXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgbm90VmlzaWJsZS5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0uZmllbGQgPT0gbm90VmlzaWJsZVtqXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL9Cd0JDQpdCe0JTQmNCcINCf0J4gaWQgKGopINCY0J3QlNCV0JrQoSDQl9CQ0JTQkNCn0Jgg0JIg0JzQkNCh0KHQmNCS0JUgdm0ucmVzanNvbnRhc2tzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdEluZGV4ID0gZmluZF9pbmRleF9ieV9pZChncmlkbmFtZUpzb25MaXN0cywgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS5maWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0uZGlzcGxheU5hbWUgPSBncmlkbmFtZUpzb25MaXN0c1tmaXJzdEluZGV4XS5ncmlkbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS53aWR0aCA9IGdyaWRuYW1lSnNvbkxpc3RzW2ZpcnN0SW5kZXhdLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8q0JTQntCR0JDQktCb0K/QldCcINCa0J3QntCf0JrQoyDQoNCV0JTQkNCa0KLQmNCg0J7QktCQ0J3QmNCvKi9cclxuICAgICAgICAgICAgbGV0IGNoZSA9ICc8aSBjbGFzcz1cXCdmYSBmYS1wZW5jaWwtc3F1YXJlLW8gYnRuIGJ0bi1zdWNjZXNzIGJ0bi1zbVxcJyBuZy1jbGljaz1cXCdncmlkLmFwcFNjb3BlLnZtLm15X2FsZXJ0KHJvdy5lbnRpdHkuaWQscm93LmVudGl0eS5pZF9saXN0LDEpXFwnPjwvaT5cIic7XHJcbiAgICAgICAgICAgIHN0ciA9J3tcImZpZWxkXCI6IFwiZWRpdFwiLCBcImVuYWJsZVNvcnRpbmdcIjogZmFsc2UsIFwiZGlzcGxheU5hbWVcIjogXCIuLi5cIiwgXCJ3aWR0aFwiOiAzOCwgXCJjZWxsVGVtcGxhdGVcIjogXCInICsgY2hlICsgJ30nXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0cik7IFxyXG4gICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLnB1c2goSlNPTi5wYXJzZShzdHIpKTtcclxuXHJcbiAgICAgICAgICAgIC8q0JTQntCR0JDQktCb0K/QldCcINCa0J3QntCf0JrQoyDQo9CU0JDQm9CV0J3QmNCvKi9cclxuICAgICAgICAgICAgY2hlID0gJzxkaXY+PGkgY2xhc3M9XFwnZmEgZmEtdHJhc2gtbyBidG4gYnRuLWRhbmdlciBidG4tc21cXCcgbmctY2xpY2s9XFwnZ3JpZC5hcHBTY29wZS52bS5teV9hbGVydChyb3cuZW50aXR5LmlkLHJvdy5lbnRpdHkuaWRfbGlzdCwwKVxcJz48L2Rpdj5cIic7XHJcbiAgICAgICAgICAgIHN0ciA9J3tcImZpZWxkXCI6IFwiZGVsZXRlXCIsIFwiZW5hYmxlU29ydGluZ1wiOiBmYWxzZSwgXCJkaXNwbGF5TmFtZVwiOiBcIi4uLlwiLCBcIndpZHRoXCI6IDM4LCBcImNlbGxUZW1wbGF0ZVwiOiBcIicgKyBjaGUgKyAnfSdcclxuICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmcy5wdXNoKEpTT04ucGFyc2Uoc3RyKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IG15TGlzdCA9ICd7XCJ2YWx1ZVwiOiBcIjFcIiwgXCJsYWJlbFwiOiBcItCf0LvQsNC9XCIgfSwgeyBcInZhbHVlXCI6IFwiMlwiLCBcImxhYmVsXCI6IFwi0JIg0L/RgNC+0YbQtdGB0YHQtVwiIH0sIHsgXCJ2YWx1ZVwiOiBcIjNcIiwgXCJsYWJlbFwiOiBcItCT0L7RgtC+0LLQvlwifSdcclxuICAgICAgICAgICAgbGV0IG15U3RhdHVzID0gJ3tcInZhbHVlXCI6IFwiMVwiLCBcImxhYmVsXCI6IFwi0J7QttC40LTQsNC10YJcIiB9LCB7IFwidmFsdWVcIjogXCIyXCIsIFwibGFiZWxcIjogXCLQkiDRgNCw0LHQvtGC0LVcIiB9LCB7IFwidmFsdWVcIjogXCIzXCIsIFwibGFiZWxcIjogXCLQktGL0L/QvtC70L3QtdC90L5cIn0nXHJcbiAgICAgICAgICAgIGxldCBteUZpbHRlcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZtLmFycmxpc3QgPSBbXHJcbiAgICAgICAgICAgICAgICB7IDE6IFwi0J7QttC40LTQsNC10YJcIiB9LCBcclxuICAgICAgICAgICAgICAgIHsgMjogXCLQkiDRgNCw0LHQvtGC0LVcIiB9LCBcclxuICAgICAgICAgICAgICAgIHsgMzogXCLQktGL0L/QvtC70L3QtdC90L5cIn1cclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIC8v0JTQntCR0JDQktCb0K/QldCc0Jwg0KTQmNCb0KzQotCg0KsgU0VMRUNUINCYINCe0KLQnNCV0J3Qr9CV0Jwg0KTQmNCb0KzQotCg0Ksg0JTQm9CvINCa0J3QntCf0J7QmlxyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiaWRfbGlzdFwiIHx8IHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJleGVjdXRpb25fc3RhdHVzXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJpZF9saXN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlGaWx0ZXIgPSBteUxpc3RcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlGaWx0ZXIgPSBteVN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gJ3snIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArICdcInR5cGVcIiA6IFwic2VsZWN0XCIsJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnXCJzZWxlY3RPcHRpb25zXCIgIDogWyAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgbXlGaWx0ZXIgXHJcbiAgICAgICAgICAgICAgICAgICAgKyAnXX0nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmlsdGVyID0gSlNPTi5wYXJzZShzdHIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiaWRfbGlzdFwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IG15Q2VsVGVtcGwgPSAnPHNlbGVjdCAgbmctY2VsbC1pbnB1dCAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgKyAnbmctb3B0aW9ucz1cXCdzLmlkIGFzIHMudmFsdWUgZm9yIHMgaW4gdm0uYXJybGlzdFxcJydcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICArICduZy1jbGFzcz1cXCdjb2x0XFwnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICsgJ25nLW1vZGVsPVxcJ0NPTF9GSUVMRFxcJydcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICArICduZy1pbnB1dD1cXCdDT0xfRklFTERcXCcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgKyAnZGF0YS1wbGFjZWhvbGRlcj1cXCctLSBTZWxlY3QgT25lIC0tXFwnPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICsgJzwvc2VsZWN0PidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uY2VsbFRlbXBsYXRlID0gbXlDZWxUZW1wbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5lbmFibGVDZWxsRWRpdCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLm5hbWUgPSBcImlkX2xpc3RcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmVkaXREcm9wZG93blZhbHVlTGFiZWwgPSBcImlkX2xpc3RcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmVkaXRhYmxlQ2VsbFRlbXBsYXRlID0gXCJ1aS1ncmlkL2Ryb3Bkb3duRWRpdG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5lZGl0RHJvcGRvd25PcHRpb25zQXJyYXkgPSB2bS5hcnJsaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImVkaXRcIiB8fCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiZGVsZXRlXCIpIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZW5hYmxlRmlsdGVyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImRhdGVcIiApe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0udHlwZSA9ICdkYXRlJyxcclxuICAgICAgICAgICAgICAgIC8vICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmNlbGxGaWx0ZXIgPSAnZGF0ZTpcInl5eXktTU0tZGRcIidcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmcyk7XHJcblxyXG4gICAgICAgICAgICAvLyB2bS5ncmlkT3B0aW9ucy5tdWx0aVNlbGVjdCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICByZWZyZXNoX2dyaWQoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2bS5nZXRQcm9kdWN0TGlzdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5kYXRhID0gdm0ucmVzdWx0U2ltdWxhdGVkRGF0YTtcclxuICAgICAgICAgICAgdm0ubXlTZWxlY3RlZFJvd3MgPSB2bS5ncmlkQXBpLnNlbGVjdGlvbi5nZXRTZWxlY3RlZFJvd3MoKTsgLy88LS1Qcm9wZXJ0eSB1bmRlZmluZWQgZXJyb3IgaGVyZVxyXG5cclxuICAgICAgICAgICAgaWYgKHZtLm15U2VsZWN0ZWRSb3dzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWw7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHZtLm15U2VsZWN0ZWRSb3dzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBhbCA9IGFsICsn0JLRi9Cx0YDQsNC90L4gOiAnICsgKGkgKyAxKSArICcg0JjQlCA9ICcgKyB2bS5teVNlbGVjdGVkUm93c1tpXS5pZCArICcsINCb0LjRgdGCID0gJyArIHZtLm15U2VsZWN0ZWRSb3dzW2ldLmlkX2xpc3QgKyAnLlxcbidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFsZXJ0KGFsLnNsaWNlKDkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfQndC40YfQtdCz0L4g0L3QtSDQstGL0LHRgNCw0L3QvicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBpZiAodm0uZ3JpZEFwaS5zZWxlY3Rpb24uc2VsZWN0ZWRSb3cpIHtcclxuICAgICAgICAgICAgICAgICAgdm0uZ3JpZEFwaS5zZWxlY3Rpb24uc2VsZWN0Um93KHZtLmdyaWRPcHRpb25zLmRhdGFbMF0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbXlfYWxlcnQgKGlkLCBsLCB0eXBlPSdkZWYnKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZtLmFsbFVzZXJzKTtcclxuICAgICAgICAgICAgaWYodHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWx0YXNjayAobCwgaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy/QndCQ0JnQotCYINCd0J7QnNCV0KAg0L8u0L8uINCt0KLQniDQndCj0JbQndCeINCi0J7Qm9Cs0JrQniDQlNCb0K8g0JDQn9CU0JXQmdCi0JAg0JTQntCR0JDQktCb0JXQndCd0KvQpSDQl9CQ0JTQkNCnXHJcbiAgICAgICAgICAgICAgICBsZXQgbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHZtWydsaXN0XycgKyBsXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm1bJ2xpc3RfJyArIGxdW2ldLmlkID09IGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGVkaXR0YXNjayAobCwgaWQsIG4pO1xyXG4gICAgICAgICAgICB9OyAgIFxyXG4gICAgICAgIH07XHJcbiAgICAgIFxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JLQq9CS0J7QlNCQINCh0J7QlNCV0KDQltCY0JzQntCT0J4g0JvQmNCh0KLQntCSIFxyXG4gICAgICAgIGZ1bmN0aW9uIGxvZ01vZGVscyAoKSB7XHJcbiAgICAgICAgICAgIHZtLnNvcnRpbmdMb2cgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2bS5yYXdTY3JlZW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGxvZ0VudHJ5ID0gdm0ucmF3U2NyZWVuc1tpXS5tYXAoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4LnRpdGxlICsgJy0nICsgeC5pZF9saXN0ICsgJ3wnO1xyXG4gICAgICAgICAgICAgIH0pLmpvaW4oJywgJyk7XHJcbiAgICAgICAgICAgICAgbG9nRW50cnkgPSAnY29udGFpbmVyICcgKyAoaSsxKSArICc6ICcgKyBsb2dFbnRyeTtcclxuICAgICAgICAgICAgICB2bS5zb3J0aW5nTG9nLnB1c2gobG9nRW50cnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQo9CU0JDQm9CV0J3QmNCvINCX0JDQlNCQ0KfQmCDQmNCXINCb0JjQodCi0JAoIdCU0JvQryDQrdCi0J7QmSDQl9CQ0JTQkNCn0Jgg0J3Qo9CW0J3QniDQn9Ce0JTQmtCb0K7Qp9CY0KLQrCBMT0RBU0ggISEhKVxyXG4gICAgICAgIGZ1bmN0aW9uIGRlbHRhc2NrIChpLCBqKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIC8vIHZtWydsaXN0XycgKyBpXS5zcGxpY2UoaiwgMSk7XHJcbiAgICAgICAgICAgIHZtWydsaXN0XycgKyBpXS5zcGxpY2UoXy5pbmRleE9mKHZtWydsaXN0XycgKyBpXSwgXy5maW5kKHZtWydsaXN0XycgKyBpXSwgZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uaWQgPT09IGo7IH0pKSwgMSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih2bS51c2VyLmlkICE9IDEpIHtcclxuICAgICAgICAgICAgICAgIHZtLnJlc2pzb250YXNrcy5zcGxpY2UoXy5pbmRleE9mKHZtLnJlc2pzb250YXNrcywgXy5maW5kKHZtLnJlc2pzb250YXNrcywgZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uaWQgPT09IGo7IH0pKSwgMSk7XHJcbiAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5kYXRhID0gdm0ucmVzanNvbnRhc2tzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWRfdXNlciA9PSB2bS51c2VyLmlkKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2bS5yZXNqc29udGFza3Muc3BsaWNlKF8uaW5kZXhPZih2bS5yZXNqc29udGFza3MsIF8uZmluZCh2bS5yZXNqc29udGFza3MsIGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmlkID09PSBqOyB9KSksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVmcmVzaF9yYXdTY3JlZW5zKCl7XHJcbiAgICAgICAgICAgIHZtLnJhd1NjcmVlbnMgPSBbXTtcclxuICAgICAgICAgICAgY3JlYXRlU2hlZXRzKHZtLnJlc2dldEpzb25MaXN0cyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVmcmVzaF9ncmlkKCl7XHJcbiAgICAgICAgICAgIGlmKHZtLnVzZXIuaWQgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuZGF0YSA9IHZtLnJlc2pzb250YXNrcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkX3VzZXIgPT0gdm0udXNlci5pZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuZGF0YSA9IHZtLnJlc2pzb250YXNrc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHRhc2NrX2NvdW50ID0gMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIGFkZHRhc2NrIChpKTo8YnI+XHJcbiAgICAgICAgICogMS4g0KTQntCg0JzQmNCg0KPQldCiINCY0Jcg0KHQotCg0J7QmtCYINCe0JHQqtCV0JrQoi3Ql9CQ0JTQkNCn0KM8YnI+IFxyXG4gICAgICAgICAqIDIuINCU0J7QkdCQ0JLQm9Cv0JXQoiDQntCR0KrQldCa0KIg0JIgdm0ucmVzanNvbnRhc2tzIDxicj5cclxuICAgICAgICAgKiAzLiDQntCR0J3QntCS0JvQr9CV0KIgdm0ucmF3U2NyZWVuc1xyXG4gICAgICAgICAqIEBtZXRob2QgYWRkdGFzY2tcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGkg0J3QntCc0JXQoCDQm9CY0KHQotCQIERSQUcmRFJPUFxyXG4gICAgICAgICAqLyBcclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCU0J7QkdCQ0JLQm9CV0J3QmNCvINCX0JDQlNCQ0KfQmCBcclxuICAgICAgICBmdW5jdGlvbiBhZGR0YXNjayAoaSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodm1bJ2xpc3RfJyArIGldLmxlbmd0aCA8IHZtLnRhc2NrX2xpbWl0KXtcclxuICAgICAgICAgICAgICAgIHZhciBhZGRUYXNjayA9IHZtLnJlc2pzb250YXNrc1swXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL9Ch0J7Ql9CU0JDQldCcIFwi0KHQotCg0J7QmtCe0JLQq9CZINCe0JHQqtCV0JrQolwiLSBzdHIg0JTQm9CvINCU0JDQm9Cs0J3QldCZ0KjQldCT0J4gSlNPTi5wYXJzZShzdHIpXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyID0neyc7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgaW4gYWRkVGFzY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihrICE9IFwiaWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihrID09IFwidGl0bGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJ1wiJyArIGsgKyAnXCInICArICc6IFwiTmV3VGFzY2sgJyArIGkgKyB0YXNja19jb3VudCArICdcIiwnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoayA9PSBcImlkX2xpc3RcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJ1wiJyArIGsgKyAnXCInICArICc6ICcgKyAgTnVtYmVyKGkpICsgJywnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihrID09IFwiaWRfdXNlclwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnXCInICsgayArICdcIicgICsgJzogJyArICB2bS51c2VyLmlkICsgJywnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihrID09IFwiZGVzY3JpcHRpb25cIiB8fCBrID09IFwiZGF0ZVwiKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoayA9PSBcImRhdGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICdcIicgKyBrICsgJ1wiJyArICcgOiBcIjA4LjEyLjIwMTdcIicgKyAnLCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtzdHIgPSBzdHIgKyAnXCInICsgayArICdcIicgKyAnIDogXCIxXCInICsgJywnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoayAhPSBcIiQkaGFzaEtleVwiKSBzdHIgPSBzdHIgKyAnXCInICsgayArICdcIicgKyAnIDogMScgKyAnLCcgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICdcImlkXCIgOiAnICsgTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgKyAnLCcgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZSgwLC0xKVxyXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJ30nO1xyXG4gICAgICAgICAgICAgICAgLy8gdm0ucmF3U2NyZWVucy5wdXNoKEpTT04ucGFyc2Uoc3RyKSk7XHJcbiAgICAgICAgICAgICAgICAvLyB2bVsnbGlzdF8nICsgaV0ucHVzaChKU09OLnBhcnNlKHN0cikpO1xyXG4gICAgICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzLnB1c2goSlNPTi5wYXJzZShzdHIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoX3Jhd1NjcmVlbnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoX2dyaWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0YXNja19jb3VudCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0JsgZWRpdHRhc2NrIChpLCBqLCB0X2luZGV4KTo8YnI+XHJcbiAgICAgICAgICog0J7QotCa0KDQq9Ci0JjQlSDQl9CQ0JTQkNCn0Jgg0JTQm9CvINCf0J7QlNCg0J7QkdCd0J7Qk9CeINCf0KDQntCh0JzQntCi0KDQkCDQmCDQktCe0JfQnNCe0JbQndCe0JPQniDQoNCV0JTQkNCa0KLQmNCg0J7QktCQ0J3QmNCvXHJcbiAgICAgICAgICogQG1ldGhvZCBlZGl0dGFzY2tcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGkg0J3QntCc0JXQoCDQm9CY0KHQotCQIERSQUcmRFJPUFxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaiBpZCDQl9CQ0JTQkNCn0JhcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRfaW5kZXgg0J/QntCg0K/QlNCa0J7QktCr0Jkg0J3QntCc0JXQoCDQl9CQ0JTQkNCn0Jgg0JIgRFJBRyZEUk9QXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQn9Cg0J7QodCc0J7QotCg0JAg0JfQkNCU0JDQp9CYIFxyXG4gICAgICAgIGZ1bmN0aW9uIGVkaXR0YXNjayAoaSwgaiwgdF9pbmRleCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvL9Ck0JjQm9Cs0KLQoNCj0JXQnCDQn9CeINCb0JjQodCi0KMg0Jgg0JjQlCDQl9CQ0JTQkNCn0JhcclxuICAgICAgICAgICAgbGV0IGYgPSBfLmZpbmQodm1bJ2xpc3RfJyArIGldLCBmdW5jdGlvbiAoaXRlbSl7IHJldHVybiBpdGVtLmlkID09PSBqO30pO1xyXG5cclxuICAgICAgICAgICAgLy/QktCh0JUgXCLQmtCb0K7Qp9CYXCIg0KEg0JTQkNCd0J3Qq9Cc0Jgg0JfQkNCT0J7QndCv0JXQnCDQkiDQn9CV0KDQldCc0JXQndCd0KvQlSDQpNCe0KDQnNCrXHJcbiAgICAgICAgICAgIGZvcihsZXQgayBpbiBmKSB7XHJcbiAgICAgICAgICAgICAgICB2bVsnaHRtbF8nICsga10gPSBmW2tdO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2bVsnaHRtbF90X2luZGV4J10gPSB0X2luZGV4ICsgMTtcclxuXHJcbiAgICAgICAgICAgIC8v0J7QotCa0KDQq9CS0JDQldCc0Jwg0JTQmNCQ0JvQntCT0J7QktCe0JUg0J7QmtCd0J5cclxuICAgICAgICAgICAgJChcIiNvcGVuTW9kYWxcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZV9saXN0KCl7XHJcbiAgICAgICAgICAgIHZtLmNoYW5nZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0JsgZmluZF9pbmRleF9ieV9pZChzb3VyY2UsIGlkKSA6PGJyPlxyXG4gICAgICAgICAqINCf0J7QmNCh0Jog0JjQndCU0JXQmtCh0JAg0JfQkNCU0JDQp9CYINCSINCc0JDQodCh0JjQktCVINCf0JXQoNCV0JTQkNCd0J3QntCT0J4g0J7QkdCq0JXQmtCi0JAgLSBzb3VyY2Ug0J/QniDQn9CV0KDQldCU0JDQndCd0J7QnNCjIGlkXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBmaW5kX2luZGV4X2J5X2lkKHNvdXJjZSxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ZXMgPSAkLm1hcChzb3VyY2UsIGZ1bmN0aW9uKG9iaiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9iai5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ZXNbMF07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAqIEBtZXRob2QgZmluZF9pbmRleF9ieV9pZFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2Ug0JzQkNCh0KHQmNCSINCe0JHQqtCV0JrQotCe0JJcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IGlkINCX0JDQlNCQ0KfQmFxyXG4gICAgICAgICAqIEByZXR1cm4ge0ludGVnZXJ9INCd0JDQmdCU0JXQndCd0KvQmSDQmNCd0JTQldCa0KFcclxuICAgICAgICAgKi8gXHJcbiAgICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0J/QntCY0KHQmtCQINCf0J4g0JjQlFxyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRfaW5kZXhfYnlfaWQoc291cmNlLGlkKXtcclxuICAgICAgICAgICAgbGV0IGluZGV4ZXMgPSAkLm1hcChzb3VyY2UsIGZ1bmN0aW9uKG9iaiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihvYmouaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICByZXR1cm4gaW5kZXhlc1swXTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQG1ldGhvZCBzYXZldGFzY2tcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0Jsgc2F2ZXRhc2NrKCkgOjxicj5cclxuICAgICAgICAgKiAxLiDQn9Ce0JjQodCaINCY0J3QlNCV0JrQodCQINCX0JDQlNCQ0KfQmCDQkiDQnNCQ0KHQodCY0JLQlSB2bS5yZXNqc29udGFza3M8YnI+IFxyXG4gICAgICAgICAqIDIuINCe0JHQndCe0JLQm9CV0J3QmNCVINCf0J7Qm9CV0Jkg0JIg0JfQkNCU0JDQp9CVICjQmNCXINCc0JDQodCh0JjQktCQIHZtLnJlc2pzb250YXNrcyk8YnI+XHJcbiAgICAgICAgICogMy4g0JXQodCb0Jgg0JHQq9CbINCY0JfQnNCV0J3QldCdINCh0KLQkNCi0KPQoSDQl9CQ0JTQkNCn0JggLSDQntCR0J3QntCS0JvQldCd0JjQlSDQnNCQ0KHQodCY0JLQkCB2bS5yYXdTY3JlZW5zPGJyPlxyXG4gICAgICAgICAqLyBcclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCh0J7QpdCg0JDQndCV0J3QmNCvINCX0JDQlNCQ0KfQmFxyXG4gICAgICAgIGZ1bmN0aW9uIHNhdmV0YXNjayAoaSwgaiwgdF9pbmRleCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZihjb25maXJtKFwi0KHQvtGF0YDQsNC90LjRgtGMP1wiKSA9PSB0cnVlKXtcclxuXHJcbiAgICAgICAgICAgICAgICAvL9Cd0JDQpdCe0JTQmNCcINCf0J4gaWQgKGopINCY0J3QlNCV0JrQoSDQl9CQ0JTQkNCn0Jgg0JIg0JzQkNCh0KHQmNCS0JUgdm0ucmVzanNvbnRhc2tzXHJcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RJbmRleCA9IGZpbmRfaW5kZXhfYnlfaWQodm0ucmVzanNvbnRhc2tzLCBqKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgaW4gdm0ucmVzanNvbnRhc2tzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoayAhPSBcIiQkaGFzaEtleVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGsgPT0gXCJkYXRlXCIgfHwgayA9PSBcInRpdGxlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGsgPT0gXCJkYXRlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5yZXNqc29udGFza3NbZmlyc3RJbmRleF1bXCJkYXRlXCJdID0gICQoJyNkdHBja3InKVswXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnJlc2pzb250YXNrc1tmaXJzdEluZGV4XVtcInRpdGxlXCJdID0gJCgnI3R0bCcpWzBdLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCQoJyN0dGwnKVswXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnJlc2pzb250YXNrc1tmaXJzdEluZGV4XVtrXSA9IHZtWydodG1sXycgKyBrXTsgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qPyDQodCf0JXQptCY0JDQm9Cs0J3QniDQlNCb0K8g0J7QkdCd0J7QktCb0JXQndCY0K8gISEhINCi0J7Qm9Cs0JrQniDQlNCe0JHQkNCS0JvQldCd0J3Qq9ClINCX0JDQlNCQ0Kcg0JIgZHJhZyZkcm9wICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZtWydsaXN0XycgKyBpXVt0X2luZGV4IC0gMV1ba10gPSB2bVsnaHRtbF8nICsga107XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodm0uY2hhbmdlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZtLmNoYW5nZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaF9yYXdTY3JlZW5zKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hfZ3JpZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2bS5jaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2bS5jaGFuZ2UpOyAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codm0ucmVzanNvbnRhc2tzKTtcclxuICAgICAgICAgICAgJChcIi5tb2RhbERpYWxvZ1wiKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQktCr0KXQntCU0JAg0JjQlyBtb2RhbERpYWxvZyDQkdCV0Jcg0KHQntCl0KDQkNCd0JXQndCY0K8g0JTQkNCd0J3Qq9Cl0KVcclxuICAgICAgICBmdW5jdGlvbiBleGl0X21vZGFsKCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKFwiLm1vZGFsRGlhbG9nXCIpLmZhZGVUb2dnbGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBkZWZfY2xpY2soKXtldmVudC5wcmV2ZW50RGVmYXVsdCgpO307XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0KHQmtCg0KvQotCY0K8g0JjQndCU0JjQmtCQ0KLQntCg0JAg0J7QltCY0JTQkNCd0JjQr1xyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmlzaF9sb2FkZXIoKXtcclxuICAgICAgICAgICAgaWYgKCQoXCIjbG9hZGVyXCIpLmlzKFwiOnZpc2libGVcIikpe1xyXG4gICAgICAgICAgICAgICAgJChcIiNsb2FkZXJcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQktCY0JfQo9CQ0JvQmNCX0JDQptCY0Jgg0JjQndCU0JjQmtCQ0KLQntCg0JAg0J7QltCY0JTQkNCd0JjQr1xyXG4gICAgICAgIGZ1bmN0aW9uIHN0YXJ0X2xvYWRlcigpe1xyXG4gICAgICAgICAgICBpZiAoISQoXCIjbG9hZGVyXCIpLmlzKFwiOnZpc2libGVcIikpe1xyXG4gICAgICAgICAgICAgICAgJChcIiNsb2FkZXJcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JfQkNCT0KDQo9CX0JrQmCDQotCV0JrQo9Cp0JXQk9CeINCu0JfQldCg0JAgXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZEN1cnJlbnRVc2VyKCkge1xyXG4gICAgICAgICAgICBVc2VyU2VydmljZS5HZXRCeVVzZXJuYW1lKCRyb290U2NvcGUuZ2xvYmFscy5jdXJyZW50VXNlci51c2VybmFtZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCX0JDQk9Cg0KPQl9Ca0Jgg0JLQodCV0KUg0K7Ql9CV0KDQntCSIFxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRBbGxVc2VycygpIHtcclxuICAgICAgICAgICAgVXNlclNlcnZpY2UuR2V0QWxsKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmFsbFVzZXJzID0gdXNlcnM7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCj0JTQkNCb0JXQndCY0K8g0K7Ql9CV0KDQkCBcclxuICAgICAgICBmdW5jdGlvbiBkZWxldGVVc2VyKGlkKSB7XHJcbiAgICAgICAgICAgIFVzZXJTZXJ2aWNlLkRlbGV0ZShpZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkQWxsVXNlcnMoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvYXNzZXRzL2hvbWUvaG9tZS5jb250cm9sbGVyLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUtBO0FBQ0E7QUF6QkE7QUFDQTtBQTJCQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7OzsiLCJzb3VyY2VSb290IjoiIn0=