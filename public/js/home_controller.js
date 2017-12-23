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

	/******/(function (modules) {
	    // webpackBootstrap
	    /******/ // The module cache
	    /******/var installedModules = {};

	    /******/ // The require function
	    /******/function __webpack_require__(moduleId) {

	        /******/ // Check if module is in cache
	        /******/if (installedModules[moduleId])
	            /******/return installedModules[moduleId].exports;

	        /******/ // Create a new module (and put it into the cache)
	        /******/var module = installedModules[moduleId] = {
	            /******/exports: {},
	            /******/id: moduleId,
	            /******/loaded: false
	            /******/ };

	        /******/ // Execute the module function
	        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	        /******/ // Flag the module as loaded
	        /******/module.loaded = true;

	        /******/ // Return the exports of the module
	        /******/return module.exports;
	        /******/
	    }

	    /******/ // expose the modules object (__webpack_modules__)
	    /******/__webpack_require__.m = modules;

	    /******/ // expose the module cache
	    /******/__webpack_require__.c = installedModules;

	    /******/ // __webpack_public_path__
	    /******/__webpack_require__.p = "/js/";

	    /******/ // Load entry module and return exports
	    /******/return __webpack_require__(0);
	    /******/
	})(
	/************************************************************************/
	/******/[
	/* 0 */
	/***/function (module, exports) {

	    'use strict';

	    (function () {
	        'use strict';

	        angular.module('app').controller('HomeController', HomeController).filter('id_list', id_list).filter('execution_status', execution_status);

	        /**
	         * ПРЕДОСТАВЛЕНИЕ ДАННЫХ В ВИДЕ DRAG&DROP И ng-GRID
	            
	            (function () {
	                angular
	                    .module('app')
	                    .controller('HomeController', HomeController)
	                    .filter('id_list', id_list)
	                    .filter('execution_status', execution_status)
	                   HomeController.$inject = ['UserService', 'HomeService', 'uiGridConstants','$rootScope', '$timeout'];
	                ........
	           * @class HomeController
	         * @module app
	         * @main HomeController
	         */
	        HomeController.$inject = ['UserService', 'HomeService', 'uiGridConstants', 'uiGridExporterConstants', 'uiGridExporterService', '$rootScope', '$timeout'];

	        function HomeController(UserService, HomeService, uiGridConstants, uiGridExporterConstants, uiGridExporterService, $rootScope, $timeout) {
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
	            vm.exportPDF = exportPDF;
	            vm.exportCSV = exportCSV;
	            vm.gmail = gmail;
	            vm.address = address;
	            vm.mailAddress = '@gmail.com';
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
	                gridnameJsonLists = HomeService.getResultFromJson('db/gridname.json');
	            };

	            //ФУНКЦИЯ ИМПОРТА СПИСКА ЛИСТОВ
	            function getJsonLists() {
	                vm.resgetJsonLists = HomeService.getResultFromJson('db/listsName.json');
	                HomeService.list = vm.resgetJsonLists;
	            };

	            //ФУНКЦИЯ ИМПОРТА СПИСКА ЗАДАЧ
	            function getJsonTasks() {
	                vm.resjsontasks = HomeService.getResultFromJson('db/tasks.json');
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
	                    enableGridMenu: true,
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

	                    // if(vm.gridOptions.columnDefs[j].field == "id_user") {
	                    //     vm.gridOptions.columnDefs[j].cellFilter = 'id_user';

	                    //     let dropDown;

	                    //     if(vm.user.id == 1) {
	                    //         vm.allUsers.map(item => dropDown = dropDown + '{"value": "' + item.id + '", "label": "' + item.username + '" },');
	                    //     }else{
	                    //         vm.allUsers.map(item => {
	                    //             if(item.id == vm.user.id) {
	                    //                 dropDown = dropDown + '{"value": "' + item.id + '", "label": "' + item.username + '" },'
	                    //             }
	                    //         })
	                    //     }

	                    //     str = '{' 
	                    //         + '"type" : "select",' 
	                    //         + '"selectOptions"  :  ['
	                    //         + dropDown.slice(9,-1) 
	                    //     + ']}';

	                    //     vm.gridOptions.columnDefs[j].filter = JSON.parse(str);
	                    // }
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

	            function getDate() {
	                var today = new Date();
	                var dd = today.getDate();
	                var mm = today.getMonth() + 1; //January is 0!
	                var yyyy = today.getFullYear();

	                if (dd < 10) {
	                    dd = '0' + dd;
	                };

	                if (mm < 10) {
	                    mm = '0' + mm;
	                };

	                today = mm + '_' + dd + '_' + yyyy;
	                return today;
	            };

	            //ФУНКЦИЯ ЭКСПОРТА ГРИДА В PDF
	            function exportPDF() {
	                event.preventDefault();
	                vm.gridApi.exporter.pdfExport(uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE);
	            };

	            //ФУНКЦИЯ ЭКСПОРТА ГРИДА В EXEL
	            function exportCSV() {
	                event.preventDefault();
	                var exportService = uiGridExporterService;
	                var grid = vm.gridApi.grid;
	                var fileName = getDate() + ".csv";

	                exportService.loadAllDataIfNeeded(grid, uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE).then(function () {
	                    var exportColumnHeaders = exportService.getColumnHeaders(grid, uiGridExporterConstants.VISIBLE);
	                    var exportData = exportService.getData(grid, uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE);
	                    var csvContent = exportService.formatAsCsv(exportColumnHeaders, exportData, grid.options.exporterCsvColumnSeparator = ';');
	                    exportService.downloadFile(fileName, csvContent, grid.options.exporterOlderExcelCompatibility);

	                    alert('Загрузится файл ' + fileName);
	                    // Если будут отражаться кракозябры - открыть файл в notepad++ и выберите "преобразовать в ANSI". 
	                    //console.log(csvContent);
	                });
	            };

	            vm.address;
	            function address() {
	                $('#address').fadeToggle();
	            };

	            function funcA() {
	                alert('send');
	            };

	            //ОТПРАВКА ПИСЕМ 
	            function gmail() {
	                event.preventDefault();
	                var exportService = uiGridExporterService;
	                var grid = vm.gridApi.grid;

	                exportService.loadAllDataIfNeeded(grid, uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE).then(function () {
	                    var exportColumnHeaders = exportService.getColumnHeaders(grid, uiGridExporterConstants.VISIBLE);
	                    var exportData = exportService.getData(grid, uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE);
	                    vm.csvContent = exportService.formatAsCsv(exportColumnHeaders, exportData, grid.options.exporterCsvColumnSeparator = ';');

	                    var tbl = void 0;
	                    var t = vm.csvContent.split('\n');
	                    tbl = '<tr>';
	                    for (var i = 0; i < t.length; i++) {
	                        var tt = t[i].split(';');

	                        for (var j = 0; j < tt.length; j++) {

	                            if (i == 0) {
	                                tbl = tbl + '<th>' + tt[j] + '</th>';
	                            } else {
	                                tbl = tbl + '<td>' + tt[j] + '</td>';
	                            }
	                        }
	                        tbl = tbl + '</tr>';
	                    };

	                    // console.log(tbl);

	                    $.ajax({
	                        url: "../mail.php",
	                        type: "POST",
	                        data: { to: vm.mailAddress, sub: "Export", emailbody: tbl },
	                        dataType: "html",
	                        success: funcA
	                    });
	                });

	                $('#address').fadeToggle();
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
	                    HomeService.Users = vm.allUsers;
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
	        function id_list() {

	            var id_listHash = {
	                1: "План",
	                2: "В процессе",
	                3: "Готово"
	            };

	            return function (input) {
	                if (!input) {
	                    return '';
	                } else {
	                    return id_listHash[input];
	                }
	            };
	        };

	        //ЗАМЕНА ДАННЫХ В ГРИДЕ (ПОЛЕ - execution_status)
	        function execution_status() {
	            var execution_statusHash = {
	                1: "Ожидает",
	                2: "В работе",
	                3: "Выполнено"
	            };
	            return function (input) {
	                if (!input) {
	                    return '';
	                } else {
	                    return execution_statusHash[input];
	                }
	            };
	        };

	        // //ЗАМЕНА ДАННЫХ В ГРИДЕ (ПОЛЕ - id_user)
	        // function id_user(HomeService){
	        //     var id_usertHash = create_obj_for_filter(HomeService.Users, 'id', 'username');
	        //     console.log(id_usertHash);
	        //     return function(input) {
	        //         if (!input){
	        //           return '';
	        //         } else {
	        //           return id_usertHash[input];
	        //         }
	        //     };
	        // }
	    })();

	    /***/
	}]
	/******/);

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZV9jb250cm9sbGVyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGVlYjk4ZTcwNDQ3Y2I5YzE0NjMxPzk0YjEqKiIsIndlYnBhY2s6Ly8vd2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmMTU1OTE2YzRkYTA1ZDI4MzA3OCIsIndlYnBhY2s6Ly8vd2VicGFjazovLy9mcm9udGVuZC9hc3NldHMvaG9tZS9ob21lLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGVlYjk4ZTcwNDQ3Y2I5YzE0NjMxIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYxNTU5MTZjNGRhMDVkMjgzMDc4XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjE1NTkxNmM0ZGEwNWQyODMwNzgiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIEhvbWVDb250cm9sbGVyKVxyXG4gICAgICAgIC5maWx0ZXIoJ2lkX2xpc3QnLCBpZF9saXN0KVxyXG4gICAgICAgIC5maWx0ZXIoJ2V4ZWN1dGlvbl9zdGF0dXMnLCBleGVjdXRpb25fc3RhdHVzKVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDQn9Cg0JXQlNCe0KHQotCQ0JLQm9CV0J3QmNCVINCU0JDQndCd0KvQpSDQkiDQktCY0JTQlSBEUkFHJkRST1Ag0JggbmctR1JJRFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXJcclxuICAgICAgICAgICAgICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIEhvbWVDb250cm9sbGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoJ2lkX2xpc3QnLCBpZF9saXN0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoJ2V4ZWN1dGlvbl9zdGF0dXMnLCBleGVjdXRpb25fc3RhdHVzKVxyXG5cclxuICAgICAgICAgICAgICAgICBIb21lQ29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsICdIb21lU2VydmljZScsICd1aUdyaWRDb25zdGFudHMnLCckcm9vdFNjb3BlJywgJyR0aW1lb3V0J107XHJcbiAgICAgICAgICAgICAgICAuLi4uLi4uLlxyXG5cclxuICAgICAgICAgKiBAY2xhc3MgSG9tZUNvbnRyb2xsZXJcclxuICAgICAgICAgKiBAbW9kdWxlIGFwcFxyXG4gICAgICAgICAqIEBtYWluIEhvbWVDb250cm9sbGVyXHJcbiAgICAgICAgICovXHJcbiAgICBIb21lQ29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsICdIb21lU2VydmljZScsICd1aUdyaWRDb25zdGFudHMnLCAndWlHcmlkRXhwb3J0ZXJDb25zdGFudHMnLCAndWlHcmlkRXhwb3J0ZXJTZXJ2aWNlJywgJyRyb290U2NvcGUnLCAnJHRpbWVvdXQnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBIb21lQ29udHJvbGxlcihVc2VyU2VydmljZSwgSG9tZVNlcnZpY2UsIHVpR3JpZENvbnN0YW50cywgdWlHcmlkRXhwb3J0ZXJDb25zdGFudHMsIHVpR3JpZEV4cG9ydGVyU2VydmljZSwgJHJvb3RTY29wZSwgJHRpbWVvdXQpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT090JLQodCVINCn0KLQniDQndCj0JbQndCeINCU0JvQryBIVE1MPT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiA8cD7QktCh0JUg0KfQotCeIFwi0J/QoNCV0JTQkNCV0KLQodCvXCJcIiDQkiBIVE1MPC9wPlxyXG4gICAgICAgICAgICB2bS50YXNja19saW1pdCA9IDE1O1xyXG4gICAgICAgICAgICB2bS5uZ0dyaWRWaWV3ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHZtLnVzZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB2bS5hbGxVc2VycyA9IFtdO1xyXG4gICAgICAgICAgICB2bS5kZWxldGVVc2VyID0gZGVsZXRlVXNlcjtcclxuXHJcbiAgICAgICAgICAgIHZtLmV4aXRfbW9kYWwgPSBleGl0X21vZGFsO1xyXG4gICAgICAgICAgICB2bS5zYXZldGFzY2sgPSBzYXZldGFzY2s7XHJcbiAgICAgICAgICAgIHZtLmVkaXR0YXNjayA9IGVkaXR0YXNjaztcclxuICAgICAgICAgICAgdm0uZGVsdGFzY2sgPSBkZWx0YXNjaztcclxuICAgICAgICAgICAgdm0uYWRkdGFzY2sgPSBhZGR0YXNjaztcclxuICAgICAgICAgICAgdm0uZGVmX2NsaWNrID0gZGVmX2NsaWNrO1xyXG4gICAgICAgICAgICB2bS5maW5pc2hfbG9hZGVyID0gZmluaXNoX2xvYWRlcjtcclxuICAgICAgICAgICAgdm0uc3RhcnRfbG9hZGVyID0gc3RhcnRfbG9hZGVyO1xyXG4gICAgICAgICAgICB2bS5sb2dNb2RlbHMgPSBsb2dNb2RlbHM7XHJcbiAgICAgICAgICAgIHZtLm15X2FsZXJ0ID0gbXlfYWxlcnQ7XHJcbiAgICAgICAgICAgIHZtLmNoYW5nZV9saXN0ID0gY2hhbmdlX2xpc3Q7XHJcbiAgICAgICAgICAgIHZtLmNoYW5nZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdm0ucmF3U2NyZWVucyA9IFtdO1xyXG4gICAgICAgICAgICB2bS5zb3J0aW5nTG9nID0gW107XHJcblxyXG4gICAgICAgICAgICB2bS5yZXNqc29udGFza3MgPSBbXTtcclxuICAgICAgICAgICAgdm0ucmVzZ2V0SnNvbkxpc3RzID0gW107XHJcblxyXG4gICAgICAgICAgICB2bS5zb3J0YWJsZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJhcHBcIixcclxuICAgICAgICAgICAgICAgIGNvbm5lY3RXaXRoOiBcIi5hcHBzLWNvbnRhaW5lclwiLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKC8vIGVuc3VyZSB3ZSBhcmUgaW4gdGhlIGZpcnN0IHVwZGF0ZSgpIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAhdWkuaXRlbS5zb3J0YWJsZS5yZWNlaXZlZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdGhhdCBpdHMgYW4gYWN0dWFsIG1vdmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gYmV0d2VlbiB0aGUgdHdvIGxpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLnNvcnRhYmxlLnNvdXJjZVswXSAhPT0gdWkuaXRlbS5zb3J0YWJsZS5kcm9wdGFyZ2V0WzBdICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGUgc2l6ZSBsaW1pdGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLnNvcnRhYmxlLmRyb3B0YXJnZXRNb2RlbC5sZW5ndGggPj0gdm0udGFzY2tfbGltaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLnNvcnRhYmxlLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vISEhINCe0JHQndCe0JLQm9Cv0JXQnCBpZF9saXN0INCjINCf0JXQoNCV0JzQldCp0JXQndCd0J7QmSDQl9CQ0JTQkNCn0JggISEhXHJcbiAgICAgICAgICAgICAgICAgIC8vIHZhciBzdHIgPSBOdW1iZXIodWkuaXRlbS5zb3J0YWJsZS5kcm9wdGFyZ2V0TGlzdFswXS5hdHRyaWJ1dGVzLmlkLnZhbHVlLnNsaWNlKDcsMTApKTtcclxuICAgICAgICAgICAgICAgICAgLy8gdWkuaXRlbS5zb3J0YWJsZS5tb2RlbC5pZF9saXN0ID0gc3RyICsgMVxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2bS5yYXdTY3JlZW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVuc1tpXS5tYXAoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHguaWRfbGlzdCA9IGkgKyAxOyBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07IFxyXG5cclxuICAgICAgICAgICAgdm0uc3RhdHVzID0gW1xyXG4gICAgICAgICAgICAgICAge2lkOiAxLCBuYW1lOifQntC20LjQtNCw0LXRgid9LFxyXG4gICAgICAgICAgICAgICAge2lkOiAyLCBuYW1lOifQkiDRgNCw0LHQvtGC0LUnfSxcclxuICAgICAgICAgICAgICAgIHtpZDogMywgbmFtZTon0JLRi9C/0L7Qu9C90LXQvdC+J30sXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICAkKCcjZHRwY2tyJykuZGF0ZXBpY2tlcigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdyaWRuYW1lSnNvbkxpc3RzID0gW107XHJcbiAgICAgICAgICAgIGxldCBjdXJVc2VyID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSDQlNCQ0J3QndCr0JUg0JTQm9CvIEhUTUxcclxuICAgICAgICAgKiBAdHlwZSBPYmplY3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQGZpbmFsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdm0udGFzY2tfbGltaXQgPSAxNTtcclxuICAgICAgICB2bS5uZ0dyaWRWaWV3ID0gbnVsbDtcclxuXHJcbiAgICAgICAgdm0udXNlciA9IG51bGw7XHJcbiAgICAgICAgdm0uYWxsVXNlcnMgPSBbXTtcclxuICAgICAgICB2bS5kZWxldGVVc2VyID0gZGVsZXRlVXNlcjtcclxuXHJcbiAgICAgICAgdm0uZXhpdF9tb2RhbCA9IGV4aXRfbW9kYWw7XHJcbiAgICAgICAgdm0uc2F2ZXRhc2NrID0gc2F2ZXRhc2NrO1xyXG4gICAgICAgIHZtLmVkaXR0YXNjayA9IGVkaXR0YXNjaztcclxuICAgICAgICB2bS5kZWx0YXNjayA9IGRlbHRhc2NrO1xyXG4gICAgICAgIHZtLmFkZHRhc2NrID0gYWRkdGFzY2s7XHJcbiAgICAgICAgdm0uZGVmX2NsaWNrID0gZGVmX2NsaWNrO1xyXG4gICAgICAgIHZtLmV4cG9ydFBERiA9IGV4cG9ydFBERjtcclxuICAgICAgICB2bS5leHBvcnRDU1YgPSBleHBvcnRDU1Y7XHJcbiAgICAgICAgdm0uZ21haWwgPSBnbWFpbDtcclxuICAgICAgICB2bS5hZGRyZXNzID0gYWRkcmVzcztcclxuICAgICAgICB2bS5tYWlsQWRkcmVzcyA9ICdAZ21haWwuY29tJztcclxuICAgICAgICB2bS5maW5pc2hfbG9hZGVyID0gZmluaXNoX2xvYWRlcjtcclxuICAgICAgICB2bS5zdGFydF9sb2FkZXIgPSBzdGFydF9sb2FkZXI7XHJcbiAgICAgICAgdm0ubG9nTW9kZWxzID0gbG9nTW9kZWxzO1xyXG4gICAgICAgIHZtLm15X2FsZXJ0ID0gbXlfYWxlcnQ7XHJcbiAgICAgICAgdm0uY2hhbmdlX2xpc3QgPSBjaGFuZ2VfbGlzdDtcclxuICAgICAgICB2bS5jaGFuZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdm0ucmF3U2NyZWVucyA9IFtdO1xyXG4gICAgICAgIHZtLnNvcnRpbmdMb2cgPSBbXTtcclxuXHJcbiAgICAgICAgdm0ucmVzanNvbnRhc2tzID0gW107XHJcbiAgICAgICAgdm0ucmVzZ2V0SnNvbkxpc3RzID0gW107XHJcblxyXG4gICAgICAgIHZtLnNvcnRhYmxlT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGNvbm5lY3RXaXRoOiBcIi5hcHBzLWNvbnRhaW5lclwiLFxyXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgIGlmICgvLyBlbnN1cmUgd2UgYXJlIGluIHRoZSBmaXJzdCB1cGRhdGUoKSBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAhdWkuaXRlbS5zb3J0YWJsZS5yZWNlaXZlZCAmJlxyXG4gICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGF0IGl0cyBhbiBhY3R1YWwgbW92aW5nXHJcbiAgICAgICAgICAgICAgICAgIC8vIGJldHdlZW4gdGhlIHR3byBsaXN0c1xyXG4gICAgICAgICAgICAgICAgICB1aS5pdGVtLnNvcnRhYmxlLnNvdXJjZVswXSAhPT0gdWkuaXRlbS5zb3J0YWJsZS5kcm9wdGFyZ2V0WzBdICYmXHJcbiAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRoZSBzaXplIGxpbWl0YXRpb25cclxuICAgICAgICAgICAgICAgICAgdWkuaXRlbS5zb3J0YWJsZS5kcm9wdGFyZ2V0TW9kZWwubGVuZ3RoID49IHZtLnRhc2NrX2xpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICB1aS5pdGVtLnNvcnRhYmxlLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgLy8hISEg0J7QkdCd0J7QktCb0K/QldCcIGlkX2xpc3Qg0KMg0J/QldCg0JXQnNCV0KnQldCd0J3QntCZINCX0JDQlNCQ0KfQmCAhISFcclxuICAgICAgICAgICAgICAvLyB2YXIgc3RyID0gTnVtYmVyKHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldExpc3RbMF0uYXR0cmlidXRlcy5pZC52YWx1ZS5zbGljZSg3LDEwKSk7XHJcbiAgICAgICAgICAgICAgLy8gdWkuaXRlbS5zb3J0YWJsZS5tb2RlbC5pZF9saXN0ID0gc3RyICsgMVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdm0ucmF3U2NyZWVucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVuc1tpXS5tYXAoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh4KTtcclxuICAgICAgICAgICAgICAgICAgICB4LmlkX2xpc3QgPSBpICsgMTsgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07IFxyXG5cclxuICAgICAgICB2bS5zdGF0dXMgPSBbXHJcbiAgICAgICAgICAgIHtpZDogMSwgbmFtZTon0J7QttC40LTQsNC10YInfSxcclxuICAgICAgICAgICAge2lkOiAyLCBuYW1lOifQkiDRgNCw0LHQvtGC0LUnfSxcclxuICAgICAgICAgICAge2lkOiAzLCBuYW1lOifQktGL0L/QvtC70L3QtdC90L4nfSxcclxuICAgICAgICBdO1xyXG5cclxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuICAgICAgICBcclxuICAgICAgICAkKCcjZHRwY2tyJykuZGF0ZXBpY2tlcigpO1xyXG5cclxuICAgICAgICB2YXIgZ3JpZG5hbWVKc29uTGlzdHMgPSBbXTtcclxuICAgICAgICBsZXQgY3VyVXNlciA9IGZhbHNlO1xyXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3QmNCd0JjQptCY0JDQptCY0K89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG4gICAgICAgIC8v0JjQndCY0KbQmNCY0KDQo9CV0Jwg0JrQntCd0KLQoNCe0JvQm9CV0KBcclxuICAgICAgICBpbml0Q29udHJvbGxlcigpO1xyXG5cclxuICAgICAgICAvL9CQ0JPQoNCV0JPQkNCi0J3QkNCvINCk0KPQndCa0KbQmNCvINCY0J3QmNCm0JjQmCDQmtCe0J3QotCg0J7Qm9Cb0JXQoNCQINCh0J7QodCi0J7QmNCiINCY0Jcg0J3QldCh0JrQntCb0KzQmtCY0KUgXCLQktCr0JfQq9CS0JDQrtCp0JjQpVwiXCIg0KTQo9Cd0JrQptCY0JlcclxuICAgICAgICBmdW5jdGlvbiBpbml0Q29udHJvbGxlcigpIHtcclxuXHJcbiAgICAgICAgICAgIC8v0JfQkNCT0KDQo9CW0JDQldCcINCS0KHQldClINCu0JfQldCg0J7QkiDQpNCQ0JHQoNCY0JrQkCBVc2VyU2VydmljZVxyXG4gICAgICAgICAgICBsb2FkQWxsVXNlcnMoKTsgLy9mcm9udGVuZC9hc3NldHMvYXBwLXNlcnZpY2VzL3VzZXIuc2VydmljZS5qc1xyXG5cclxuICAgICAgICAgICAgLy8g0JjQnNCf0J7QoNCi0JjQoNCj0JXQnCDQodCf0JjQodCe0Jog0JvQmNCh0KLQntCSINCk0JDQkdCg0JjQmtCQIFVzZXJTZXJ2aWNlXHJcbiAgICAgICAgICAgIGdldEpzb25MaXN0cygpOyAvL2Zyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvanNvbl9zZXJ2aWNlLmpzXHJcblxyXG4gICAgICAgICAgICAvL9CY0JzQn9Ce0KDQotCY0KDQo9CV0Jwg0KHQn9CY0KHQntCaINCX0JDQlNCQ0Kcg0KTQkNCR0KDQmNCa0JAgVXNlclNlcnZpY2UgXHJcbiAgICAgICAgICAgIGdldEpzb25UYXNrcygpOyAvL2Zyb250ZW5kL2Fzc2V0cy9hcHAtc2VydmljZXMvanNvbl9zZXJ2aWNlLmpzXHJcblxyXG4gICAgICAgICAgICAvLyDQmNCc0J/QntCg0KLQmNCg0KPQldCcINCh0J/QmNCh0J7QmiDQmNCc0JXQnSDQodCi0J7Qm9CR0KbQntCSINCT0KDQmNCU0JBcclxuICAgICAgICAgICAgZ2V0SnNvbkdyaWRuYW1lKCk7ICAgXHJcblxyXG4gICAgICAgICAgICAvL9CX0JDQk9Cg0KPQltCQ0JXQnCDQotCV0JrQo9Cp0JXQk9CeINCu0JfQldCg0JAgKyDQodCe0JfQlNCQ0JXQnCDQodCe0JTQldCg0JbQmNCc0J7QlSDQlNCb0K8g0JTQoNCQ0JPQvdCU0KDQntCfINCb0JjQodCi0J7QklxyXG4gICAgICAgICAgICBjcmVhdGVTaGVldHModm0ucmVzZ2V0SnNvbkxpc3RzKTtcclxuICAgICAgICB9OyBcclxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT3QntCf0JXQoNCQ0KLQmNCS0J3Qq9CVINCk0KPQndCa0KbQmNCYPT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCY0JzQn9Ce0KDQotCQINCh0J/QmNCh0JrQkCDQmNCc0JXQnSDQn9Ce0JvQldCZINCT0KDQmNCU0JBcclxuICAgICAgICBmdW5jdGlvbiBnZXRKc29uR3JpZG5hbWUoKXtcclxuICAgICAgICAgICAgZ3JpZG5hbWVKc29uTGlzdHMgPSBIb21lU2VydmljZS5nZXRSZXN1bHRGcm9tSnNvbignZGIvZ3JpZG5hbWUuanNvbicpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQmNCc0J/QntCg0KLQkCDQodCf0JjQodCa0JAg0JvQmNCh0KLQntCSXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SnNvbkxpc3RzKCl7XHJcbiAgICAgICAgICAgIHZtLnJlc2dldEpzb25MaXN0cyA9IEhvbWVTZXJ2aWNlLmdldFJlc3VsdEZyb21Kc29uKCdkYi9saXN0c05hbWUuanNvbicpXHJcbiAgICAgICAgICAgIEhvbWVTZXJ2aWNlLmxpc3QgPSB2bS5yZXNnZXRKc29uTGlzdHM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQmNCc0J/QntCg0KLQkCDQodCf0JjQodCa0JAg0JfQkNCU0JDQp1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEpzb25UYXNrcygpe1xyXG4gICAgICAgICAgICB2bS5yZXNqc29udGFza3MgPSBIb21lU2VydmljZS5nZXRSZXN1bHRGcm9tSnNvbignZGIvdGFza3MuanNvbicpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIG1ha2VMaXN0IChpZF9saXN0KTo8YnI+XHJcbiAgICAgICAgICog0JLQntCX0JLQoNCQ0KnQkNCV0KIg0J7QotCk0JjQm9Cs0KLQoNCe0JLQkNCd0J3Qq9CZINCf0J4g0J/QntCb0K/QnDogaWRfbGlzdC9pZF91c2VyINCc0JDQodCh0JjQkiDQl9CQ0JTQkNCnPGJyPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYWtlTGlzdCAoaWRfbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJfcmVzanNvbnRhc2tzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm0udXNlci5pZCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcl9yZXNqc29udGFza3MgPSB2bS5yZXNqc29udGFza3MuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZF9saXN0ID09IGlkX2xpc3QgJiYgaXRlbS5pZF91c2VyID09IHZtLnVzZXIuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJfcmVzanNvbnRhc2tzID0gdm0ucmVzanNvbnRhc2tzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWRfbGlzdCA9PSBpZF9saXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcl9yZXNqc29udGFza3M7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgKiBAbWV0aG9kIG1ha2VMaXN0XHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpZF9saXN0IElEINCb0JjQodCi0JBcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGZpbHRlcl9yZXNqc29udGFza3NcclxuICAgICAgICAgKi8gXHJcbiAgICAgICAgZnVuY3Rpb24gbWFrZUxpc3QgKGlkX2xpc3QpIHtcclxuICAgICAgICAgICAgdmFyIGZpbHRlcl9yZXNqc29udGFza3MgPSBbXTtcclxuICAgICAgICAgICAgaWYodm0udXNlci5pZCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJfcmVzanNvbnRhc2tzID0gdm0ucmVzanNvbnRhc2tzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWRfbGlzdCA9PSBpZF9saXN0ICYmIGl0ZW0uaWRfdXNlciA9PSB2bS51c2VyLmlkKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJfcmVzanNvbnRhc2tzID0gdm0ucmVzanNvbnRhc2tzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWRfbGlzdCA9PSBpZF9saXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyX3Jlc2pzb250YXNrcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0JsgY3JlYXRlU2hlZXRzIChyZXNnZXRKc29uTGlzdHMpOjxicj5cclxuICAgICAgICAgKiDQptCY0JrQm9Ce0Jwg0KHQntCX0JTQkNCu0KLQodCvINCb0JjQodCi0KsuINCb0JjQodCi0JDQnCDQn9Cg0JjQodCS0JDQmNCS0JDQldCi0KHQryDQmNCc0K8g0JggSUQ8YnI+INCh0J7Ql9CU0JDQndCd0KvQlSDQm9CY0KHQotCrINCU0J7QkdCQ0JLQm9Cv0K7QotCh0K8g0JIg0JzQkNCh0KHQmNCSIHZtLnJhd1NjcmVlbnNcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlU2hlZXRzKHJlc2dldEpzb25MaXN0cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWN1clVzZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVc2VyU2VydmljZS5HZXRCeVVzZXJuYW1lKCRyb290U2NvcGUuZ2xvYmFscy5jdXJyZW50VXNlci51c2VybmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VyJywgdXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS51c2VyID0gdXNlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgcmVzZ2V0SnNvbkxpc3RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSA9IG1ha2VMaXN0KHJlc2dldEpzb25MaXN0c1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0ubmFtZSA9IHJlc2dldEpzb25MaXN0c1tpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnJhd1NjcmVlbnMucHVzaCh2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyVXNlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL9Ch0J7Ql9CU0JDQgdCcINCT0KDQmNCUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCByZXNnZXRKc29uTGlzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0gPSBtYWtlTGlzdChyZXNnZXRKc29uTGlzdHNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0ubmFtZSA9IHJlc2dldEpzb25MaXN0c1tpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVucy5wdXNoKHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgKiDQn9Cg0Jgg0J/QldCg0JLQntCcINCf0KDQntCl0J7QlNCVINCh0J7Ql9CU0JDQldCcINCT0KDQmNCUIFxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlU2hlZXRzXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHJlc2dldEpzb25MaXN0cyDQnNCQ0KHQodCY0JIg0JjQnNCV0J0g0JvQmNCh0KLQntCSXHJcbiAgICAgICAgICovIFxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0KHQntCX0JTQkNCd0JjQryDQm9CY0KHQotCe0JJcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTaGVldHMocmVzZ2V0SnNvbkxpc3RzKXtcclxuICAgICAgICAgICAgaWYoIWN1clVzZXIpe1xyXG4gICAgICAgICAgICAgICAgVXNlclNlcnZpY2UuR2V0QnlVc2VybmFtZSgkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXIudXNlcm5hbWUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VyJywgdXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCByZXNnZXRKc29uTGlzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSA9IG1ha2VMaXN0KHJlc2dldEpzb25MaXN0c1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdLm5hbWUgPSByZXNnZXRKc29uTGlzdHNbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVucy5wdXNoKHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1clVzZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v0KHQntCX0JTQkNCB0Jwg0JPQoNCY0JRcclxuICAgICAgICAgICAgICAgICAgICBpbml0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCByZXNnZXRKc29uTGlzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdID0gbWFrZUxpc3QocmVzZ2V0SnNvbkxpc3RzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXS5uYW1lID0gcmVzZ2V0SnNvbkxpc3RzW2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucmF3U2NyZWVucy5wdXNoKHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g0KTQo9Cd0JrQptCY0J7QndCQ0JsgaW5pdEdyaWQgKCk6PGJyPlxyXG4gICAgICAgICAqIDEuIHZtLm5nR3JpZFZpZXcgLSDQntCi0J7QkdCg0JDQltCQ0JXQoiDQk9Cg0JjQlCDQkiBIVE1MPGJyPlxyXG4gICAgICAgICAqIDIuIHZtLnN0YXR1cyAtINCc0JDQodCh0JjQkiDQodCi0JDQotCj0KHQntCSINCX0JDQlNCQ0KfQmCAobXlDZWxUZW1wMSAtIFNFTEVDVCDQmNCXIHZtLnN0YXR1cyk8YnI+XHJcbiAgICAgICAgICogMy4gdm0uZHJhZ25kcm9wX2xpc3QgLSDQnNCQ0KHQodCY0JIg0JvQmNCh0KLQntCSIChteUNlbFRlbXAyIC0gU0VMRUNUINCY0Jcgdm0uZHJhZ25kcm9wX2xpc3QpIDxicj5cclxuICAgICAgICAgKiA0LiDQktCr0JLQntCUINCf0J7Qm9CV0Jkg0JIgR1JJRCDQn9CeINCf0J7QoNCv0JTQmtCjINCh0J7QoNCi0JjQoNCe0JLQmtCYINCf0J7Qm9CvIHNvcnQg0JzQkNCh0KHQmNCS0JAgcmlkbmFtZUpzb25MaXN0czxicj5cclxuICAgICAgICAgKiA1LiDQlNCb0K8g0J7QotCe0JHQoNCQ0JbQldCd0JjQryDQkiDQotCQ0JHQm9CY0KbQlSDQodCe0JfQlNCQ0JXQnCBcItCh0KLQoNCe0JrQntCS0KvQmSDQntCR0KrQldCa0KJcIi0gc3RyINCYINCf0KPQqNCY0Jwg0JXQk9CeINCSIGNvbHVtbkRlZnNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgdHQubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodHRbal0uaWQgIT0gXCIkJGhhc2hLZXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSAne1wiZmllbGRcIiA6IFwiJyArIHR0W2pdLmlkICsgJ1wiJyArICcsJyArICdcImRpc3BsYXlOYW1lXCIgOiBcIicgKyBncmlkbmFtZUpzb25MaXN0c1tqXS5ncmlkbmFtZSArICdcIn0nIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLnB1c2goSlNPTi5wYXJzZShzdHIpKTsgXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgKiA2LiDQodCa0KDQq9CS0JDQldCcINCf0J7Qm9CVINCV0KHQm9CYINCe0J3QniDQn9Cg0JjQodCj0KLQodCi0JLQo9CV0KIg0JIg0JzQkNCh0KHQmNCS0JUgbm90VmlzaWJsZSDQlNCb0K8g0J7QodCi0JDQm9Cs0J3Qq9ClIC0g0J/QldCg0JXQmNCc0JXQndCe0JLQq9CS0JDQldCcINCf0J7Qm9CvINCT0KDQmNCU0JBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub3RWaXNpYmxlID0gWydpZCddOy8vJ2lkX2xpc3QnXHJcblxyXG4gICAgICAgICAgICAvL9Ch0JrQoNCr0JLQkNCV0Jwg0J/QntCb0JUg0JXQodCb0Jgg0J7QndCeINCf0KDQmNCh0KPQotCh0KLQktCj0JXQoiDQkiDQnNCQ0KHQodCY0JLQlSBub3RWaXNpYmxlINCU0JvQryDQntCh0KLQkNCb0KzQndCr0KUgLSDQn9CV0KDQldCY0JzQldCd0J7QktCr0JLQkNCV0Jwg0J/QntCb0K8g0JPQoNCY0JTQkFxyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IG5vdFZpc2libGUubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLmZpZWxkID09IG5vdFZpc2libGVbal0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/QndCQ0KXQntCU0JjQnCDQn9CeIGlkIChqKSDQmNCd0JTQldCa0KEg0JfQkNCU0JDQp9CYINCSINCc0JDQodCh0JjQktCVIHZtLnJlc2pzb250YXNrc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RJbmRleCA9IGZpbmRfaW5kZXhfYnlfaWQoZ3JpZG5hbWVKc29uTGlzdHMsIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0uZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLmRpc3BsYXlOYW1lID0gZ3JpZG5hbWVKc29uTGlzdHNbZmlyc3RJbmRleF0uZ3JpZG5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0ud2lkdGggPSBncmlkbmFtZUpzb25MaXN0c1tmaXJzdEluZGV4XS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAqIDcuINCU0J7QkdCQ0JLQm9Cv0JXQnCDQmtCd0J7Qn9Ca0Jgg0KDQldCU0JDQmtCi0JjQoNCe0JLQkNCd0JjQryDQmCDQo9CU0JDQm9CV0J3QmNCvXHJcbiAgICAgICAgICogOC4g0JTQntCR0JDQktCb0K/QldCc0Jwg0KTQmNCb0KzQotCg0KsgINCYINCe0KLQnNCV0J3Qr9CV0Jwg0KTQmNCb0KzQotCg0Ksg0JTQm9CvINCa0J3QntCf0J7QmlxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBqPTA7IGogPCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImlkX2xpc3RcIiB8fCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiZXhlY3V0aW9uX3N0YXR1c1wiKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiaWRfbGlzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15RmlsdGVyID0gbXlMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15RmlsdGVyID0gbXlTdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0ciA9ICd7JyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnXCJ0eXBlXCIgOiBcInNlbGVjdFwiLCcgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1wic2VsZWN0T3B0aW9uc1wiICA6IFsgJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArIG15RmlsdGVyIFxyXG4gICAgICAgICAgICAgICAgICAgICsgJ119J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpbHRlciA9IEpTT04ucGFyc2Uoc3RyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImlkX2xpc3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmNlbGxGaWx0ZXIgPSAnaWRfbGlzdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uY2VsbEZpbHRlciA9ICdleGVjdXRpb25fc3RhdHVzJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiZWRpdFwiIHx8IHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJkZWxldGVcIikgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5lbmFibGVGaWx0ZXJpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJpZF91c2VyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmNlbGxGaWx0ZXIgPSAnaWRfdXNlcic7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRyb3BEb3duO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih2bS51c2VyLmlkID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uYWxsVXNlcnMubWFwKGl0ZW0gPT4gZHJvcERvd24gPSBkcm9wRG93biArICd7XCJ2YWx1ZVwiOiBcIicgKyBpdGVtLmlkICsgJ1wiLCBcImxhYmVsXCI6IFwiJyArIGl0ZW0udXNlcm5hbWUgKyAnXCIgfSwnKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uYWxsVXNlcnMubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5pZCA9PSB2bS51c2VyLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcERvd24gPSBkcm9wRG93biArICd7XCJ2YWx1ZVwiOiBcIicgKyBpdGVtLmlkICsgJ1wiLCBcImxhYmVsXCI6IFwiJyArIGl0ZW0udXNlcm5hbWUgKyAnXCIgfSwnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ciA9ICd7JyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnXCJ0eXBlXCIgOiBcInNlbGVjdFwiLCcgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1wic2VsZWN0T3B0aW9uc1wiICA6ICBbJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArIGRyb3BEb3duLnNsaWNlKDksLTEpIFxyXG4gICAgICAgICAgICAgICAgICAgICsgJ119JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWx0ZXIgPSBKU09OLnBhcnNlKHN0cik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAqIEBtZXRob2QgaW5pdEdyaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCh0J7Ql9CU0JDQndCY0K8g0JPQoNCY0JTQkFxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRHcmlkKCkge1xyXG4gICAgICAgICAgICB2bS5ncmlkT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZUdyaWRNZW51OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlQ2VsbEVkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlQ29sdW1uUmVzaXppbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVGaWx0ZXJpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaG93R3JpZEZvb3Rlcjp0cnVlLFxyXG4gICAgICAgICAgICAgICAgb25SZWdpc3RlckFwaTogZnVuY3Rpb24oZ3JpZEFwaSl7XHJcbiAgICAgICAgICAgICAgICAgIHZtLmdyaWRBcGkgPSBncmlkQXBpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbkRlZnM6IFtdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgc3RyO1xyXG5cclxuICAgICAgICAgICAgLyog0KHQntCg0KLQmNCg0KPQldCcIGdyaWRuYW1lSnNvbkxpc3RzINCU0JvQryDQntCi0J7QkdCg0JDQltCV0J3QmNCvINCh0KLQntCb0JHQptCe0JIg0JfQkNCU0JDQpyDQkiDQodCe0J7QotCS0JXQotCh0KLQktCY0JUg0KEg0J/QntCb0JXQnCBzb3J0IGdyaWRuYW1lSnNvbkxpc3RzICovXHJcbiAgICAgICAgICAgIGxldCB0dCA9IGdyaWRuYW1lSnNvbkxpc3RzLnNvcnQoKGEsYikgPT4gYS5zb3J0IC0gYi5zb3J0KTtcclxuXHJcbiAgICAgICAgICAgIC8q0JTQm9CvINCe0KLQntCR0KDQkNCW0JXQndCY0K8g0JIg0KLQkNCR0JvQmNCm0JUg0KHQntCX0JTQkNCV0JwgXCLQodCi0KDQntCa0J7QktCr0Jkg0J7QkdCq0JXQmtCiXCItIHN0clxyXG4gICAgICAgICAgICDQmCDQn9Cj0KjQmNCcINCV0JPQniDQkiBjb2x1bW5EZWZzKi9cclxuICAgICAgICAgICAgZm9yKGxldCBqPTA7IGogPCB0dC5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0dFtqXS5pZCAhPSBcIiQkaGFzaEtleVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9ICd7XCJmaWVsZFwiIDogXCInICsgdHRbal0uaWQgKyAnXCInICsgJywnICsgJ1wiZGlzcGxheU5hbWVcIiA6IFwiJyArIGdyaWRuYW1lSnNvbkxpc3RzW2pdLmdyaWRuYW1lICsgJ1wifScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnMucHVzaChKU09OLnBhcnNlKHN0cikpOyBcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgbm90VmlzaWJsZSA9IFsnaWQnXTsvLydpZF9saXN0J1xyXG5cclxuICAgICAgICAgICAgLy/QodCa0KDQq9CS0JDQldCcINCf0J7Qm9CVINCV0KHQm9CYINCe0J3QniDQn9Cg0JjQodCj0KLQodCi0JLQo9CV0KIg0JIg0JzQkNCh0KHQmNCS0JUgbm90VmlzaWJsZSDQlNCb0K8g0J7QodCi0JDQm9Cs0J3Qq9ClIC0g0J/QldCg0JXQmNCc0JXQndCe0JLQq9CS0JDQldCcINCf0J7Qm9CvINCT0KDQmNCU0JBcclxuICAgICAgICAgICAgZm9yKGxldCBqPTA7IGogPCBub3RWaXNpYmxlLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS5maWVsZCA9PSBub3RWaXNpYmxlW2pdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v0J3QkNCl0J7QlNCY0Jwg0J/QniBpZCAoaikg0JjQndCU0JXQmtChINCX0JDQlNCQ0KfQmCDQkiDQnNCQ0KHQodCY0JLQlSB2bS5yZXNqc29udGFza3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpcnN0SW5kZXggPSBmaW5kX2luZGV4X2J5X2lkKGdyaWRuYW1lSnNvbkxpc3RzLCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLmZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS5kaXNwbGF5TmFtZSA9IGdyaWRuYW1lSnNvbkxpc3RzW2ZpcnN0SW5kZXhdLmdyaWRuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLndpZHRoID0gZ3JpZG5hbWVKc29uTGlzdHNbZmlyc3RJbmRleF0ud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLyrQlNCe0JHQkNCS0JvQr9CV0Jwg0JrQndCe0J/QmtCjINCg0JXQlNCQ0JrQotCY0KDQntCS0JDQndCY0K8qL1xyXG4gICAgICAgICAgICBsZXQgY2hlID0gJzxpIGNsYXNzPVxcJ2ZhIGZhLXBlbmNpbC1zcXVhcmUtbyBidG4gYnRuLXN1Y2Nlc3MgYnRuLXNtXFwnIG5nLWNsaWNrPVxcJ2dyaWQuYXBwU2NvcGUudm0ubXlfYWxlcnQocm93LmVudGl0eS5pZCxyb3cuZW50aXR5LmlkX2xpc3QsMSlcXCc+PC9pPlwiJztcclxuICAgICAgICAgICAgc3RyID0ne1wiZmllbGRcIjogXCJlZGl0XCIsIFwiZW5hYmxlU29ydGluZ1wiOiBmYWxzZSwgXCJkaXNwbGF5TmFtZVwiOiBcIi4uLlwiLCBcIndpZHRoXCI6IDM4LCBcImNlbGxUZW1wbGF0ZVwiOiBcIicgKyBjaGUgKyAnfSdcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3RyKTsgXHJcbiAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnMucHVzaChKU09OLnBhcnNlKHN0cikpO1xyXG5cclxuICAgICAgICAgICAgLyrQlNCe0JHQkNCS0JvQr9CV0Jwg0JrQndCe0J/QmtCjINCj0JTQkNCb0JXQndCY0K8qL1xyXG4gICAgICAgICAgICBjaGUgPSAnPGRpdj48aSBjbGFzcz1cXCdmYSBmYS10cmFzaC1vIGJ0biBidG4tZGFuZ2VyIGJ0bi1zbVxcJyBuZy1jbGljaz1cXCdncmlkLmFwcFNjb3BlLnZtLm15X2FsZXJ0KHJvdy5lbnRpdHkuaWQscm93LmVudGl0eS5pZF9saXN0LDApXFwnPjwvZGl2PlwiJztcclxuICAgICAgICAgICAgc3RyID0ne1wiZmllbGRcIjogXCJkZWxldGVcIiwgXCJlbmFibGVTb3J0aW5nXCI6IGZhbHNlLCBcImRpc3BsYXlOYW1lXCI6IFwiLi4uXCIsIFwid2lkdGhcIjogMzgsIFwiY2VsbFRlbXBsYXRlXCI6IFwiJyArIGNoZSArICd9J1xyXG4gICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLnB1c2goSlNPTi5wYXJzZShzdHIpKTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgbXlMaXN0ID0gJ3tcInZhbHVlXCI6IFwiMVwiLCBcImxhYmVsXCI6IFwi0J/Qu9Cw0L1cIiB9LCB7IFwidmFsdWVcIjogXCIyXCIsIFwibGFiZWxcIjogXCLQkiDQv9GA0L7RhtC10YHRgdC1XCIgfSwgeyBcInZhbHVlXCI6IFwiM1wiLCBcImxhYmVsXCI6IFwi0JPQvtGC0L7QstC+XCJ9J1xyXG4gICAgICAgICAgICBsZXQgbXlTdGF0dXMgPSAne1widmFsdWVcIjogXCIxXCIsIFwibGFiZWxcIjogXCLQntC20LjQtNCw0LXRglwiIH0sIHsgXCJ2YWx1ZVwiOiBcIjJcIiwgXCJsYWJlbFwiOiBcItCSINGA0LDQsdC+0YLQtVwiIH0sIHsgXCJ2YWx1ZVwiOiBcIjNcIiwgXCJsYWJlbFwiOiBcItCS0YvQv9C+0LvQvdC10L3QvlwifSdcclxuICAgICAgICAgICAgbGV0IG15RmlsdGVyO1xyXG5cclxuICAgICAgICAgICAgLy/QlNCe0JHQkNCS0JvQr9CV0JzQnCDQpNCY0JvQrNCi0KDQqyAg0Jgg0J7QotCc0JXQndCv0JXQnCDQpNCY0JvQrNCi0KDQqyDQlNCb0K8g0JrQndCe0J/QntCaXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJpZF9saXN0XCIgfHwgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImV4ZWN1dGlvbl9zdGF0dXNcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImlkX2xpc3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBteUZpbHRlciA9IG15TGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBteUZpbHRlciA9IG15U3RhdHVzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdHIgPSAneycgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1widHlwZVwiIDogXCJzZWxlY3RcIiwnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArICdcInNlbGVjdE9wdGlvbnNcIiAgOiBbICdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBteUZpbHRlciBcclxuICAgICAgICAgICAgICAgICAgICArICddfSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWx0ZXIgPSBKU09OLnBhcnNlKHN0cik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJpZF9saXN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5jZWxsRmlsdGVyID0gJ2lkX2xpc3QnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmNlbGxGaWx0ZXIgPSAnZXhlY3V0aW9uX3N0YXR1cyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImVkaXRcIiB8fCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiZGVsZXRlXCIpIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZW5hYmxlRmlsdGVyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJpZF91c2VyXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmNlbGxGaWx0ZXIgPSAnaWRfdXNlcic7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGRyb3BEb3duO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICBpZih2bS51c2VyLmlkID09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdm0uYWxsVXNlcnMubWFwKGl0ZW0gPT4gZHJvcERvd24gPSBkcm9wRG93biArICd7XCJ2YWx1ZVwiOiBcIicgKyBpdGVtLmlkICsgJ1wiLCBcImxhYmVsXCI6IFwiJyArIGl0ZW0udXNlcm5hbWUgKyAnXCIgfSwnKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdm0uYWxsVXNlcnMubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYoaXRlbS5pZCA9PSB2bS51c2VyLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgZHJvcERvd24gPSBkcm9wRG93biArICd7XCJ2YWx1ZVwiOiBcIicgKyBpdGVtLmlkICsgJ1wiLCBcImxhYmVsXCI6IFwiJyArIGl0ZW0udXNlcm5hbWUgKyAnXCIgfSwnXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHN0ciA9ICd7JyBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgKyAnXCJ0eXBlXCIgOiBcInNlbGVjdFwiLCcgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICsgJ1wic2VsZWN0T3B0aW9uc1wiICA6ICBbJ1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICArIGRyb3BEb3duLnNsaWNlKDksLTEpIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICsgJ119JztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWx0ZXIgPSBKU09OLnBhcnNlKHN0cik7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZWZyZXNoX2dyaWQoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2bS5nZXRQcm9kdWN0TGlzdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5kYXRhID0gdm0ucmVzdWx0U2ltdWxhdGVkRGF0YTtcclxuICAgICAgICAgICAgdm0ubXlTZWxlY3RlZFJvd3MgPSB2bS5ncmlkQXBpLnNlbGVjdGlvbi5nZXRTZWxlY3RlZFJvd3MoKTsgLy88LS1Qcm9wZXJ0eSB1bmRlZmluZWQgZXJyb3IgaGVyZVxyXG5cclxuICAgICAgICAgICAgaWYgKHZtLm15U2VsZWN0ZWRSb3dzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWw7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHZtLm15U2VsZWN0ZWRSb3dzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBhbCA9IGFsICsn0JLRi9Cx0YDQsNC90L4gOiAnICsgKGkgKyAxKSArICcg0JjQlCA9ICcgKyB2bS5teVNlbGVjdGVkUm93c1tpXS5pZCArICcsINCb0LjRgdGCID0gJyArIHZtLm15U2VsZWN0ZWRSb3dzW2ldLmlkX2xpc3QgKyAnLlxcbidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFsZXJ0KGFsLnNsaWNlKDkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfQndC40YfQtdCz0L4g0L3QtSDQstGL0LHRgNCw0L3QvicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBpZiAodm0uZ3JpZEFwaS5zZWxlY3Rpb24uc2VsZWN0ZWRSb3cpIHtcclxuICAgICAgICAgICAgICAgICAgdm0uZ3JpZEFwaS5zZWxlY3Rpb24uc2VsZWN0Um93KHZtLmdyaWRPcHRpb25zLmRhdGFbMF0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbXlfYWxlcnQgKGlkLCBsLCB0eXBlPSdkZWYnKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZtLmFsbFVzZXJzKTtcclxuICAgICAgICAgICAgaWYodHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWx0YXNjayAobCwgaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy/QndCQ0JnQotCYINCd0J7QnNCV0KAg0L8u0L8uINCt0KLQniDQndCj0JbQndCeINCi0J7Qm9Cs0JrQniDQlNCb0K8g0JDQn9CU0JXQmdCi0JAg0JTQntCR0JDQktCb0JXQndCd0KvQpSDQl9CQ0JTQkNCnXHJcbiAgICAgICAgICAgICAgICBsZXQgbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHZtWydsaXN0XycgKyBsXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm1bJ2xpc3RfJyArIGxdW2ldLmlkID09IGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGVkaXR0YXNjayAobCwgaWQsIG4pO1xyXG4gICAgICAgICAgICB9OyAgIFxyXG4gICAgICAgIH07XHJcbiAgICAgIFxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JLQq9CS0J7QlNCQINCh0J7QlNCV0KDQltCY0JzQntCT0J4g0JvQmNCh0KLQntCSIFxyXG4gICAgICAgIGZ1bmN0aW9uIGxvZ01vZGVscyAoKSB7XHJcbiAgICAgICAgICAgIHZtLnNvcnRpbmdMb2cgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2bS5yYXdTY3JlZW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGxvZ0VudHJ5ID0gdm0ucmF3U2NyZWVuc1tpXS5tYXAoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4LnRpdGxlICsgJy0nICsgeC5pZF9saXN0ICsgJ3wnO1xyXG4gICAgICAgICAgICAgIH0pLmpvaW4oJywgJyk7XHJcbiAgICAgICAgICAgICAgbG9nRW50cnkgPSAnY29udGFpbmVyICcgKyAoaSsxKSArICc6ICcgKyBsb2dFbnRyeTtcclxuICAgICAgICAgICAgICB2bS5zb3J0aW5nTG9nLnB1c2gobG9nRW50cnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQo9CU0JDQm9CV0J3QmNCvINCX0JDQlNCQ0KfQmCDQmNCXINCb0JjQodCi0JAoIdCU0JvQryDQrdCi0J7QmSDQl9CQ0JTQkNCn0Jgg0J3Qo9CW0J3QniDQn9Ce0JTQmtCb0K7Qp9CY0KLQrCBMT0RBU0ggISEhKVxyXG4gICAgICAgIGZ1bmN0aW9uIGRlbHRhc2NrIChpLCBqKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIC8vIHZtWydsaXN0XycgKyBpXS5zcGxpY2UoaiwgMSk7XHJcbiAgICAgICAgICAgIHZtWydsaXN0XycgKyBpXS5zcGxpY2UoXy5pbmRleE9mKHZtWydsaXN0XycgKyBpXSwgXy5maW5kKHZtWydsaXN0XycgKyBpXSwgZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uaWQgPT09IGo7IH0pKSwgMSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih2bS51c2VyLmlkICE9IDEpIHtcclxuICAgICAgICAgICAgICAgIHZtLnJlc2pzb250YXNrcy5zcGxpY2UoXy5pbmRleE9mKHZtLnJlc2pzb250YXNrcywgXy5maW5kKHZtLnJlc2pzb250YXNrcywgZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uaWQgPT09IGo7IH0pKSwgMSk7XHJcbiAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5kYXRhID0gdm0ucmVzanNvbnRhc2tzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWRfdXNlciA9PSB2bS51c2VyLmlkKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2bS5yZXNqc29udGFza3Muc3BsaWNlKF8uaW5kZXhPZih2bS5yZXNqc29udGFza3MsIF8uZmluZCh2bS5yZXNqc29udGFza3MsIGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmlkID09PSBqOyB9KSksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVmcmVzaF9yYXdTY3JlZW5zKCl7XHJcbiAgICAgICAgICAgIHZtLnJhd1NjcmVlbnMgPSBbXTtcclxuICAgICAgICAgICAgY3JlYXRlU2hlZXRzKHZtLnJlc2dldEpzb25MaXN0cyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVmcmVzaF9ncmlkKCl7XHJcbiAgICAgICAgICAgIGlmKHZtLnVzZXIuaWQgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuZGF0YSA9IHZtLnJlc2pzb250YXNrcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkX3VzZXIgPT0gdm0udXNlci5pZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuZGF0YSA9IHZtLnJlc2pzb250YXNrc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHRhc2NrX2NvdW50ID0gMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIGFkZHRhc2NrIChpKTo8YnI+XHJcbiAgICAgICAgICogMS4g0KTQntCg0JzQmNCg0KPQldCiINCY0Jcg0KHQotCg0J7QmtCYINCe0JHQqtCV0JrQoi3Ql9CQ0JTQkNCn0KM8YnI+IFxyXG4gICAgICAgICAqIDIuINCU0J7QkdCQ0JLQm9Cv0JXQoiDQntCR0KrQldCa0KIg0JIgdm0ucmVzanNvbnRhc2tzIDxicj5cclxuICAgICAgICAgKiAzLiDQntCR0J3QntCS0JvQr9CV0KIgdm0ucmF3U2NyZWVucyDQmCDQk9Cg0JjQlFxyXG4gICAgICAgICAqIEBtZXRob2QgYWRkdGFzY2tcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGkg0J3QntCc0JXQoCDQm9CY0KHQotCQIERSQUcmRFJPUFxyXG4gICAgICAgICAqLyBcclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCU0J7QkdCQ0JLQm9CV0J3QmNCvINCX0JDQlNCQ0KfQmCBcclxuICAgICAgICBmdW5jdGlvbiBhZGR0YXNjayAoaSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodm1bJ2xpc3RfJyArIGldLmxlbmd0aCA8IHZtLnRhc2NrX2xpbWl0KXtcclxuICAgICAgICAgICAgICAgIHZhciBhZGRUYXNjayA9IHZtLnJlc2pzb250YXNrc1swXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL9Ch0J7Ql9CU0JDQldCcIFwi0KHQotCg0J7QmtCe0JLQq9CZINCe0JHQqtCV0JrQolwiLSBzdHIg0JTQm9CvINCU0JDQm9Cs0J3QldCZ0KjQldCT0J4gSlNPTi5wYXJzZShzdHIpXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyID0neyc7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgaW4gYWRkVGFzY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihrICE9IFwiaWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihrID09IFwidGl0bGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJ1wiJyArIGsgKyAnXCInICArICc6IFwiTmV3VGFzY2sgJyArIGkgKyB0YXNja19jb3VudCArICdcIiwnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoayA9PSBcImlkX2xpc3RcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJ1wiJyArIGsgKyAnXCInICArICc6ICcgKyAgTnVtYmVyKGkpICsgJywnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihrID09IFwiaWRfdXNlclwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnXCInICsgayArICdcIicgICsgJzogJyArICB2bS51c2VyLmlkICsgJywnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihrID09IFwiZGVzY3JpcHRpb25cIiB8fCBrID09IFwiZGF0ZVwiKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoayA9PSBcImRhdGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICdcIicgKyBrICsgJ1wiJyArICcgOiBcIjA4LjEyLjIwMTdcIicgKyAnLCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtzdHIgPSBzdHIgKyAnXCInICsgayArICdcIicgKyAnIDogXCIxXCInICsgJywnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoayAhPSBcIiQkaGFzaEtleVwiKSBzdHIgPSBzdHIgKyAnXCInICsgayArICdcIicgKyAnIDogMScgKyAnLCcgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICdcImlkXCIgOiAnICsgTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgKyAnLCcgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZSgwLC0xKVxyXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJ30nO1xyXG5cclxuICAgICAgICAgICAgICAgIHZtLnJlc2pzb250YXNrcy5wdXNoKEpTT04ucGFyc2Uoc3RyKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaF9yYXdTY3JlZW5zKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaF9ncmlkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFzY2tfY291bnQrK1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIGVkaXR0YXNjayAoaSwgaiwgdF9pbmRleCk6PGJyPlxyXG4gICAgICAgICAqINCe0KLQmtCg0KvQotCY0JUg0JfQkNCU0JDQp9CYINCU0JvQryDQn9Ce0JTQoNCe0JHQndCe0JPQniDQn9Cg0J7QodCc0J7QotCg0JAg0Jgg0JLQntCX0JzQntCW0J3QntCT0J4g0KDQldCU0JDQmtCi0JjQoNCe0JLQkNCd0JjQr1xyXG4gICAgICAgICAqIEBtZXRob2QgZWRpdHRhc2NrXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpINCd0J7QnNCV0KAg0JvQmNCh0KLQkCBEUkFHJkRST1BcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGogaWQg0JfQkNCU0JDQp9CYXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0X2luZGV4INCf0J7QoNCv0JTQmtCe0JLQq9CZINCd0J7QnNCV0KAg0JfQkNCU0JDQp9CYINCSIERSQUcmRFJPUFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0J/QoNCe0KHQnNCe0KLQoNCQINCX0JDQlNCQ0KfQmCBcclxuICAgICAgICBmdW5jdGlvbiBlZGl0dGFzY2sgKGksIGosIHRfaW5kZXgpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy/QpNCY0JvQrNCi0KDQo9CV0Jwg0J/QniDQm9CY0KHQotCjINCYINCY0JQg0JfQkNCU0JDQp9CYXHJcbiAgICAgICAgICAgIGxldCBmID0gXy5maW5kKHZtWydsaXN0XycgKyBpXSwgZnVuY3Rpb24gKGl0ZW0peyByZXR1cm4gaXRlbS5pZCA9PT0gajt9KTtcclxuXHJcbiAgICAgICAgICAgIC8v0JLQodCVIFwi0JrQm9Cu0KfQmFwiINChINCU0JDQndCd0KvQnNCYINCX0JDQk9Ce0J3Qr9CV0Jwg0JIg0J/QldCg0JXQnNCV0J3QndCr0JUg0KTQntCg0JzQq1xyXG4gICAgICAgICAgICBmb3IobGV0IGsgaW4gZikge1xyXG4gICAgICAgICAgICAgICAgdm1bJ2h0bWxfJyArIGtdID0gZltrXTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdm1bJ2h0bWxfdF9pbmRleCddID0gdF9pbmRleCArIDE7XHJcblxyXG4gICAgICAgICAgICAvL9Ce0KLQmtCg0KvQktCQ0JXQnNCcINCU0JjQkNCb0J7Qk9Ce0JLQntCVINCe0JrQndCeXHJcbiAgICAgICAgICAgICQoXCIjb3Blbk1vZGFsXCIpLmZhZGVUb2dnbGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VfbGlzdCgpe1xyXG4gICAgICAgICAgICB2bS5jaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIGZpbmRfaW5kZXhfYnlfaWQoc291cmNlLCBpZCkgOjxicj5cclxuICAgICAgICAgKiDQn9Ce0JjQodCaINCY0J3QlNCV0JrQodCQINCX0JDQlNCQ0KfQmCDQkiDQnNCQ0KHQodCY0JLQlSDQn9CV0KDQldCU0JDQndCd0J7Qk9CeINCe0JHQqtCV0JrQotCQIC0gc291cmNlINCf0J4g0J/QldCg0JXQlNCQ0J3QndCe0JzQoyBpZFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZmluZF9pbmRleF9ieV9pZChzb3VyY2UsaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleGVzID0gJC5tYXAoc291cmNlLCBmdW5jdGlvbihvYmosIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvYmouaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgKiBAbWV0aG9kIGZpbmRfaW5kZXhfYnlfaWRcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlINCc0JDQodCh0JjQkiDQntCR0KrQldCa0KLQntCSXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCBpZCDQl9CQ0JTQkNCn0JhcclxuICAgICAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSDQndCQ0JnQlNCV0J3QndCr0Jkg0JjQndCU0JXQmtChXHJcbiAgICAgICAgICovIFxyXG4gICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCf0J7QmNCh0JrQkCDQn9CeINCY0JRcclxuICAgICAgICBmdW5jdGlvbiBmaW5kX2luZGV4X2J5X2lkKHNvdXJjZSxpZCl7XHJcbiAgICAgICAgICAgIGxldCBpbmRleGVzID0gJC5tYXAoc291cmNlLCBmdW5jdGlvbihvYmosIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYob2JqLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgcmV0dXJuIGluZGV4ZXNbMF07XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBtZXRob2Qgc2F2ZXRhc2NrXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIHNhdmV0YXNjaygpIDo8YnI+XHJcbiAgICAgICAgICogMS4g0J/QntCY0KHQmiDQmNCd0JTQldCa0KHQkCDQl9CQ0JTQkNCn0Jgg0JIg0JzQkNCh0KHQmNCS0JUgdm0ucmVzanNvbnRhc2tzPGJyPiBcclxuICAgICAgICAgKiAyLiDQntCR0J3QntCS0JvQldCd0JjQlSDQn9Ce0JvQldCZINCSINCX0JDQlNCQ0KfQlSAo0JjQlyDQnNCQ0KHQodCY0JLQkCB2bS5yZXNqc29udGFza3MpPGJyPlxyXG4gICAgICAgICAqIDMuINCV0KHQm9CYINCR0KvQmyDQmNCX0JzQldCd0JXQnSDQodCi0JDQotCj0KEg0JfQkNCU0JDQp9CYIC0g0J7QkdCd0J7QktCb0JXQndCY0JUg0JzQkNCh0KHQmNCS0JAgdm0ucmF3U2NyZWVuczxicj5cclxuICAgICAgICAgKi8gXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQodCe0KXQoNCQ0J3QldCd0JjQryDQl9CQ0JTQkNCn0JhcclxuICAgICAgICBmdW5jdGlvbiBzYXZldGFzY2sgKGksIGosIHRfaW5kZXgpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYoY29uZmlybShcItCh0L7RhdGA0LDQvdC40YLRjD9cIikgPT0gdHJ1ZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/QndCQ0KXQntCU0JjQnCDQn9CeIGlkIChqKSDQmNCd0JTQldCa0KEg0JfQkNCU0JDQp9CYINCSINCc0JDQodCh0JjQktCVIHZtLnJlc2pzb250YXNrc1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0SW5kZXggPSBmaW5kX2luZGV4X2J5X2lkKHZtLnJlc2pzb250YXNrcywgaik7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrIGluIHZtLnJlc2pzb250YXNrc1swXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGsgIT0gXCIkJGhhc2hLZXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihrID09IFwiZGF0ZVwiIHx8IGsgPT0gXCJ0aXRsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihrID09IFwiZGF0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzW2ZpcnN0SW5kZXhdW1wiZGF0ZVwiXSA9ICAkKCcjZHRwY2tyJylbMF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5yZXNqc29udGFza3NbZmlyc3RJbmRleF1bXCJ0aXRsZVwiXSA9ICQoJyN0dGwnKVswXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygkKCcjdHRsJylbMF0udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5yZXNqc29udGFza3NbZmlyc3RJbmRleF1ba10gPSB2bVsnaHRtbF8nICsga107ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKj8g0KHQn9CV0KbQmNCQ0JvQrNCd0J4g0JTQm9CvINCe0JHQndCe0JLQm9CV0J3QmNCvICEhISDQotCe0JvQrNCa0J4g0JTQntCR0JDQktCb0JXQndCd0KvQpSDQl9CQ0JTQkNCnINCSIGRyYWcmZHJvcCAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2bVsnbGlzdF8nICsgaV1bdF9pbmRleCAtIDFdW2tdID0gdm1bJ2h0bWxfJyArIGtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZtLmNoYW5nZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2bS5jaGFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hfcmF3U2NyZWVucygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoX2dyaWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdm0uY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codm0uY2hhbmdlKTsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZtLnJlc2pzb250YXNrcyk7XHJcbiAgICAgICAgICAgICQoXCIubW9kYWxEaWFsb2dcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRlKCl7XHJcbiAgICAgICAgICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBkZCA9IHRvZGF5LmdldERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIG1tID0gdG9kYXkuZ2V0TW9udGgoKSsxOyAvL0phbnVhcnkgaXMgMCFcclxuICAgICAgICAgICAgdmFyIHl5eXkgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgaWYoZGQ8MTApIHsgZGQ9JzAnK2RkIH07XHJcblxyXG4gICAgICAgICAgICBpZihtbTwxMCkgeyBtbT0nMCcrbW0gfTtcclxuXHJcbiAgICAgICAgICAgIHRvZGF5ID0gbW0rJ18nK2RkKydfJyt5eXl5O1xyXG4gICAgICAgICAgICByZXR1cm4gdG9kYXlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCt0JrQodCf0J7QoNCi0JAg0JPQoNCY0JTQkCDQkiBQREZcclxuICAgICAgICBmdW5jdGlvbiBleHBvcnRQREYgKCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2bS5ncmlkQXBpLmV4cG9ydGVyLnBkZkV4cG9ydCh1aUdyaWRFeHBvcnRlckNvbnN0YW50cy5WSVNJQkxFLCB1aUdyaWRFeHBvcnRlckNvbnN0YW50cy5WSVNJQkxFKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCt0JrQodCf0J7QoNCi0JAg0JPQoNCY0JTQkCDQkiBFWEVMXHJcbiAgICAgICAgZnVuY3Rpb24gZXhwb3J0Q1NWICgpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGV4cG9ydFNlcnZpY2UgPSB1aUdyaWRFeHBvcnRlclNlcnZpY2U7XHJcbiAgICAgICAgICAgIHZhciBncmlkID0gdm0uZ3JpZEFwaS5ncmlkO1xyXG4gICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSBnZXREYXRlKCkgKyBcIi5jc3ZcIjtcclxuXHJcbiAgICAgICAgICAgIGV4cG9ydFNlcnZpY2UubG9hZEFsbERhdGFJZk5lZWRlZChncmlkLCB1aUdyaWRFeHBvcnRlckNvbnN0YW50cy5WSVNJQkxFLCB1aUdyaWRFeHBvcnRlckNvbnN0YW50cy5WSVNJQkxFKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4cG9ydENvbHVtbkhlYWRlcnMgPSBleHBvcnRTZXJ2aWNlLmdldENvbHVtbkhlYWRlcnMoZ3JpZCwgdWlHcmlkRXhwb3J0ZXJDb25zdGFudHMuVklTSUJMRSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwb3J0RGF0YSA9IGV4cG9ydFNlcnZpY2UuZ2V0RGF0YShncmlkLCB1aUdyaWRFeHBvcnRlckNvbnN0YW50cy5WSVNJQkxFLCB1aUdyaWRFeHBvcnRlckNvbnN0YW50cy5WSVNJQkxFKTtcclxuICAgICAgICAgICAgICAgIHZhciBjc3ZDb250ZW50ID0gZXhwb3J0U2VydmljZS5mb3JtYXRBc0NzdihleHBvcnRDb2x1bW5IZWFkZXJzLCBleHBvcnREYXRhLCBncmlkLm9wdGlvbnMuZXhwb3J0ZXJDc3ZDb2x1bW5TZXBhcmF0b3IgPSAnOycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydFNlcnZpY2UuZG93bmxvYWRGaWxlKGZpbGVOYW1lLCBjc3ZDb250ZW50LCBncmlkLm9wdGlvbnMuZXhwb3J0ZXJPbGRlckV4Y2VsQ29tcGF0aWJpbGl0eSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ9CX0LDQs9GA0YPQt9C40YLRgdGPINGE0LDQudC7ICcgKyBmaWxlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAvLyDQldGB0LvQuCDQsdGD0LTRg9GCINC+0YLRgNCw0LbQsNGC0YzRgdGPINC60YDQsNC60L7Qt9GP0LHRgNGLIC0g0L7RgtC60YDRi9GC0Ywg0YTQsNC50Lsg0LIgbm90ZXBhZCsrINC4INCy0YvQsdC10YDQuNGC0LUgXCLQv9GA0LXQvtCx0YDQsNC30L7QstCw0YLRjCDQsiBBTlNJXCIuIFxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjc3ZDb250ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0uYWRkcmVzc1xyXG4gICAgICAgIGZ1bmN0aW9uIGFkZHJlc3MoKXtcclxuICAgICAgICAgICAgJCgnI2FkZHJlc3MnKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZnVuY0EoKXsgYWxlcnQoJ3NlbmQnKTsgfTtcclxuXHJcbiAgICAgICAgLy/QntCi0J/QoNCQ0JLQmtCQINCf0JjQodCV0JwgXHJcbiAgICAgICAgZnVuY3Rpb24gZ21haWwoKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGV4cG9ydFNlcnZpY2UgPSB1aUdyaWRFeHBvcnRlclNlcnZpY2U7XHJcbiAgICAgICAgICAgIHZhciBncmlkID0gdm0uZ3JpZEFwaS5ncmlkO1xyXG5cclxuICAgICAgICAgICAgZXhwb3J0U2VydmljZS5sb2FkQWxsRGF0YUlmTmVlZGVkKGdyaWQsIHVpR3JpZEV4cG9ydGVyQ29uc3RhbnRzLlZJU0lCTEUsIHVpR3JpZEV4cG9ydGVyQ29uc3RhbnRzLlZJU0lCTEUpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwb3J0Q29sdW1uSGVhZGVycyA9IGV4cG9ydFNlcnZpY2UuZ2V0Q29sdW1uSGVhZGVycyhncmlkLCB1aUdyaWRFeHBvcnRlckNvbnN0YW50cy5WSVNJQkxFKTtcclxuICAgICAgICAgICAgICAgIHZhciBleHBvcnREYXRhID0gZXhwb3J0U2VydmljZS5nZXREYXRhKGdyaWQsIHVpR3JpZEV4cG9ydGVyQ29uc3RhbnRzLlZJU0lCTEUsIHVpR3JpZEV4cG9ydGVyQ29uc3RhbnRzLlZJU0lCTEUpO1xyXG4gICAgICAgICAgICAgICAgdm0uY3N2Q29udGVudCA9IGV4cG9ydFNlcnZpY2UuZm9ybWF0QXNDc3YoZXhwb3J0Q29sdW1uSGVhZGVycywgZXhwb3J0RGF0YSwgZ3JpZC5vcHRpb25zLmV4cG9ydGVyQ3N2Q29sdW1uU2VwYXJhdG9yID0gJzsnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi4uL21haWwucGhwXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6ICh7dG86IHZtLm1haWxBZGRyZXNzLCBzdWI6IFwiRXhwb3J0XCIsIGVtYWlsYm9keTogdm0uZ3JpZE9wdGlvbnMuZGF0YX0pLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwiaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY0EgXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnI2FkZHJlc3MnKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCS0KvQpdCe0JTQkCDQmNCXIG1vZGFsRGlhbG9nINCR0JXQlyDQodCe0KXQoNCQ0J3QldCd0JjQryDQlNCQ0J3QndCr0KXQpVxyXG4gICAgICAgIGZ1bmN0aW9uIGV4aXRfbW9kYWwoKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICQoXCIubW9kYWxEaWFsb2dcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRlZl9jbGljaygpe2V2ZW50LnByZXZlbnREZWZhdWx0KCk7fTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQodCa0KDQq9Ci0JjQryDQmNCd0JTQmNCa0JDQotCe0KDQkCDQntCW0JjQlNCQ0J3QmNCvXHJcbiAgICAgICAgZnVuY3Rpb24gZmluaXNoX2xvYWRlcigpe1xyXG4gICAgICAgICAgICBpZiAoJChcIiNsb2FkZXJcIikuaXMoXCI6dmlzaWJsZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2xvYWRlclwiKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCS0JjQl9Cj0JDQm9CY0JfQkNCm0JjQmCDQmNCd0JTQmNCa0JDQotCe0KDQkCDQntCW0JjQlNCQ0J3QmNCvXHJcbiAgICAgICAgZnVuY3Rpb24gc3RhcnRfbG9hZGVyKCl7XHJcbiAgICAgICAgICAgIGlmICghJChcIiNsb2FkZXJcIikuaXMoXCI6dmlzaWJsZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2xvYWRlclwiKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQl9CQ0JPQoNCj0JfQmtCYINCi0JXQmtCj0KnQldCT0J4g0K7Ql9CV0KDQkCBcclxuICAgICAgICBmdW5jdGlvbiBsb2FkQ3VycmVudFVzZXIoKSB7XHJcbiAgICAgICAgICAgIFVzZXJTZXJ2aWNlLkdldEJ5VXNlcm5hbWUoJHJvb3RTY29wZS5nbG9iYWxzLmN1cnJlbnRVc2VyLnVzZXJuYW1lKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS51c2VyID0gdXNlcjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JfQkNCT0KDQo9CX0JrQmCDQktCh0JXQpSDQrtCX0JXQoNCe0JIgXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZEFsbFVzZXJzKCkge1xyXG4gICAgICAgICAgICBVc2VyU2VydmljZS5HZXRBbGwoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uYWxsVXNlcnMgPSB1c2VycztcclxuICAgICAgICAgICAgICAgICAgICBIb21lU2VydmljZS5Vc2VycyA9IHZtLmFsbFVzZXJzO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQo9CU0JDQm9CV0J3QmNCvINCu0JfQldCg0JAgXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlVXNlcihpZCkge1xyXG4gICAgICAgICAgICBVc2VyU2VydmljZS5EZWxldGUoaWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEFsbFVzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyo9PT09PT09PT09PT09PT09PT090KTQmNCb0KzQotCg0Ksg0JTQm9CvINCX0JDQnNCV0J3QqyDQlNCQ0J3QndCr0KUg0JIg0JPQoNCY0JTQlT09PT09PT09PT09PT09PT09PT0qL1xyXG5cclxuICAgIC8v0JrQntCd0JLQldCg0KLQkNCm0JjQryDQnNCQ0KHQodCY0JLQkCDQntCR0KrQldCa0KLQntCSINCSINCe0JHQqtCV0JrQoiDQlNCb0K8g0KTQmNCb0KzQotCg0J7QklxyXG4gICAgZnVuY3Rpb24gY3JlYXRlX29ial9mb3JfZmlsdGVyKG9iaiwgb2JqX2lkLCBvYmpfZmllbGQpe1xyXG4gICAgICAgIGxldCBvYmpGaWx0ZXIgPSAneyc7XHJcbiAgICAgICAgZm9yKGxldCBqPTA7IGogPCBvYmoubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICBvYmpGaWx0ZXIgPSBvYmpGaWx0ZXIgKyAnXCInICsgb2JqW2pdW29ial9pZF0gKyAnXCInICsgJzogJyArICdcIicgKyBvYmpbal1bb2JqX2ZpZWxkXSArICdcIicgKyAnLCAnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqRmlsdGVyID0gb2JqRmlsdGVyLnNsaWNlKDAsLTIpICsgJ30nO1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKG9iakZpbHRlcilcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8v0JfQkNCc0JXQndCQINCU0JDQndCd0KvQpSDQkiDQk9Cg0JjQlNCVICjQn9Ce0JvQlSAtIGlkX2xpc3QpXHJcbiAgICBmdW5jdGlvbiBpZF9saXN0ICgpe1xyXG5cclxuICAgICAgICB2YXIgaWRfbGlzdEhhc2ggPSB7XHJcbiAgICAgICAgICAgIDE6IFwi0J/Qu9Cw0L1cIiwgXHJcbiAgICAgICAgICAgIDI6IFwi0JIg0L/RgNC+0YbQtdGB0YHQtVwiLCBcclxuICAgICAgICAgICAgMzogXCLQk9C+0YLQvtCy0L5cIiBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICAgICAgaWYgKCFpbnB1dCl7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJldHVybiBpZF9saXN0SGFzaFtpbnB1dF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy/Ql9CQ0JzQldCd0JAg0JTQkNCd0J3Qq9ClINCSINCT0KDQmNCU0JUgKNCf0J7Qm9CVIC0gZXhlY3V0aW9uX3N0YXR1cylcclxuICAgIGZ1bmN0aW9uIGV4ZWN1dGlvbl9zdGF0dXMoKXtcclxuICAgICAgICB2YXIgZXhlY3V0aW9uX3N0YXR1c0hhc2ggPSB7XHJcbiAgICAgICAgICAgIDE6IFwi0J7QttC40LTQsNC10YJcIiwgXHJcbiAgICAgICAgICAgIDI6IFwi0JIg0YDQsNCx0L7RgtC1XCIsIFxyXG4gICAgICAgICAgICAzOiBcItCS0YvQv9C+0LvQvdC10L3QvlwiIFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmICghaW5wdXQpe1xyXG4gICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZXhlY3V0aW9uX3N0YXR1c0hhc2hbaW5wdXRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gLy/Ql9CQ0JzQldCd0JAg0JTQkNCd0J3Qq9ClINCSINCT0KDQmNCU0JUgKNCf0J7Qm9CVIC0gaWRfdXNlcilcclxuICAgIC8vIGZ1bmN0aW9uIGlkX3VzZXIoSG9tZVNlcnZpY2Upe1xyXG4gICAgLy8gICAgIHZhciBpZF91c2VydEhhc2ggPSBjcmVhdGVfb2JqX2Zvcl9maWx0ZXIoSG9tZVNlcnZpY2UuVXNlcnMsICdpZCcsICd1c2VybmFtZScpO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGlkX3VzZXJ0SGFzaCk7XHJcbiAgICAvLyAgICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAvLyAgICAgICAgIGlmICghaW5wdXQpe1xyXG4gICAgLy8gICAgICAgICAgIHJldHVybiAnJztcclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICByZXR1cm4gaWRfdXNlcnRIYXNoW2lucHV0XTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyB9XHJcblxyXG59KSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9hc3NldHMvaG9tZS9ob21lLmNvbnRyb2xsZXIuanNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjazovLy9mcm9udGVuZC9hc3NldHMvaG9tZS9ob21lLmNvbnRyb2xsZXIuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFxQkE7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXdFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUtBO0FBQ0E7QUF6QkE7QUFDQTtBQUNBO0FBMkJBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFrQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWdDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXlGQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBQ0E7QUFXQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVFBOzs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVFBOzs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFBQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIifQ==