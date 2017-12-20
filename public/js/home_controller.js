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
	            console.log(vm.gridOptions.columnDefs);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZV9jb250cm9sbGVyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDY2MTFiNGRmNzk4MWZjZWY2NWQ5P2VkZWYqKiIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvYXNzZXRzL2hvbWUvaG9tZS5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NjExYjRkZjc5ODFmY2VmNjVkOSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgSG9tZUNvbnRyb2xsZXIpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqINCf0KDQldCU0J7QodCi0JDQktCb0JXQndCY0JUg0JTQkNCd0J3Qq9ClINCSINCS0JjQlNCVIERSQUcmRFJPUCDQmCBuZy1HUklEXHJcbiAgICAgICAgICAgIEhvbWVDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJywgJ0pzb25TZXJ2aWNlJywgJyRyb290U2NvcGUnXTtcclxuICAgICAgICAgICAgLi4uLi4uLi5cclxuICAgICAgICAqIEBjbGFzcyBIb21lQ29udHJvbGxlclxyXG4gICAgICAgICogQG1vZHVsZSBhcHBcclxuICAgICAgICAqIEBtYWluIEhvbWVDb250cm9sbGVyXHJcbiAgICAgICAgKi9cclxuXHJcbiAgICBIb21lQ29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsICdKc29uU2VydmljZScsICd1aUdyaWRDb25zdGFudHMnLCckcm9vdFNjb3BlJywgJyR0aW1lb3V0J107XHJcblxyXG4gICAgZnVuY3Rpb24gSG9tZUNvbnRyb2xsZXIoVXNlclNlcnZpY2UsIEpzb25TZXJ2aWNlLCB1aUdyaWRDb25zdGFudHMsICRyb290U2NvcGUsICR0aW1lb3V0KSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PdCS0KHQlSDQp9Ci0J4g0J3Qo9CW0J3QniDQlNCb0K8gSFRNTD09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogPHA+0JLQodCVINCn0KLQniBcItCf0KDQldCU0JDQldCi0KHQr1wiXCIg0JIgSFRNTDwvcD5cclxuICAgICAgICAgICAgdm0udGFzY2tfbGltaXQgPSAxNTsgLy/QntCT0KDQkNCd0JjQp9CY0KLQldCb0Kwg0JfQkNCU0JDQpyDQkiDQm9CY0KHQotCVXHJcbiAgICAgICAgICAgIHZtLm5nR3JpZFZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICB2bS51c2VyID0gbnVsbDtcclxuICAgICAgICAgICAgdm0uYWxsVXNlcnMgPSBbXTtcclxuICAgICAgICAgICAgdm0uZGVsZXRlVXNlciA9IGRlbGV0ZVVzZXI7XHJcbiAgICAgICAgICAgIHZtLmV4aXRfbW9kYWwgPSBleGl0X21vZGFsO1xyXG4gICAgICAgICAgICB2bS5zYXZldGFzY2sgPSBzYXZldGFzY2s7XHJcbiAgICAgICAgICAgIHZtLmVkaXR0YXNjayA9IGVkaXR0YXNjaztcclxuICAgICAgICAgICAgdm0uZGVsdGFzY2sgPSBkZWx0YXNjaztcclxuICAgICAgICAgICAgdm0uYWRkdGFzY2sgPSBhZGR0YXNjaztcclxuICAgICAgICAgICAgdm0uZGVmX2NsaWNrID0gZGVmX2NsaWNrO1xyXG4gICAgICAgICAgICB2bS5maW5pc2hfbG9hZGVyID0gZmluaXNoX2xvYWRlcjtcclxuICAgICAgICAgICAgdm0uc3RhcnRfbG9hZGVyID0gc3RhcnRfbG9hZGVyO1xyXG4gICAgICAgICAgICB2bS5sb2dNb2RlbHMgPSBsb2dNb2RlbHM7XHJcbiAgICAgICAgICAgIHZtLm15X2FsZXJ0ID0gbXlfYWxlcnQ7XHJcbiAgICAgICAgICAgIHZtLmNoYW5nZV9saXN0ID0gY2hhbmdlX2xpc3Q7XHJcbiAgICAgICAgICAgIHZtLmNoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2bS5yYXdTY3JlZW5zID0gW107XHJcbiAgICAgICAgICAgIHZtLnNvcnRpbmdMb2cgPSBbXTtcclxuICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzID0gW107XHJcbiAgICAgICAgICAgIHZtLnJlc2dldEpzb25MaXN0cyA9IFtdO1xyXG4gICAgICAgICAgICB2bS5zb3J0YWJsZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJhcHBcIixcclxuICAgICAgICAgICAgICAgIGNvbm5lY3RXaXRoOiBcIi5hcHBzLWNvbnRhaW5lclwiLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKC8vIGVuc3VyZSB3ZSBhcmUgaW4gdGhlIGZpcnN0IHVwZGF0ZSgpIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAhdWkuaXRlbS5zb3J0YWJsZS5yZWNlaXZlZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdGhhdCBpdHMgYW4gYWN0dWFsIG1vdmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gYmV0d2VlbiB0aGUgdHdvIGxpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLnNvcnRhYmxlLnNvdXJjZVswXSAhPT0gdWkuaXRlbS5zb3J0YWJsZS5kcm9wdGFyZ2V0WzBdICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGUgc2l6ZSBsaW1pdGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLnNvcnRhYmxlLmRyb3B0YXJnZXRNb2RlbC5sZW5ndGggPj0gdm0udGFzY2tfbGltaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLnNvcnRhYmxlLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vISEhINCe0JHQndCe0JLQm9Cv0JXQnCBpZF9saXN0INCjINCf0JXQoNCV0JzQldCp0JXQndCd0J7QmSDQl9CQ0JTQkNCn0JggISEhXHJcbiAgICAgICAgICAgICAgICAgIC8vIHZhciBzdHIgPSBOdW1iZXIodWkuaXRlbS5zb3J0YWJsZS5kcm9wdGFyZ2V0TGlzdFswXS5hdHRyaWJ1dGVzLmlkLnZhbHVlLnNsaWNlKDcsMTApKTtcclxuICAgICAgICAgICAgICAgICAgLy8gdWkuaXRlbS5zb3J0YWJsZS5tb2RlbC5pZF9saXN0ID0gc3RyICsgMVxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2bS5yYXdTY3JlZW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVuc1tpXS5tYXAoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHguaWRfbGlzdCA9IGkgKyAxOyBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICQoJyNkdHBja3InKS5kYXRlcGlja2VyKCk7XHJcbiAgICAgICAgICogQHByb3BlcnR5INCU0JDQndCd0KvQlSDQlNCb0K8gSFRNTFxyXG4gICAgICAgICAqIEB0eXBlIE9iamVjdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAZmluYWxcclxuICAgICAgICAgKi9cclxuICAgICAgICB2bS50YXNja19saW1pdCA9IDE1OyAvL9Ce0JPQoNCQ0J3QmNCn0JjQotCV0JvQrCDQl9CQ0JTQkNCnINCSINCb0JjQodCi0JVcclxuICAgICAgICB2bS5uZ0dyaWRWaWV3ID0gbnVsbDtcclxuXHJcbiAgICAgICAgdm0udXNlciA9IG51bGw7XHJcbiAgICAgICAgdm0uYWxsVXNlcnMgPSBbXTtcclxuICAgICAgICB2bS5kZWxldGVVc2VyID0gZGVsZXRlVXNlcjtcclxuXHJcbiAgICAgICAgdm0uZXhpdF9tb2RhbCA9IGV4aXRfbW9kYWw7XHJcbiAgICAgICAgdm0uc2F2ZXRhc2NrID0gc2F2ZXRhc2NrO1xyXG4gICAgICAgIHZtLmVkaXR0YXNjayA9IGVkaXR0YXNjaztcclxuICAgICAgICB2bS5kZWx0YXNjayA9IGRlbHRhc2NrO1xyXG4gICAgICAgIHZtLmFkZHRhc2NrID0gYWRkdGFzY2s7XHJcbiAgICAgICAgdm0uZGVmX2NsaWNrID0gZGVmX2NsaWNrO1xyXG4gICAgICAgIHZtLmZpbmlzaF9sb2FkZXIgPSBmaW5pc2hfbG9hZGVyO1xyXG4gICAgICAgIHZtLnN0YXJ0X2xvYWRlciA9IHN0YXJ0X2xvYWRlcjtcclxuICAgICAgICB2bS5sb2dNb2RlbHMgPSBsb2dNb2RlbHM7XHJcbiAgICAgICAgdm0ubXlfYWxlcnQgPSBteV9hbGVydDtcclxuICAgICAgICB2bS5jaGFuZ2VfbGlzdCA9IGNoYW5nZV9saXN0O1xyXG4gICAgICAgIHZtLmNoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgIHZtLmNsaWNrSGFuZGxlciA9IHtcclxuICAgICAgICAgICAgIG9uQ2xpY2sgOiBmdW5jdGlvbih2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnTmFtZTogJyt2YWx1ZSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLnJhd1NjcmVlbnMgPSBbXTtcclxuICAgICAgICB2bS5zb3J0aW5nTG9nID0gW107XHJcblxyXG4gICAgICAgIHZtLnJlc2pzb250YXNrcyA9IFtdO1xyXG4gICAgICAgIHZtLnJlc2dldEpzb25MaXN0cyA9IFtdO1xyXG5cclxuICAgICAgICB2bS5zb3J0YWJsZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBjb25uZWN0V2l0aDogXCIuYXBwcy1jb250YWluZXJcIixcclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICBpZiAoLy8gZW5zdXJlIHdlIGFyZSBpbiB0aGUgZmlyc3QgdXBkYXRlKCkgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgIXVpLml0ZW0uc29ydGFibGUucmVjZWl2ZWQgJiZcclxuICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdGhhdCBpdHMgYW4gYWN0dWFsIG1vdmluZ1xyXG4gICAgICAgICAgICAgICAgICAvLyBiZXR3ZWVuIHRoZSB0d28gbGlzdHNcclxuICAgICAgICAgICAgICAgICAgdWkuaXRlbS5zb3J0YWJsZS5zb3VyY2VbMF0gIT09IHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldFswXSAmJlxyXG4gICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGUgc2l6ZSBsaW1pdGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgIHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldE1vZGVsLmxlbmd0aCA+PSB2bS50YXNja19saW1pdCkge1xyXG4gICAgICAgICAgICAgICAgdWkuaXRlbS5zb3J0YWJsZS5jYW5jZWwoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgIC8vISEhINCe0JHQndCe0JLQm9Cv0JXQnCBpZF9saXN0INCjINCf0JXQoNCV0JzQldCp0JXQndCd0J7QmSDQl9CQ0JTQkNCn0JggISEhXHJcbiAgICAgICAgICAgICAgLy8gdmFyIHN0ciA9IE51bWJlcih1aS5pdGVtLnNvcnRhYmxlLmRyb3B0YXJnZXRMaXN0WzBdLmF0dHJpYnV0ZXMuaWQudmFsdWUuc2xpY2UoNywxMCkpO1xyXG4gICAgICAgICAgICAgIC8vIHVpLml0ZW0uc29ydGFibGUubW9kZWwuaWRfbGlzdCA9IHN0ciArIDFcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZtLnJhd1NjcmVlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZtLnJhd1NjcmVlbnNbaV0ubWFwKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeC5pZF9saXN0ID0gaSArIDE7IFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9OyBcclxuXHJcbiAgICAgICAgdm0uc3RhdHVzID0gW1xyXG4gICAgICAgICAgICB7aWQ6IDEsIG5hbWU6J9Ce0LbQuNC00LDQtdGCJ30sXHJcbiAgICAgICAgICAgIHtpZDogMiwgbmFtZTon0JIg0YDQsNCx0L7RgtC1J30sXHJcbiAgICAgICAgICAgIHtpZDogMywgbmFtZTon0JLRi9C/0L7Qu9C90LXQvdC+J30sXHJcbiAgICAgICAgXTtcclxuXHJcblxyXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3QmNCd0JjQptCY0JDQptCY0K89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG4gICAgICAgICQoJyNkdHBja3InKS5kYXRlcGlja2VyKCk7XHJcblxyXG4gICAgICAgIHZhciBncmlkbmFtZUpzb25MaXN0cyA9IFtdO1xyXG4gICAgICAgIGxldCBjdXJVc2VyID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v0JjQndCY0KbQmNCY0KDQo9CV0Jwg0JrQntCd0KLQoNCe0JvQm9CV0KBcclxuICAgICAgICBpbml0Q29udHJvbGxlcigpO1xyXG5cclxuICAgICAgICAvL9CQ0JPQoNCV0JPQkNCi0J3QkNCvINCk0KPQndCa0KbQmNCvINCY0J3QmNCm0JjQmCDQmtCe0J3QotCg0J7Qm9Cb0JXQoNCQINCh0J7QodCi0J7QmNCiINCY0Jcg0J3QldCh0JrQntCb0KzQmtCY0KUgXCLQktCr0JfQq9CS0JDQrtCp0JjQpVwiXCIg0KTQo9Cd0JrQptCY0JlcclxuICAgICAgICBmdW5jdGlvbiBpbml0Q29udHJvbGxlcigpIHtcclxuXHJcbiAgICAgICAgICAgIC8v0JfQkNCT0KDQo9CW0JDQldCcINCi0JXQmtCj0KnQldCT0J4g0K7Ql9CV0KDQkCDQpNCQ0JHQoNCY0JrQkCBVc2VyU2VydmljZVxyXG4gICAgICAgICAgICAvLyBsb2FkQ3VycmVudFVzZXIoKTsgLy9mcm9udGVuZC9hc3NldHMvYXBwLXNlcnZpY2VzL3VzZXIuc2VydmljZS5qc1xyXG5cclxuICAgICAgICAgICAgLy/Ql9CQ0JPQoNCj0JbQkNCV0Jwg0JLQodCV0KUg0K7Ql9CV0KDQntCSINCk0JDQkdCg0JjQmtCQIFVzZXJTZXJ2aWNlXHJcbiAgICAgICAgICAgIGxvYWRBbGxVc2VycygpOyAvL2Zyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvdXNlci5zZXJ2aWNlLmpzICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8g0JjQnNCf0J7QoNCi0JjQoNCj0JXQnCDQodCf0JjQodCe0Jog0JvQmNCh0KLQntCSINCk0JDQkdCg0JjQmtCQIFVzZXJTZXJ2aWNlXHJcbiAgICAgICAgICAgIGdldEpzb25MaXN0cygpOyAvL2Zyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvanNvbl9zZXJ2aWNlLmpzXHJcblxyXG4gICAgICAgICAgICAvL9CY0JzQn9Ce0KDQotCY0KDQo9CV0Jwg0KHQn9CY0KHQntCaINCX0JDQlNCQ0Kcg0KTQkNCR0KDQmNCa0JAgVXNlclNlcnZpY2UgXHJcbiAgICAgICAgICAgIGdldEpzb25UYXNrcygpOyAvL2Zyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvanNvbl9zZXJ2aWNlLmpzXHJcblxyXG4gICAgICAgICAgICAvLyDQmNCc0J/QntCg0KLQmNCg0KPQldCcINCh0J/QmNCh0J7QmiDQmNCc0JXQnSDQodCi0J7Qm9CR0KbQntCSINCT0KDQmNCU0JBcclxuICAgICAgICAgICAgZ2V0SnNvbkdyaWRuYW1lKCk7XHJcblxyXG4gICAgICAgICAgICAvL9Ch0J7Ql9CU0JDQldCcINCh0J7QlNCV0KDQltCY0JzQntCVINCU0JvQryDQlNCg0JDQk9C90JTQoNCe0J8g0JvQmNCh0KLQntCSXHJcbiAgICAgICAgICAgIGNyZWF0ZVNoZWV0cyh2bS5yZXNnZXRKc29uTGlzdHMpO1xyXG4gICAgICAgIH07IFxyXG5cclxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT3QntCf0JXQoNCQ0KLQmNCS0J3Qq9CVINCk0KPQndCa0KbQmNCYPT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCY0JzQn9Ce0KDQotCQINCh0J/QmNCh0JrQkCDQmNCc0JXQnSDQn9Ce0JvQldCZINCT0KDQmNCU0JBcclxuICAgICAgICBmdW5jdGlvbiBnZXRKc29uR3JpZG5hbWUoKXtcclxuICAgICAgICAgICAgZ3JpZG5hbWVKc29uTGlzdHMgPSBKc29uU2VydmljZS5nZXRSZXN1bHRGcm9tSnNvbignZGIvZ3JpZG5hbWUuanNvbicpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQmNCc0J/QntCg0KLQkCDQodCf0JjQodCa0JAg0JvQmNCh0KLQntCSXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SnNvbkxpc3RzKCl7XHJcbiAgICAgICAgICAgIHZtLnJlc2dldEpzb25MaXN0cyA9IEpzb25TZXJ2aWNlLmdldFJlc3VsdEZyb21Kc29uKCdkYi9saXN0c05hbWUuanNvbicpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQmNCc0J/QntCg0KLQkCDQodCf0JjQodCa0JAg0JfQkNCU0JDQp1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEpzb25UYXNrcygpe1xyXG4gICAgICAgICAgICB2bS5yZXNqc29udGFza3MgPSBKc29uU2VydmljZS5nZXRSZXN1bHRGcm9tSnNvbignZGIvdGFza3MuanNvbicpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIG1ha2VMaXN0IChpZF9saXN0KTo8YnI+XHJcbiAgICAgICAgICog0JLQntCX0JLQoNCQ0KnQkNCV0KIg0J7QotCk0JjQm9Cs0KLQoNCe0JLQkNCd0J3Qq9CZINCf0J4g0J/QntCb0K4gLSBpZF9saXN0INCc0JDQodCh0JjQkiDQl9CQ0JTQkNCnPGJyPlxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWFrZUxpc3QgKGlkX2xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyX3Jlc2pzb250YXNrcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcl9yZXNqc29udGFza3MgPSB2bS5yZXNqc29udGFza3MuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZF9saXN0ID09IGlkX2xpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJfcmVzanNvbnRhc2tzO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgKiBAbWV0aG9kIG1ha2VMaXN0XHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpZF9saXN0IElEINCb0JjQodCi0JBcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGZpbHRlcl9yZXNqc29udGFza3NcclxuICAgICAgICAgKi8gXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQndCQ0J/QntCb0J3QldCd0JjQryDQmtCQ0JbQlNCe0JPQniDQm9CY0KHQotCQINCX0JDQlNCQ0KfQkNCc0JggKNCf0J4gaWRfbGlzdCkg0JLQq9CX0KvQktCQ0JXQotCh0K8g0JjQlyAgY3JlYXRlU2hlZXRzKClcclxuICAgICAgICBmdW5jdGlvbiBtYWtlTGlzdCAoaWRfbGlzdCkge1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyX3Jlc2pzb250YXNrcyA9IFtdO1xyXG4gICAgICAgICAgICBpZih2bS51c2VyLmlkICE9IDEpIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlcl9yZXNqc29udGFza3MgPSB2bS5yZXNqc29udGFza3MuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZF9saXN0ID09IGlkX2xpc3QgJiYgaXRlbS5pZF91c2VyID09IHZtLnVzZXIuaWQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZpbHRlcl9yZXNqc29udGFza3MgPSB2bS5yZXNqc29udGFza3MuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZF9saXN0ID09IGlkX2xpc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJfcmVzanNvbnRhc2tzO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDQpNCj0J3QmtCm0JjQntCd0JDQmyBjcmVhdGVTaGVldHMgKHJlc2dldEpzb25MaXN0cyk6PGJyPlxyXG4gICAgICAgICAqINCm0JjQmtCb0J7QnCDQodCe0JfQlNCQ0K7QotCh0K8g0JvQmNCh0KLQqy4g0JvQmNCh0KLQkNCcINCf0KDQmNCh0JLQkNCY0JLQkNCV0KLQodCvINCY0JzQryDQmCBJRDxicj4g0KHQntCX0JTQkNCd0J3Qq9CVINCb0JjQodCi0Ksg0JTQntCR0JDQktCb0K/QrtCi0KHQryDQkiDQnNCQ0KHQodCY0JIgdm0ucmF3U2NyZWVuc1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlU2hlZXRzKHJlc2dldEpzb25MaXN0cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCByZXNnZXRKc29uTGlzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSA9IG1ha2VMaXN0KHJlc2dldEpzb25MaXN0c1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdLm5hbWUgPSByZXNnZXRKc29uTGlzdHNbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVucy5wdXNoKHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVNoZWV0c1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXNnZXRKc29uTGlzdHMg0JzQkNCh0KHQmNCSINCY0JzQldCdINCb0JjQodCi0J7QklxyXG4gICAgICAgICAqLyBcclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCh0J7Ql9CU0JDQndCY0K8g0JvQmNCh0KLQntCSXHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU2hlZXRzKHJlc2dldEpzb25MaXN0cyl7XHJcbiAgICAgICAgICAgIGlmKCFjdXJVc2VyKXtcclxuICAgICAgICAgICAgICAgIFVzZXJTZXJ2aWNlLkdldEJ5VXNlcm5hbWUoJHJvb3RTY29wZS5nbG9iYWxzLmN1cnJlbnRVc2VyLnVzZXJuYW1lKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXNlcicsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgcmVzZ2V0SnNvbkxpc3RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0gPSBtYWtlTGlzdChyZXNnZXRKc29uTGlzdHNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXS5uYW1lID0gcmVzZ2V0SnNvbkxpc3RzW2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnJhd1NjcmVlbnMucHVzaCh2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJVc2VyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL9Ch0J7Ql9CU0JDQgdCcINCT0KDQmNCUXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdEdyaWQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgcmVzZ2V0SnNvbkxpc3RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSA9IG1ha2VMaXN0KHJlc2dldEpzb25MaXN0c1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0ubmFtZSA9IHJlc2dldEpzb25MaXN0c1tpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnJhd1NjcmVlbnMucHVzaCh2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIGluaXRHcmlkICgpOjxicj5cclxuICAgICAgICAgKiAxLiB2bS5uZ0dyaWRWaWV3IC0g0J7QotCe0JHQoNCQ0JbQkNCV0KIg0JPQoNCY0JQg0JIgSFRNTDxicj5cclxuICAgICAgICAgKiAyLiB2bS5zdGF0dXMgLSDQnNCQ0KHQodCY0JIg0KHQotCQ0KLQo9Ch0J7QkiDQl9CQ0JTQkNCn0JggKG15Q2VsVGVtcDEgLSBTRUxFQ1Qg0JjQlyB2bS5zdGF0dXMpPGJyPlxyXG4gICAgICAgICAqIDMuIHZtLmRyYWduZHJvcF9saXN0IC0g0JzQkNCh0KHQmNCSINCb0JjQodCi0J7QkiAobXlDZWxUZW1wMiAtIFNFTEVDVCDQmNCXIHZtLmRyYWduZHJvcF9saXN0KSA8YnI+XHJcbiAgICAgICAgICogNC4g0JLQq9CS0J7QlCDQn9Ce0JvQldCZINCSIEdSSUQg0J/QniDQn9Ce0KDQr9CU0JrQoyDQodCe0KDQotCY0KDQntCS0JrQmCDQn9Ce0JvQryBzb3J0INCc0JDQodCh0JjQktCQIHJpZG5hbWVKc29uTGlzdHM8YnI+XHJcbiAgICAgICAgICogNS4g0JTQm9CvINCe0KLQntCR0KDQkNCW0JXQndCY0K8g0JIg0KLQkNCR0JvQmNCm0JUg0KHQntCX0JTQkNCV0JwgXCLQodCi0KDQntCa0J7QktCr0Jkg0J7QkdCq0JXQmtCiXCItIHN0ciDQmCDQn9Cj0KjQmNCcINCV0JPQniDQkiBjb2x1bW5EZWZzXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IHR0Lmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKHR0W2pdLmlkICE9IFwiJCRoYXNoS2V5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0dFtqXS5pZCA9PSBcImV4ZWN1dGlvbl9zdGF0dXNcIiB8fCB0dFtqXS5pZCA9PSBcImlkX2xpc3RcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR0W2pdLmlkID09IFwiZXhlY3V0aW9uX3N0YXR1c1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUNlbFRlbXAgPSBteUNlbFRlbXAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15Q2VsVGVtcCA9IG15Q2VsVGVtcDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9ICd7XCJmaWVsZFwiIDogXCInICsgdHRbal0uaWQgKyAnXCInICsgJywnICsgJ1wiY2VsbFRlbXBsYXRlXCIgOiBcIicgKyBteUNlbFRlbXAgKyAnXCJ9JyAvLycgKyAnXCJlbmFibGVGaWx0ZXJpbmdcIiA6ICcgKyBmYWxzZSArIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5uZ0dyaWRWaWV3LmNvbHVtbkRlZnMucHVzaChKU09OLnBhcnNlKHN0cikpOyBcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gJ3tcImZpZWxkXCIgOiBcIicgKyB0dFtqXS5pZCArICdcIicgKyAnLCcgKyAnXCJkaXNwbGF5TmFtZVwiIDogXCInICsgZ3JpZG5hbWVKc29uTGlzdHNbal0uaWQgKyAnXCJ9JyAvLycgKyAnXCJlbmFibGVGaWx0ZXJpbmdcIiA6ICcgKyBmYWxzZSArIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5uZ0dyaWRWaWV3LmNvbHVtbkRlZnMucHVzaChKU09OLnBhcnNlKHN0cikpOyBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICogNi4g0KHQmtCg0KvQktCQ0JXQnCDQn9Ce0JvQlSDQldCh0JvQmCDQntCd0J4g0J/QoNCY0KHQo9Ci0KHQotCS0KPQldCiINCSINCc0JDQodCh0JjQktCVIG5vdFZpc2libGUg0JTQm9CvINCe0KHQotCQ0JvQrNCd0KvQpSAtINCf0JXQoNCV0JjQnNCV0J3QntCS0KvQktCQ0JXQnCDQn9Ce0JvQryDQk9Cg0JjQlNCQXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IG5vdFZpc2libGUubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB2bS5uZ0dyaWRWaWV3LmNvbHVtbkRlZnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtLm5nR3JpZFZpZXcuY29sdW1uRGVmc1tpXS5maWVsZCA9PSBub3RWaXNpYmxlW2pdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0ubmdHcmlkVmlldy5jb2x1bW5EZWZzW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/QndCQ0KXQntCU0JjQnCDQn9CeIGlkIChqKSDQmNCd0JTQldCa0KEg0JfQkNCU0JDQp9CYINCSINCc0JDQodCh0JjQktCVIHZtLnJlc2pzb250YXNrc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RJbmRleCA9IGZpbmRfaW5kZXhfYnlfaWQoZ3JpZG5hbWVKc29uTGlzdHMsIHZtLm5nR3JpZFZpZXcuY29sdW1uRGVmc1tpXS5maWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLm5nR3JpZFZpZXcuY29sdW1uRGVmc1tpXS5kaXNwbGF5TmFtZSA9IGdyaWRuYW1lSnNvbkxpc3RzW2ZpcnN0SW5kZXhdLmdyaWRuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5uZ0dyaWRWaWV3LmNvbHVtbkRlZnNbaV0ud2lkdGggPSBncmlkbmFtZUpzb25MaXN0c1tmaXJzdEluZGV4XS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICogNy4g0JTQntCR0JDQktCb0K/QldCcINCa0J3QntCf0JrQmCDQoNCV0JTQkNCa0KLQmNCg0J7QktCQ0J3QmNCvINCYINCj0JTQkNCb0JXQndCY0K9cclxuICAgICAgICAgKiBAbWV0aG9kIGluaXRHcmlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQodCe0JfQlNCQ0J3QmNCvINCT0KDQmNCU0JBcclxuICAgICAgICBmdW5jdGlvbiBpbml0R3JpZCgpIHtcclxuICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVDZWxsRWRpdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZUNvbHVtblJlc2l6aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlUm93U2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZVNlbGVjdEFsbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZUZpbHRlcmluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dHcmlkRm9vdGVyOnRydWUsXHJcbiAgICAgICAgICAgICAgICBvblJlZ2lzdGVyQXBpOiBmdW5jdGlvbihncmlkQXBpKXtcclxuICAgICAgICAgICAgICAgICAgdm0uZ3JpZEFwaSA9IGdyaWRBcGk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uRGVmczogW11cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdHI7XHJcblxyXG4gICAgICAgICAgICAvKiDQodCe0KDQotCY0KDQo9CV0JwgZ3JpZG5hbWVKc29uTGlzdHMg0JTQm9CvINCe0KLQntCR0KDQkNCW0JXQndCY0K8g0KHQotCe0JvQkdCm0J7QkiDQl9CQ0JTQkNCnINCSINCh0J7QntCi0JLQldCi0KHQotCS0JjQlSDQoSDQn9Ce0JvQldCcIHNvcnQgZ3JpZG5hbWVKc29uTGlzdHMgKi9cclxuICAgICAgICAgICAgbGV0IHR0ID0gZ3JpZG5hbWVKc29uTGlzdHMuc29ydCgoYSxiKSA9PiBhLnNvcnQgLSBiLnNvcnQpO1xyXG5cclxuICAgICAgICAgICAgLyrQlNCb0K8g0J7QotCe0JHQoNCQ0JbQldCd0JjQryDQkiDQotCQ0JHQm9CY0KbQlSDQodCe0JfQlNCQ0JXQnCBcItCh0KLQoNCe0JrQntCS0KvQmSDQntCR0KrQldCa0KJcIi0gc3RyXHJcbiAgICAgICAgICAgINCYINCf0KPQqNCY0Jwg0JXQk9CeINCSIGNvbHVtbkRlZnMqL1xyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IHR0Lmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKHR0W2pdLmlkICE9IFwiJCRoYXNoS2V5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gJ3tcImZpZWxkXCIgOiBcIicgKyB0dFtqXS5pZCArICdcIicgKyAnLCcgKyAnXCJkaXNwbGF5TmFtZVwiIDogXCInICsgZ3JpZG5hbWVKc29uTGlzdHNbal0uZ3JpZG5hbWUgKyAnXCJ9JyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmcy5wdXNoKEpTT04ucGFyc2Uoc3RyKSk7IFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBub3RWaXNpYmxlID0gWydpZCddOy8vJ2lkX2xpc3QnXHJcblxyXG4gICAgICAgICAgICAvL9Ch0JrQoNCr0JLQkNCV0Jwg0J/QntCb0JUg0JXQodCb0Jgg0J7QndCeINCf0KDQmNCh0KPQotCh0KLQktCj0JXQoiDQkiDQnNCQ0KHQodCY0JLQlSBub3RWaXNpYmxlINCU0JvQryDQntCh0KLQkNCb0KzQndCr0KUgLSDQn9CV0KDQldCY0JzQldCd0J7QktCr0JLQkNCV0Jwg0J/QntCb0K8g0JPQoNCY0JTQkFxyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IG5vdFZpc2libGUubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLmZpZWxkID09IG5vdFZpc2libGVbal0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/QndCQ0KXQntCU0JjQnCDQn9CeIGlkIChqKSDQmNCd0JTQldCa0KEg0JfQkNCU0JDQp9CYINCSINCc0JDQodCh0JjQktCVIHZtLnJlc2pzb250YXNrc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RJbmRleCA9IGZpbmRfaW5kZXhfYnlfaWQoZ3JpZG5hbWVKc29uTGlzdHMsIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0uZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLmRpc3BsYXlOYW1lID0gZ3JpZG5hbWVKc29uTGlzdHNbZmlyc3RJbmRleF0uZ3JpZG5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0ud2lkdGggPSBncmlkbmFtZUpzb25MaXN0c1tmaXJzdEluZGV4XS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvKtCU0J7QkdCQ0JLQm9Cv0JXQnCDQmtCd0J7Qn9Ca0KMg0KDQldCU0JDQmtCi0JjQoNCe0JLQkNCd0JjQryovXHJcbiAgICAgICAgICAgIGxldCBjaGUgPSAnPGkgY2xhc3M9XFwnZmEgZmEtcGVuY2lsLXNxdWFyZS1vIGJ0biBidG4tc3VjY2VzcyBidG4tc21cXCcgbmctY2xpY2s9XFwnZ3JpZC5hcHBTY29wZS52bS5teV9hbGVydChyb3cuZW50aXR5LmlkLHJvdy5lbnRpdHkuaWRfbGlzdCwxKVxcJz48L2k+XCInO1xyXG4gICAgICAgICAgICBzdHIgPSd7XCJmaWVsZFwiOiBcImVkaXRcIiwgXCJlbmFibGVTb3J0aW5nXCI6IGZhbHNlLCBcImRpc3BsYXlOYW1lXCI6IFwiLi4uXCIsIFwid2lkdGhcIjogMzgsIFwiY2VsbFRlbXBsYXRlXCI6IFwiJyArIGNoZSArICd9J1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdHIpOyBcclxuICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmcy5wdXNoKEpTT04ucGFyc2Uoc3RyKSk7XHJcblxyXG4gICAgICAgICAgICAvKtCU0J7QkdCQ0JLQm9Cv0JXQnCDQmtCd0J7Qn9Ca0KMg0KPQlNCQ0JvQldCd0JjQryovXHJcbiAgICAgICAgICAgIGNoZSA9ICc8ZGl2PjxpIGNsYXNzPVxcJ2ZhIGZhLXRyYXNoLW8gYnRuIGJ0bi1kYW5nZXIgYnRuLXNtXFwnIG5nLWNsaWNrPVxcJ2dyaWQuYXBwU2NvcGUudm0ubXlfYWxlcnQocm93LmVudGl0eS5pZCxyb3cuZW50aXR5LmlkX2xpc3QsMClcXCc+PC9kaXY+XCInO1xyXG4gICAgICAgICAgICBzdHIgPSd7XCJmaWVsZFwiOiBcImRlbGV0ZVwiLCBcImVuYWJsZVNvcnRpbmdcIjogZmFsc2UsIFwiZGlzcGxheU5hbWVcIjogXCIuLi5cIiwgXCJ3aWR0aFwiOiAzOCwgXCJjZWxsVGVtcGxhdGVcIjogXCInICsgY2hlICsgJ30nXHJcbiAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnMucHVzaChKU09OLnBhcnNlKHN0cikpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBteUxpc3QgPSAne1widmFsdWVcIjogXCIxXCIsIFwibGFiZWxcIjogXCLQn9C70LDQvVwiIH0sIHsgXCJ2YWx1ZVwiOiBcIjJcIiwgXCJsYWJlbFwiOiBcItCSINC/0YDQvtGG0LXRgdGB0LVcIiB9LCB7IFwidmFsdWVcIjogXCIzXCIsIFwibGFiZWxcIjogXCLQk9C+0YLQvtCy0L5cIn0nXHJcbiAgICAgICAgICAgIGxldCBteVN0YXR1cyA9ICd7XCJ2YWx1ZVwiOiBcIjFcIiwgXCJsYWJlbFwiOiBcItCe0LbQuNC00LDQtdGCXCIgfSwgeyBcInZhbHVlXCI6IFwiMlwiLCBcImxhYmVsXCI6IFwi0JIg0YDQsNCx0L7RgtC1XCIgfSwgeyBcInZhbHVlXCI6IFwiM1wiLCBcImxhYmVsXCI6IFwi0JLRi9C/0L7Qu9C90LXQvdC+XCJ9J1xyXG4gICAgICAgICAgICBsZXQgbXlGaWx0ZXI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2bS5hcnJsaXN0ID0gW1xyXG4gICAgICAgICAgICAgICAgeyAxOiBcItCe0LbQuNC00LDQtdGCXCIgfSwgXHJcbiAgICAgICAgICAgICAgICB7IDI6IFwi0JIg0YDQsNCx0L7RgtC1XCIgfSwgXHJcbiAgICAgICAgICAgICAgICB7IDM6IFwi0JLRi9C/0L7Qu9C90LXQvdC+XCJ9XHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICAvL9CU0J7QkdCQ0JLQm9Cv0JXQnNCcINCk0JjQm9Cs0KLQoNCrIFNFTEVDVCDQmCDQntCi0JzQldCd0K/QldCcINCk0JjQm9Cs0KLQoNCrINCU0JvQryDQmtCd0J7Qn9Ce0JpcclxuICAgICAgICAgICAgZm9yKGxldCBqPTA7IGogPCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImlkX2xpc3RcIiB8fCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiZXhlY3V0aW9uX3N0YXR1c1wiKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiaWRfbGlzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15RmlsdGVyID0gbXlMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15RmlsdGVyID0gbXlTdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0ciA9ICd7JyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnXCJ0eXBlXCIgOiBcInNlbGVjdFwiLCcgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1wic2VsZWN0T3B0aW9uc1wiICA6IFsgJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArIG15RmlsdGVyIFxyXG4gICAgICAgICAgICAgICAgICAgICsgJ119J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpbHRlciA9IEpTT04ucGFyc2Uoc3RyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImlkX2xpc3RcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBteUNlbFRlbXBsID0gJzxzZWxlY3QgIG5nLWNlbGwtaW5wdXQgJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICsgJ25nLW9wdGlvbnM9XFwncy5pZCBhcyBzLnZhbHVlIGZvciBzIGluIHZtLmFycmxpc3RcXCcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgKyAnbmctY2xhc3M9XFwnY29sdFxcJydcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICArICduZy1tb2RlbD1cXCdDT0xfRklFTERcXCcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgKyAnbmctaW5wdXQ9XFwnQ09MX0ZJRUxEXFwnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICsgJ2RhdGEtcGxhY2Vob2xkZXI9XFwnLS0gU2VsZWN0IE9uZSAtLVxcJz4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICArICc8L3NlbGVjdD4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmNlbGxUZW1wbGF0ZSA9IG15Q2VsVGVtcGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZW5hYmxlQ2VsbEVkaXQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5uYW1lID0gXCJpZF9saXN0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5lZGl0RHJvcGRvd25WYWx1ZUxhYmVsID0gXCJpZF9saXN0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5lZGl0YWJsZUNlbGxUZW1wbGF0ZSA9IFwidWktZ3JpZC9kcm9wZG93bkVkaXRvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZWRpdERyb3Bkb3duT3B0aW9uc0FycmF5ID0gdm0uYXJybGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJlZGl0XCIgfHwgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImRlbGV0ZVwiKSB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmVuYWJsZUZpbHRlcmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJkYXRlXCIgKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLnR5cGUgPSAnZGF0ZScsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5jZWxsRmlsdGVyID0gJ2RhdGU6XCJ5eXl5LU1NLWRkXCInXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnMpO1xyXG5cclxuICAgICAgICAgICAgLy8gdm0uZ3JpZE9wdGlvbnMubXVsdGlTZWxlY3QgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgcmVmcmVzaF9ncmlkKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0uZ2V0UHJvZHVjdExpc3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuZGF0YSA9IHZtLnJlc3VsdFNpbXVsYXRlZERhdGE7XHJcbiAgICAgICAgICAgIHZtLm15U2VsZWN0ZWRSb3dzID0gdm0uZ3JpZEFwaS5zZWxlY3Rpb24uZ2V0U2VsZWN0ZWRSb3dzKCk7IC8vPC0tUHJvcGVydHkgdW5kZWZpbmVkIGVycm9yIGhlcmVcclxuXHJcbiAgICAgICAgICAgIGlmICh2bS5teVNlbGVjdGVkUm93c1swXSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFsO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB2bS5teVNlbGVjdGVkUm93cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWwgPSBhbCArJ9CS0YvQsdGA0LDQvdC+IDogJyArIChpICsgMSkgKyAnINCY0JQgPSAnICsgdm0ubXlTZWxlY3RlZFJvd3NbaV0uaWQgKyAnLCDQm9C40YHRgiA9ICcgKyB2bS5teVNlbGVjdGVkUm93c1tpXS5pZF9saXN0ICsgJy5cXG4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbGVydChhbC5zbGljZSg5KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn0J3QuNGH0LXQs9C+INC90LUg0LLRi9Cx0YDQsNC90L4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHZtLmdyaWRBcGkuc2VsZWN0aW9uLnNlbGVjdGVkUm93KSB7XHJcbiAgICAgICAgICAgICAgICAgIHZtLmdyaWRBcGkuc2VsZWN0aW9uLnNlbGVjdFJvdyh2bS5ncmlkT3B0aW9ucy5kYXRhWzBdKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG15X2FsZXJ0IChpZCwgbCwgdHlwZT0nZGVmJykge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2bS5hbGxVc2Vycyk7XHJcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGVsdGFzY2sgKGwsIGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8v0J3QkNCZ0KLQmCDQndCe0JzQldCgINC/LtC/LiDQrdCi0J4g0J3Qo9CW0J3QniDQotCe0JvQrNCa0J4g0JTQm9CvINCQ0J/QlNCV0JnQotCQINCU0J7QkdCQ0JLQm9CV0J3QndCr0KUg0JfQkNCU0JDQp1xyXG4gICAgICAgICAgICAgICAgbGV0IG4gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB2bVsnbGlzdF8nICsgbF0ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtWydsaXN0XycgKyBsXVtpXS5pZCA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBlZGl0dGFzY2sgKGwsIGlkLCBuKTtcclxuICAgICAgICAgICAgfTsgICBcclxuICAgICAgICB9O1xyXG4gICAgICBcclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCS0KvQktCe0JTQkCDQodCe0JTQldCg0JbQmNCc0J7Qk9CeINCb0JjQodCi0J7QkiBcclxuICAgICAgICBmdW5jdGlvbiBsb2dNb2RlbHMgKCkge1xyXG4gICAgICAgICAgICB2bS5zb3J0aW5nTG9nID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdm0ucmF3U2NyZWVucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIHZhciBsb2dFbnRyeSA9IHZtLnJhd1NjcmVlbnNbaV0ubWFwKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geC50aXRsZSArICctJyArIHguaWRfbGlzdCArICd8JztcclxuICAgICAgICAgICAgICB9KS5qb2luKCcsICcpO1xyXG4gICAgICAgICAgICAgIGxvZ0VudHJ5ID0gJ2NvbnRhaW5lciAnICsgKGkrMSkgKyAnOiAnICsgbG9nRW50cnk7XHJcbiAgICAgICAgICAgICAgdm0uc29ydGluZ0xvZy5wdXNoKGxvZ0VudHJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0KPQlNCQ0JvQldCd0JjQryDQl9CQ0JTQkNCn0Jgg0JjQlyDQm9CY0KHQotCQKCHQlNCb0K8g0K3QotCe0Jkg0JfQkNCU0JDQp9CYINCd0KPQltCd0J4g0J/QntCU0JrQm9Cu0KfQmNCi0KwgTE9EQVNIICEhISlcclxuICAgICAgICBmdW5jdGlvbiBkZWx0YXNjayAoaSwgaikge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvLyB2bVsnbGlzdF8nICsgaV0uc3BsaWNlKGosIDEpO1xyXG4gICAgICAgICAgICB2bVsnbGlzdF8nICsgaV0uc3BsaWNlKF8uaW5kZXhPZih2bVsnbGlzdF8nICsgaV0sIF8uZmluZCh2bVsnbGlzdF8nICsgaV0sIGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmlkID09PSBqOyB9KSksIDEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodm0udXNlci5pZCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5yZXNqc29udGFza3Muc3BsaWNlKF8uaW5kZXhPZih2bS5yZXNqc29udGFza3MsIF8uZmluZCh2bS5yZXNqc29udGFza3MsIGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmlkID09PSBqOyB9KSksIDEpO1xyXG4gICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuZGF0YSA9IHZtLnJlc2pzb250YXNrcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkX3VzZXIgPT0gdm0udXNlci5pZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzLnNwbGljZShfLmluZGV4T2Yodm0ucmVzanNvbnRhc2tzLCBfLmZpbmQodm0ucmVzanNvbnRhc2tzLCBmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS5pZCA9PT0gajsgfSkpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlZnJlc2hfcmF3U2NyZWVucygpe1xyXG4gICAgICAgICAgICB2bS5yYXdTY3JlZW5zID0gW107XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoZWV0cyh2bS5yZXNnZXRKc29uTGlzdHMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlZnJlc2hfZ3JpZCgpe1xyXG4gICAgICAgICAgICBpZih2bS51c2VyLmlkICE9IDEpIHtcclxuICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmRhdGEgPSB2bS5yZXNqc29udGFza3MuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZF91c2VyID09IHZtLnVzZXIuaWQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmRhdGEgPSB2bS5yZXNqc29udGFza3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciB0YXNja19jb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDQpNCj0J3QmtCm0JjQntCd0JDQmyBhZGR0YXNjayAoaSk6PGJyPlxyXG4gICAgICAgICAqIDEuINCk0J7QoNCc0JjQoNCj0JXQoiDQmNCXINCh0KLQoNCe0JrQmCDQntCR0KrQldCa0KIt0JfQkNCU0JDQp9CjPGJyPiBcclxuICAgICAgICAgKiAyLiDQlNCe0JHQkNCS0JvQr9CV0KIg0J7QkdCq0JXQmtCiINCSIHZtLnJlc2pzb250YXNrcyA8YnI+XHJcbiAgICAgICAgICogMy4g0J7QkdCd0J7QktCb0K/QldCiIHZtLnJhd1NjcmVlbnNcclxuICAgICAgICAgKiBAbWV0aG9kIGFkZHRhc2NrXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpINCd0J7QnNCV0KAg0JvQmNCh0KLQkCBEUkFHJkRST1BcclxuICAgICAgICAgKi8gXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQlNCe0JHQkNCS0JvQldCd0JjQryDQl9CQ0JTQkNCn0JggXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkdGFzY2sgKGkpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHZtWydsaXN0XycgKyBpXS5sZW5ndGggPCB2bS50YXNja19saW1pdCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWRkVGFzY2sgPSB2bS5yZXNqc29udGFza3NbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy/QodCe0JfQlNCQ0JXQnCBcItCh0KLQoNCe0JrQntCS0KvQmSDQntCR0KrQldCa0KJcIi0gc3RyINCU0JvQryDQlNCQ0JvQrNCd0JXQmdCo0JXQk9CeIEpTT04ucGFyc2Uoc3RyKVxyXG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9J3snO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrIGluIGFkZFRhc2NrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoayAhPSBcImlkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoayA9PSBcInRpdGxlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICdcIicgKyBrICsgJ1wiJyAgKyAnOiBcIk5ld1Rhc2NrICcgKyBpICsgdGFzY2tfY291bnQgKyAnXCIsJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGsgPT0gXCJpZF9saXN0XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICdcIicgKyBrICsgJ1wiJyAgKyAnOiAnICsgIE51bWJlcihpKSArICcsJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoayA9PSBcImlkX3VzZXJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJ1wiJyArIGsgKyAnXCInICArICc6ICcgKyAgdm0udXNlci5pZCArICcsJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoayA9PSBcImRlc2NyaXB0aW9uXCIgfHwgayA9PSBcImRhdGVcIil7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGsgPT0gXCJkYXRlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnXCInICsgayArICdcIicgKyAnIDogXCIwOC4xMi4yMDE3XCInICsgJywnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7c3RyID0gc3RyICsgJ1wiJyArIGsgKyAnXCInICsgJyA6IFwiMVwiJyArICcsJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGsgIT0gXCIkJGhhc2hLZXlcIikgc3RyID0gc3RyICsgJ1wiJyArIGsgKyAnXCInICsgJyA6IDEnICsgJywnICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnXCJpZFwiIDogJyArIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApICsgJywnIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2UoMCwtMSlcclxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICd9JztcclxuICAgICAgICAgICAgICAgIC8vIHZtLnJhd1NjcmVlbnMucHVzaChKU09OLnBhcnNlKHN0cikpO1xyXG4gICAgICAgICAgICAgICAgLy8gdm1bJ2xpc3RfJyArIGldLnB1c2goSlNPTi5wYXJzZShzdHIpKTtcclxuICAgICAgICAgICAgICAgIHZtLnJlc2pzb250YXNrcy5wdXNoKEpTT04ucGFyc2Uoc3RyKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaF9yYXdTY3JlZW5zKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaF9ncmlkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFzY2tfY291bnQrK1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIGVkaXR0YXNjayAoaSwgaiwgdF9pbmRleCk6PGJyPlxyXG4gICAgICAgICAqINCe0KLQmtCg0KvQotCY0JUg0JfQkNCU0JDQp9CYINCU0JvQryDQn9Ce0JTQoNCe0JHQndCe0JPQniDQn9Cg0J7QodCc0J7QotCg0JAg0Jgg0JLQntCX0JzQntCW0J3QntCT0J4g0KDQldCU0JDQmtCi0JjQoNCe0JLQkNCd0JjQr1xyXG4gICAgICAgICAqIEBtZXRob2QgZWRpdHRhc2NrXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpINCd0J7QnNCV0KAg0JvQmNCh0KLQkCBEUkFHJkRST1BcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGogaWQg0JfQkNCU0JDQp9CYXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0X2luZGV4INCf0J7QoNCv0JTQmtCe0JLQq9CZINCd0J7QnNCV0KAg0JfQkNCU0JDQp9CYINCSIERSQUcmRFJPUFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0J/QoNCe0KHQnNCe0KLQoNCQINCX0JDQlNCQ0KfQmCBcclxuICAgICAgICBmdW5jdGlvbiBlZGl0dGFzY2sgKGksIGosIHRfaW5kZXgpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy/QpNCY0JvQrNCi0KDQo9CV0Jwg0J/QniDQm9CY0KHQotCjINCYINCY0JQg0JfQkNCU0JDQp9CYXHJcbiAgICAgICAgICAgIGxldCBmID0gXy5maW5kKHZtWydsaXN0XycgKyBpXSwgZnVuY3Rpb24gKGl0ZW0peyByZXR1cm4gaXRlbS5pZCA9PT0gajt9KTtcclxuXHJcbiAgICAgICAgICAgIC8v0JLQodCVIFwi0JrQm9Cu0KfQmFwiINChINCU0JDQndCd0KvQnNCYINCX0JDQk9Ce0J3Qr9CV0Jwg0JIg0J/QldCg0JXQnNCV0J3QndCr0JUg0KTQntCg0JzQq1xyXG4gICAgICAgICAgICBmb3IobGV0IGsgaW4gZikge1xyXG4gICAgICAgICAgICAgICAgdm1bJ2h0bWxfJyArIGtdID0gZltrXTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdm1bJ2h0bWxfdF9pbmRleCddID0gdF9pbmRleCArIDE7XHJcblxyXG4gICAgICAgICAgICAvL9Ce0KLQmtCg0KvQktCQ0JXQnNCcINCU0JjQkNCb0J7Qk9Ce0JLQntCVINCe0JrQndCeXHJcbiAgICAgICAgICAgICQoXCIjb3Blbk1vZGFsXCIpLmZhZGVUb2dnbGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VfbGlzdCgpe1xyXG4gICAgICAgICAgICB2bS5jaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIGZpbmRfaW5kZXhfYnlfaWQoc291cmNlLCBpZCkgOjxicj5cclxuICAgICAgICAgKiDQn9Ce0JjQodCaINCY0J3QlNCV0JrQodCQINCX0JDQlNCQ0KfQmCDQkiDQnNCQ0KHQodCY0JLQlSDQn9CV0KDQldCU0JDQndCd0J7Qk9CeINCe0JHQqtCV0JrQotCQIC0gc291cmNlINCf0J4g0J/QldCg0JXQlNCQ0J3QndCe0JzQoyBpZFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZmluZF9pbmRleF9ieV9pZChzb3VyY2UsaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleGVzID0gJC5tYXAoc291cmNlLCBmdW5jdGlvbihvYmosIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvYmouaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgKiBAbWV0aG9kIGZpbmRfaW5kZXhfYnlfaWRcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlINCc0JDQodCh0JjQkiDQntCR0KrQldCa0KLQntCSXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCBpZCDQl9CQ0JTQkNCn0JhcclxuICAgICAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSDQndCQ0JnQlNCV0J3QndCr0Jkg0JjQndCU0JXQmtChXHJcbiAgICAgICAgICovIFxyXG4gICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCf0J7QmNCh0JrQkCDQn9CeINCY0JRcclxuICAgICAgICBmdW5jdGlvbiBmaW5kX2luZGV4X2J5X2lkKHNvdXJjZSxpZCl7XHJcbiAgICAgICAgICAgIGxldCBpbmRleGVzID0gJC5tYXAoc291cmNlLCBmdW5jdGlvbihvYmosIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYob2JqLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgcmV0dXJuIGluZGV4ZXNbMF07XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBtZXRob2Qgc2F2ZXRhc2NrXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIHNhdmV0YXNjaygpIDo8YnI+XHJcbiAgICAgICAgICogMS4g0J/QntCY0KHQmiDQmNCd0JTQldCa0KHQkCDQl9CQ0JTQkNCn0Jgg0JIg0JzQkNCh0KHQmNCS0JUgdm0ucmVzanNvbnRhc2tzPGJyPiBcclxuICAgICAgICAgKiAyLiDQntCR0J3QntCS0JvQldCd0JjQlSDQn9Ce0JvQldCZINCSINCX0JDQlNCQ0KfQlSAo0JjQlyDQnNCQ0KHQodCY0JLQkCB2bS5yZXNqc29udGFza3MpPGJyPlxyXG4gICAgICAgICAqIDMuINCV0KHQm9CYINCR0KvQmyDQmNCX0JzQldCd0JXQnSDQodCi0JDQotCj0KEg0JfQkNCU0JDQp9CYIC0g0J7QkdCd0J7QktCb0JXQndCY0JUg0JzQkNCh0KHQmNCS0JAgdm0ucmF3U2NyZWVuczxicj5cclxuICAgICAgICAgKi8gXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQodCe0KXQoNCQ0J3QldCd0JjQryDQl9CQ0JTQkNCn0JhcclxuICAgICAgICBmdW5jdGlvbiBzYXZldGFzY2sgKGksIGosIHRfaW5kZXgpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYoY29uZmlybShcItCh0L7RhdGA0LDQvdC40YLRjD9cIikgPT0gdHJ1ZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/QndCQ0KXQntCU0JjQnCDQn9CeIGlkIChqKSDQmNCd0JTQldCa0KEg0JfQkNCU0JDQp9CYINCSINCc0JDQodCh0JjQktCVIHZtLnJlc2pzb250YXNrc1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0SW5kZXggPSBmaW5kX2luZGV4X2J5X2lkKHZtLnJlc2pzb250YXNrcywgaik7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrIGluIHZtLnJlc2pzb250YXNrc1swXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGsgIT0gXCIkJGhhc2hLZXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihrID09IFwiZGF0ZVwiIHx8IGsgPT0gXCJ0aXRsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihrID09IFwiZGF0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzW2ZpcnN0SW5kZXhdW1wiZGF0ZVwiXSA9ICAkKCcjZHRwY2tyJylbMF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5yZXNqc29udGFza3NbZmlyc3RJbmRleF1bXCJ0aXRsZVwiXSA9ICQoJyN0dGwnKVswXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygkKCcjdHRsJylbMF0udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5yZXNqc29udGFza3NbZmlyc3RJbmRleF1ba10gPSB2bVsnaHRtbF8nICsga107ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKj8g0KHQn9CV0KbQmNCQ0JvQrNCd0J4g0JTQm9CvINCe0JHQndCe0JLQm9CV0J3QmNCvICEhISDQotCe0JvQrNCa0J4g0JTQntCR0JDQktCb0JXQndCd0KvQpSDQl9CQ0JTQkNCnINCSIGRyYWcmZHJvcCAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2bVsnbGlzdF8nICsgaV1bdF9pbmRleCAtIDFdW2tdID0gdm1bJ2h0bWxfJyArIGtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZtLmNoYW5nZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2bS5jaGFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hfcmF3U2NyZWVucygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoX2dyaWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdm0uY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codm0uY2hhbmdlKTsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZtLnJlc2pzb250YXNrcyk7XHJcbiAgICAgICAgICAgICQoXCIubW9kYWxEaWFsb2dcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JLQq9Cl0J7QlNCQINCY0JcgbW9kYWxEaWFsb2cg0JHQldCXINCh0J7QpdCg0JDQndCV0J3QmNCvINCU0JDQndCd0KvQpdClXHJcbiAgICAgICAgZnVuY3Rpb24gZXhpdF9tb2RhbCgpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJChcIi5tb2RhbERpYWxvZ1wiKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGVmX2NsaWNrKCl7ZXZlbnQucHJldmVudERlZmF1bHQoKTt9O1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCh0JrQoNCr0KLQmNCvINCY0J3QlNCY0JrQkNCi0J7QoNCQINCe0JbQmNCU0JDQndCY0K9cclxuICAgICAgICBmdW5jdGlvbiBmaW5pc2hfbG9hZGVyKCl7XHJcbiAgICAgICAgICAgIGlmICgkKFwiI2xvYWRlclwiKS5pcyhcIjp2aXNpYmxlXCIpKXtcclxuICAgICAgICAgICAgICAgICQoXCIjbG9hZGVyXCIpLmZhZGVUb2dnbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JLQmNCX0KPQkNCb0JjQl9CQ0KbQmNCYINCY0J3QlNCY0JrQkNCi0J7QoNCQINCe0JbQmNCU0JDQndCY0K9cclxuICAgICAgICBmdW5jdGlvbiBzdGFydF9sb2FkZXIoKXtcclxuICAgICAgICAgICAgaWYgKCEkKFwiI2xvYWRlclwiKS5pcyhcIjp2aXNpYmxlXCIpKXtcclxuICAgICAgICAgICAgICAgICQoXCIjbG9hZGVyXCIpLmZhZGVUb2dnbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCX0JDQk9Cg0KPQl9Ca0Jgg0KLQldCa0KPQqdCV0JPQniDQrtCX0JXQoNCQIFxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRDdXJyZW50VXNlcigpIHtcclxuICAgICAgICAgICAgVXNlclNlcnZpY2UuR2V0QnlVc2VybmFtZSgkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXIudXNlcm5hbWUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQl9CQ0JPQoNCj0JfQmtCYINCS0KHQldClINCu0JfQldCg0J7QkiBcclxuICAgICAgICBmdW5jdGlvbiBsb2FkQWxsVXNlcnMoKSB7XHJcbiAgICAgICAgICAgIFVzZXJTZXJ2aWNlLkdldEFsbCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodXNlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5hbGxVc2VycyA9IHVzZXJzO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQo9CU0JDQm9CV0J3QmNCvINCu0JfQldCg0JAgXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlVXNlcihpZCkge1xyXG4gICAgICAgICAgICBVc2VyU2VydmljZS5EZWxldGUoaWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEFsbFVzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2Fzc2V0cy9ob21lL2hvbWUuY29udHJvbGxlci5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFLQTtBQUNBO0FBekJBO0FBQ0E7QUEyQkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFYQTtBQUNBO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOzs7Iiwic291cmNlUm9vdCI6IiJ9