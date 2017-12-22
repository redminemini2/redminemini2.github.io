/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};

/******/    // The require function
/******/    function __webpack_require__(moduleId) {

/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;

/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            exports: {},
/******/            id: moduleId,
/******/            loaded: false
/******/        };

/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/        // Flag the module as loaded
/******/        module.loaded = true;

/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }


/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;

/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;

/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "/js/";

/******/    // Load entry module and return exports
/******/    return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
                
                    let tbl;
                    let t = vm.csvContent.split('\n')
                    tbl = '<tr>'
                    for (var i = 0; i < t.length; i++) {
                        let tt = t[i].split(';');
                        
                        for (var j = 0; j < tt.length; j++) {

                            if(i==0){ 
                                tbl = tbl + '<th>' + tt[j] + '</th>'; 
                            }else{
                                tbl = tbl + '<td>' + tt[j] + '</td>'; 
                            }
                        }
                        tbl = tbl + '</tr>'
                    };


                    // console.log(tbl);
        
                    $.ajax({
                        url: "../mail.php",
                        type: "POST",
                        data: { to: vm.mailAddress, sub: "Export", emailbody: tbl},
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZV9jb250cm9sbGVyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGYxNTU5MTZjNGRhMDVkMjgzMDc4Iiwid2VicGFjazovLy9mcm9udGVuZC9hc3NldHMvaG9tZS9ob21lLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYxNTU5MTZjNGRhMDVkMjgzMDc4IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBIb21lQ29udHJvbGxlcilcclxuICAgICAgICAuZmlsdGVyKCdpZF9saXN0JywgaWRfbGlzdClcclxuICAgICAgICAuZmlsdGVyKCdleGVjdXRpb25fc3RhdHVzJywgZXhlY3V0aW9uX3N0YXR1cylcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog0J/QoNCV0JTQntCh0KLQkNCS0JvQldCd0JjQlSDQlNCQ0J3QndCr0KUg0JIg0JLQmNCU0JUgRFJBRyZEUk9QINCYIG5nLUdSSURcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyXHJcbiAgICAgICAgICAgICAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAgICAgICAgICAgICAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBIb21lQ29udHJvbGxlcilcclxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCdpZF9saXN0JywgaWRfbGlzdClcclxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCdleGVjdXRpb25fc3RhdHVzJywgZXhlY3V0aW9uX3N0YXR1cylcclxuXHJcbiAgICAgICAgICAgICAgICAgSG9tZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCAnSG9tZVNlcnZpY2UnLCAndWlHcmlkQ29uc3RhbnRzJywnJHJvb3RTY29wZScsICckdGltZW91dCddO1xyXG4gICAgICAgICAgICAgICAgLi4uLi4uLi5cclxuXHJcbiAgICAgICAgICogQGNsYXNzIEhvbWVDb250cm9sbGVyXHJcbiAgICAgICAgICogQG1vZHVsZSBhcHBcclxuICAgICAgICAgKiBAbWFpbiBIb21lQ29udHJvbGxlclxyXG4gICAgICAgICAqL1xyXG4gICAgSG9tZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCAnSG9tZVNlcnZpY2UnLCAndWlHcmlkQ29uc3RhbnRzJywgJ3VpR3JpZEV4cG9ydGVyQ29uc3RhbnRzJywgJ3VpR3JpZEV4cG9ydGVyU2VydmljZScsICckcm9vdFNjb3BlJywgJyR0aW1lb3V0J107XHJcblxyXG4gICAgZnVuY3Rpb24gSG9tZUNvbnRyb2xsZXIoVXNlclNlcnZpY2UsIEhvbWVTZXJ2aWNlLCB1aUdyaWRDb25zdGFudHMsIHVpR3JpZEV4cG9ydGVyQ29uc3RhbnRzLCB1aUdyaWRFeHBvcnRlclNlcnZpY2UsICRyb290U2NvcGUsICR0aW1lb3V0KSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PdCS0KHQlSDQp9Ci0J4g0J3Qo9CW0J3QniDQlNCb0K8gSFRNTD09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogPHA+0JLQodCVINCn0KLQniBcItCf0KDQldCU0JDQldCi0KHQr1wiXCIg0JIgSFRNTDwvcD5cclxuICAgICAgICAgICAgdm0udGFzY2tfbGltaXQgPSAxNTtcclxuICAgICAgICAgICAgdm0ubmdHcmlkVmlldyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB2bS51c2VyID0gbnVsbDtcclxuICAgICAgICAgICAgdm0uYWxsVXNlcnMgPSBbXTtcclxuICAgICAgICAgICAgdm0uZGVsZXRlVXNlciA9IGRlbGV0ZVVzZXI7XHJcblxyXG4gICAgICAgICAgICB2bS5leGl0X21vZGFsID0gZXhpdF9tb2RhbDtcclxuICAgICAgICAgICAgdm0uc2F2ZXRhc2NrID0gc2F2ZXRhc2NrO1xyXG4gICAgICAgICAgICB2bS5lZGl0dGFzY2sgPSBlZGl0dGFzY2s7XHJcbiAgICAgICAgICAgIHZtLmRlbHRhc2NrID0gZGVsdGFzY2s7XHJcbiAgICAgICAgICAgIHZtLmFkZHRhc2NrID0gYWRkdGFzY2s7XHJcbiAgICAgICAgICAgIHZtLmRlZl9jbGljayA9IGRlZl9jbGljaztcclxuICAgICAgICAgICAgdm0uZmluaXNoX2xvYWRlciA9IGZpbmlzaF9sb2FkZXI7XHJcbiAgICAgICAgICAgIHZtLnN0YXJ0X2xvYWRlciA9IHN0YXJ0X2xvYWRlcjtcclxuICAgICAgICAgICAgdm0ubG9nTW9kZWxzID0gbG9nTW9kZWxzO1xyXG4gICAgICAgICAgICB2bS5teV9hbGVydCA9IG15X2FsZXJ0O1xyXG4gICAgICAgICAgICB2bS5jaGFuZ2VfbGlzdCA9IGNoYW5nZV9saXN0O1xyXG4gICAgICAgICAgICB2bS5jaGFuZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHZtLnJhd1NjcmVlbnMgPSBbXTtcclxuICAgICAgICAgICAgdm0uc29ydGluZ0xvZyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzID0gW107XHJcbiAgICAgICAgICAgIHZtLnJlc2dldEpzb25MaXN0cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdm0uc29ydGFibGVPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0V2l0aDogXCIuYXBwcy1jb250YWluZXJcIixcclxuICAgICAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmICgvLyBlbnN1cmUgd2UgYXJlIGluIHRoZSBmaXJzdCB1cGRhdGUoKSBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgIXVpLml0ZW0uc29ydGFibGUucmVjZWl2ZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRoYXQgaXRzIGFuIGFjdHVhbCBtb3ZpbmdcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIGJldHdlZW4gdGhlIHR3byBsaXN0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgdWkuaXRlbS5zb3J0YWJsZS5zb3VyY2VbMF0gIT09IHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldFswXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdGhlIHNpemUgbGltaXRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgdWkuaXRlbS5zb3J0YWJsZS5kcm9wdGFyZ2V0TW9kZWwubGVuZ3RoID49IHZtLnRhc2NrX2xpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWkuaXRlbS5zb3J0YWJsZS5jYW5jZWwoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAvLyEhISDQntCR0J3QntCS0JvQr9CV0JwgaWRfbGlzdCDQoyDQn9CV0KDQldCc0JXQqdCV0J3QndCe0Jkg0JfQkNCU0JDQp9CYICEhIVxyXG4gICAgICAgICAgICAgICAgICAvLyB2YXIgc3RyID0gTnVtYmVyKHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldExpc3RbMF0uYXR0cmlidXRlcy5pZC52YWx1ZS5zbGljZSg3LDEwKSk7XHJcbiAgICAgICAgICAgICAgICAgIC8vIHVpLml0ZW0uc29ydGFibGUubW9kZWwuaWRfbGlzdCA9IHN0ciArIDFcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdm0ucmF3U2NyZWVucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnJhd1NjcmVlbnNbaV0ubWFwKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4LmlkX2xpc3QgPSBpICsgMTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9OyBcclxuXHJcbiAgICAgICAgICAgIHZtLnN0YXR1cyA9IFtcclxuICAgICAgICAgICAgICAgIHtpZDogMSwgbmFtZTon0J7QttC40LTQsNC10YInfSxcclxuICAgICAgICAgICAgICAgIHtpZDogMiwgbmFtZTon0JIg0YDQsNCx0L7RgtC1J30sXHJcbiAgICAgICAgICAgICAgICB7aWQ6IDMsIG5hbWU6J9CS0YvQv9C+0LvQvdC10L3Qvid9LFxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgJCgnI2R0cGNrcicpLmRhdGVwaWNrZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBncmlkbmFtZUpzb25MaXN0cyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgY3VyVXNlciA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgKiBAcHJvcGVydHkg0JTQkNCd0J3Qq9CVINCU0JvQryBIVE1MXHJcbiAgICAgICAgICogQHR5cGUgT2JqZWN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBmaW5hbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZtLnRhc2NrX2xpbWl0ID0gMTU7XHJcbiAgICAgICAgdm0ubmdHcmlkVmlldyA9IG51bGw7XHJcblxyXG4gICAgICAgIHZtLnVzZXIgPSBudWxsO1xyXG4gICAgICAgIHZtLmFsbFVzZXJzID0gW107XHJcbiAgICAgICAgdm0uZGVsZXRlVXNlciA9IGRlbGV0ZVVzZXI7XHJcblxyXG4gICAgICAgIHZtLmV4aXRfbW9kYWwgPSBleGl0X21vZGFsO1xyXG4gICAgICAgIHZtLnNhdmV0YXNjayA9IHNhdmV0YXNjaztcclxuICAgICAgICB2bS5lZGl0dGFzY2sgPSBlZGl0dGFzY2s7XHJcbiAgICAgICAgdm0uZGVsdGFzY2sgPSBkZWx0YXNjaztcclxuICAgICAgICB2bS5hZGR0YXNjayA9IGFkZHRhc2NrO1xyXG4gICAgICAgIHZtLmRlZl9jbGljayA9IGRlZl9jbGljaztcclxuICAgICAgICB2bS5leHBvcnRQREYgPSBleHBvcnRQREY7XHJcbiAgICAgICAgdm0uZXhwb3J0Q1NWID0gZXhwb3J0Q1NWO1xyXG4gICAgICAgIHZtLmdtYWlsID0gZ21haWw7XHJcbiAgICAgICAgdm0uYWRkcmVzcyA9IGFkZHJlc3M7XHJcbiAgICAgICAgdm0ubWFpbEFkZHJlc3MgPSAnQGdtYWlsLmNvbSc7XHJcbiAgICAgICAgdm0uZmluaXNoX2xvYWRlciA9IGZpbmlzaF9sb2FkZXI7XHJcbiAgICAgICAgdm0uc3RhcnRfbG9hZGVyID0gc3RhcnRfbG9hZGVyO1xyXG4gICAgICAgIHZtLmxvZ01vZGVscyA9IGxvZ01vZGVscztcclxuICAgICAgICB2bS5teV9hbGVydCA9IG15X2FsZXJ0O1xyXG4gICAgICAgIHZtLmNoYW5nZV9saXN0ID0gY2hhbmdlX2xpc3Q7XHJcbiAgICAgICAgdm0uY2hhbmdlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZtLnJhd1NjcmVlbnMgPSBbXTtcclxuICAgICAgICB2bS5zb3J0aW5nTG9nID0gW107XHJcblxyXG4gICAgICAgIHZtLnJlc2pzb250YXNrcyA9IFtdO1xyXG4gICAgICAgIHZtLnJlc2dldEpzb25MaXN0cyA9IFtdO1xyXG5cclxuICAgICAgICB2bS5zb3J0YWJsZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBjb25uZWN0V2l0aDogXCIuYXBwcy1jb250YWluZXJcIixcclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICBpZiAoLy8gZW5zdXJlIHdlIGFyZSBpbiB0aGUgZmlyc3QgdXBkYXRlKCkgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgIXVpLml0ZW0uc29ydGFibGUucmVjZWl2ZWQgJiZcclxuICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdGhhdCBpdHMgYW4gYWN0dWFsIG1vdmluZ1xyXG4gICAgICAgICAgICAgICAgICAvLyBiZXR3ZWVuIHRoZSB0d28gbGlzdHNcclxuICAgICAgICAgICAgICAgICAgdWkuaXRlbS5zb3J0YWJsZS5zb3VyY2VbMF0gIT09IHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldFswXSAmJlxyXG4gICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGUgc2l6ZSBsaW1pdGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgIHVpLml0ZW0uc29ydGFibGUuZHJvcHRhcmdldE1vZGVsLmxlbmd0aCA+PSB2bS50YXNja19saW1pdCkge1xyXG4gICAgICAgICAgICAgICAgdWkuaXRlbS5zb3J0YWJsZS5jYW5jZWwoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgIC8vISEhINCe0JHQndCe0JLQm9Cv0JXQnCBpZF9saXN0INCjINCf0JXQoNCV0JzQldCp0JXQndCd0J7QmSDQl9CQ0JTQkNCn0JggISEhXHJcbiAgICAgICAgICAgICAgLy8gdmFyIHN0ciA9IE51bWJlcih1aS5pdGVtLnNvcnRhYmxlLmRyb3B0YXJnZXRMaXN0WzBdLmF0dHJpYnV0ZXMuaWQudmFsdWUuc2xpY2UoNywxMCkpO1xyXG4gICAgICAgICAgICAgIC8vIHVpLml0ZW0uc29ydGFibGUubW9kZWwuaWRfbGlzdCA9IHN0ciArIDFcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZtLnJhd1NjcmVlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZtLnJhd1NjcmVlbnNbaV0ubWFwKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeC5pZF9saXN0ID0gaSArIDE7IFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9OyBcclxuXHJcbiAgICAgICAgdm0uc3RhdHVzID0gW1xyXG4gICAgICAgICAgICB7aWQ6IDEsIG5hbWU6J9Ce0LbQuNC00LDQtdGCJ30sXHJcbiAgICAgICAgICAgIHtpZDogMiwgbmFtZTon0JIg0YDQsNCx0L7RgtC1J30sXHJcbiAgICAgICAgICAgIHtpZDogMywgbmFtZTon0JLRi9C/0L7Qu9C90LXQvdC+J30sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnI2R0cGNrcicpLmRhdGVwaWNrZXIoKTtcclxuXHJcbiAgICAgICAgdmFyIGdyaWRuYW1lSnNvbkxpc3RzID0gW107XHJcbiAgICAgICAgbGV0IGN1clVzZXIgPSBmYWxzZTtcclxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT090JjQndCY0KbQmNCQ0KbQmNCvPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuICAgICAgICAvL9CY0J3QmNCm0JjQmNCg0KPQldCcINCa0J7QndCi0KDQntCb0JvQldCgXHJcbiAgICAgICAgaW5pdENvbnRyb2xsZXIoKTtcclxuXHJcbiAgICAgICAgLy/QkNCT0KDQldCT0JDQotCd0JDQryDQpNCj0J3QmtCm0JjQryDQmNCd0JjQptCY0Jgg0JrQntCd0KLQoNCe0JvQm9CV0KDQkCDQodCe0KHQotCe0JjQoiDQmNCXINCd0JXQodCa0J7Qm9Cs0JrQmNClIFwi0JLQq9CX0KvQktCQ0K7QqdCY0KVcIlwiINCk0KPQndCa0KbQmNCZXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdENvbnRyb2xsZXIoKSB7XHJcblxyXG4gICAgICAgICAgICAvL9CX0JDQk9Cg0KPQltCQ0JXQnCDQktCh0JXQpSDQrtCX0JXQoNCe0JIg0KTQkNCR0KDQmNCa0JAgVXNlclNlcnZpY2VcclxuICAgICAgICAgICAgbG9hZEFsbFVzZXJzKCk7IC8vZnJvbnRlbmQvYXNzZXRzL2FwcC1zZXJ2aWNlcy91c2VyLnNlcnZpY2UuanNcclxuXHJcbiAgICAgICAgICAgIC8vINCY0JzQn9Ce0KDQotCY0KDQo9CV0Jwg0KHQn9CY0KHQntCaINCb0JjQodCi0J7QkiDQpNCQ0JHQoNCY0JrQkCBVc2VyU2VydmljZVxyXG4gICAgICAgICAgICBnZXRKc29uTGlzdHMoKTsgLy9mcm9udGVuZC9hc3NldHMvYXBwLXNlcnZpY2VzL2pzb25fc2VydmljZS5qc1xyXG5cclxuICAgICAgICAgICAgLy/QmNCc0J/QntCg0KLQmNCg0KPQldCcINCh0J/QmNCh0J7QmiDQl9CQ0JTQkNCnINCk0JDQkdCg0JjQmtCQIFVzZXJTZXJ2aWNlIFxyXG4gICAgICAgICAgICBnZXRKc29uVGFza3MoKTsgLy9mcm9udGVuZC9hc3NldHMvYXBwLXNlcnZpY2VzL2pzb25fc2VydmljZS5qc1xyXG5cclxuICAgICAgICAgICAgLy8g0JjQnNCf0J7QoNCi0JjQoNCj0JXQnCDQodCf0JjQodCe0Jog0JjQnNCV0J0g0KHQotCe0JvQkdCm0J7QkiDQk9Cg0JjQlNCQXHJcbiAgICAgICAgICAgIGdldEpzb25HcmlkbmFtZSgpOyAgIFxyXG5cclxuICAgICAgICAgICAgLy/Ql9CQ0JPQoNCj0JbQkNCV0Jwg0KLQldCa0KPQqdCV0JPQniDQrtCX0JXQoNCQICsg0KHQntCX0JTQkNCV0Jwg0KHQntCU0JXQoNCW0JjQnNCe0JUg0JTQm9CvINCU0KDQkNCT0L3QlNCg0J7QnyDQm9CY0KHQotCe0JJcclxuICAgICAgICAgICAgY3JlYXRlU2hlZXRzKHZtLnJlc2dldEpzb25MaXN0cyk7XHJcbiAgICAgICAgfTsgXHJcbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT090J7Qn9CV0KDQkNCi0JjQktCd0KvQlSDQpNCj0J3QmtCm0JjQmD09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQmNCc0J/QntCg0KLQkCDQodCf0JjQodCa0JAg0JjQnNCV0J0g0J/QntCb0JXQmSDQk9Cg0JjQlNCQXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SnNvbkdyaWRuYW1lKCl7XHJcbiAgICAgICAgICAgIGdyaWRuYW1lSnNvbkxpc3RzID0gSG9tZVNlcnZpY2UuZ2V0UmVzdWx0RnJvbUpzb24oJ2RiL2dyaWRuYW1lLmpzb24nKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JjQnNCf0J7QoNCi0JAg0KHQn9CY0KHQmtCQINCb0JjQodCi0J7QklxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEpzb25MaXN0cygpe1xyXG4gICAgICAgICAgICB2bS5yZXNnZXRKc29uTGlzdHMgPSBIb21lU2VydmljZS5nZXRSZXN1bHRGcm9tSnNvbignZGIvbGlzdHNOYW1lLmpzb24nKVxyXG4gICAgICAgICAgICBIb21lU2VydmljZS5saXN0ID0gdm0ucmVzZ2V0SnNvbkxpc3RzO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JjQnNCf0J7QoNCi0JAg0KHQn9CY0KHQmtCQINCX0JDQlNCQ0KdcclxuICAgICAgICBmdW5jdGlvbiBnZXRKc29uVGFza3MoKXtcclxuICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzID0gSG9tZVNlcnZpY2UuZ2V0UmVzdWx0RnJvbUpzb24oJ2RiL3Rhc2tzLmpzb24nKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDQpNCj0J3QmtCm0JjQntCd0JDQmyBtYWtlTGlzdCAoaWRfbGlzdCk6PGJyPlxyXG4gICAgICAgICAqINCS0J7Ql9CS0KDQkNCp0JDQldCiINCe0KLQpNCY0JvQrNCi0KDQntCS0JDQndCd0KvQmSDQn9CeINCf0J7Qm9Cv0Jw6IGlkX2xpc3QvaWRfdXNlciDQnNCQ0KHQodCY0JIg0JfQkNCU0JDQpzxicj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWFrZUxpc3QgKGlkX2xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyX3Jlc2pzb250YXNrcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtLnVzZXIuaWQgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJfcmVzanNvbnRhc2tzID0gdm0ucmVzanNvbnRhc2tzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWRfbGlzdCA9PSBpZF9saXN0ICYmIGl0ZW0uaWRfdXNlciA9PSB2bS51c2VyLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyX3Jlc2pzb250YXNrcyA9IHZtLnJlc2pzb250YXNrcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkX2xpc3QgPT0gaWRfbGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJfcmVzanNvbnRhc2tzO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICogQG1ldGhvZCBtYWtlTGlzdFxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaWRfbGlzdCBJRCDQm9CY0KHQotCQXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBmaWx0ZXJfcmVzanNvbnRhc2tzXHJcbiAgICAgICAgICovIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1ha2VMaXN0IChpZF9saXN0KSB7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJfcmVzanNvbnRhc2tzID0gW107XHJcbiAgICAgICAgICAgIGlmKHZtLnVzZXIuaWQgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyX3Jlc2pzb250YXNrcyA9IHZtLnJlc2pzb250YXNrcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkX2xpc3QgPT0gaWRfbGlzdCAmJiBpdGVtLmlkX3VzZXIgPT0gdm0udXNlci5pZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyX3Jlc2pzb250YXNrcyA9IHZtLnJlc2pzb250YXNrcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkX2xpc3QgPT0gaWRfbGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcl9yZXNqc29udGFza3M7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIGNyZWF0ZVNoZWV0cyAocmVzZ2V0SnNvbkxpc3RzKTo8YnI+XHJcbiAgICAgICAgICog0KbQmNCa0JvQntCcINCh0J7Ql9CU0JDQrtCi0KHQryDQm9CY0KHQotCrLiDQm9CY0KHQotCQ0Jwg0J/QoNCY0KHQktCQ0JjQktCQ0JXQotCh0K8g0JjQnNCvINCYIElEPGJyPiDQodCe0JfQlNCQ0J3QndCr0JUg0JvQmNCh0KLQqyDQlNCe0JHQkNCS0JvQr9Cu0KLQodCvINCSINCc0JDQodCh0JjQkiB2bS5yYXdTY3JlZW5zXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVNoZWV0cyhyZXNnZXRKc29uTGlzdHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFjdXJVc2VyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXNlclNlcnZpY2UuR2V0QnlVc2VybmFtZSgkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXIudXNlcm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXNlcicsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0udXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHJlc2dldEpzb25MaXN0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0gPSBtYWtlTGlzdChyZXNnZXRKc29uTGlzdHNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdLm5hbWUgPSByZXNnZXRKc29uTGlzdHNbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5yYXdTY3JlZW5zLnB1c2godm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clVzZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/QodCe0JfQlNCQ0IHQnCDQk9Cg0JjQlFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgcmVzZ2V0SnNvbkxpc3RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdID0gbWFrZUxpc3QocmVzZ2V0SnNvbkxpc3RzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtWydsaXN0XycgKyByZXNnZXRKc29uTGlzdHNbaV0uaWRdLm5hbWUgPSByZXNnZXRKc29uTGlzdHNbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnJhd1NjcmVlbnMucHVzaCh2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICog0J/QoNCYINCf0JXQoNCS0J7QnCDQn9Cg0J7QpdCe0JTQlSDQodCe0JfQlNCQ0JXQnCDQk9Cg0JjQlCBcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVNoZWV0c1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXNnZXRKc29uTGlzdHMg0JzQkNCh0KHQmNCSINCY0JzQldCdINCb0JjQodCi0J7QklxyXG4gICAgICAgICAqLyBcclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCh0J7Ql9CU0JDQndCY0K8g0JvQmNCh0KLQntCSXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU2hlZXRzKHJlc2dldEpzb25MaXN0cyl7XHJcbiAgICAgICAgICAgIGlmKCFjdXJVc2VyKXtcclxuICAgICAgICAgICAgICAgIFVzZXJTZXJ2aWNlLkdldEJ5VXNlcm5hbWUoJHJvb3RTY29wZS5nbG9iYWxzLmN1cnJlbnRVc2VyLnVzZXJuYW1lKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXNlcicsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgcmVzZ2V0SnNvbkxpc3RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0gPSBtYWtlTGlzdChyZXNnZXRKc29uTGlzdHNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXS5uYW1lID0gcmVzZ2V0SnNvbkxpc3RzW2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnJhd1NjcmVlbnMucHVzaCh2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJVc2VyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL9Ch0J7Ql9CU0JDQgdCcINCT0KDQmNCUXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdEdyaWQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgcmVzZ2V0SnNvbkxpc3RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICB2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSA9IG1ha2VMaXN0KHJlc2dldEpzb25MaXN0c1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdm1bJ2xpc3RfJyArIHJlc2dldEpzb25MaXN0c1tpXS5pZF0ubmFtZSA9IHJlc2dldEpzb25MaXN0c1tpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnJhd1NjcmVlbnMucHVzaCh2bVsnbGlzdF8nICsgcmVzZ2V0SnNvbkxpc3RzW2ldLmlkXSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uINCk0KPQndCa0KbQmNCe0J3QkNCbIGluaXRHcmlkICgpOjxicj5cclxuICAgICAgICAgKiAxLiB2bS5uZ0dyaWRWaWV3IC0g0J7QotCe0JHQoNCQ0JbQkNCV0KIg0JPQoNCY0JQg0JIgSFRNTDxicj5cclxuICAgICAgICAgKiAyLiB2bS5zdGF0dXMgLSDQnNCQ0KHQodCY0JIg0KHQotCQ0KLQo9Ch0J7QkiDQl9CQ0JTQkNCn0JggKG15Q2VsVGVtcDEgLSBTRUxFQ1Qg0JjQlyB2bS5zdGF0dXMpPGJyPlxyXG4gICAgICAgICAqIDMuIHZtLmRyYWduZHJvcF9saXN0IC0g0JzQkNCh0KHQmNCSINCb0JjQodCi0J7QkiAobXlDZWxUZW1wMiAtIFNFTEVDVCDQmNCXIHZtLmRyYWduZHJvcF9saXN0KSA8YnI+XHJcbiAgICAgICAgICogNC4g0JLQq9CS0J7QlCDQn9Ce0JvQldCZINCSIEdSSUQg0J/QniDQn9Ce0KDQr9CU0JrQoyDQodCe0KDQotCY0KDQntCS0JrQmCDQn9Ce0JvQryBzb3J0INCc0JDQodCh0JjQktCQIHJpZG5hbWVKc29uTGlzdHM8YnI+XHJcbiAgICAgICAgICogNS4g0JTQm9CvINCe0KLQntCR0KDQkNCW0JXQndCY0K8g0JIg0KLQkNCR0JvQmNCm0JUg0KHQntCX0JTQkNCV0JwgXCLQodCi0KDQntCa0J7QktCr0Jkg0J7QkdCq0JXQmtCiXCItIHN0ciDQmCDQn9Cj0KjQmNCcINCV0JPQniDQkiBjb2x1bW5EZWZzXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IHR0Lmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKHR0W2pdLmlkICE9IFwiJCRoYXNoS2V5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gJ3tcImZpZWxkXCIgOiBcIicgKyB0dFtqXS5pZCArICdcIicgKyAnLCcgKyAnXCJkaXNwbGF5TmFtZVwiIDogXCInICsgZ3JpZG5hbWVKc29uTGlzdHNbal0uZ3JpZG5hbWUgKyAnXCJ9JyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmcy5wdXNoKEpTT04ucGFyc2Uoc3RyKSk7IFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICogNi4g0KHQmtCg0KvQktCQ0JXQnCDQn9Ce0JvQlSDQldCh0JvQmCDQntCd0J4g0J/QoNCY0KHQo9Ci0KHQotCS0KPQldCiINCSINCc0JDQodCh0JjQktCVIG5vdFZpc2libGUg0JTQm9CvINCe0KHQotCQ0JvQrNCd0KvQpSAtINCf0JXQoNCV0JjQnNCV0J3QntCS0KvQktCQ0JXQnCDQn9Ce0JvQryDQk9Cg0JjQlNCQXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbm90VmlzaWJsZSA9IFsnaWQnXTsvLydpZF9saXN0J1xyXG5cclxuICAgICAgICAgICAgLy/QodCa0KDQq9CS0JDQldCcINCf0J7Qm9CVINCV0KHQm9CYINCe0J3QniDQn9Cg0JjQodCj0KLQodCi0JLQo9CV0KIg0JIg0JzQkNCh0KHQmNCS0JUgbm90VmlzaWJsZSDQlNCb0K8g0J7QodCi0JDQm9Cs0J3Qq9ClIC0g0J/QldCg0JXQmNCc0JXQndCe0JLQq9CS0JDQldCcINCf0J7Qm9CvINCT0KDQmNCU0JBcclxuICAgICAgICAgICAgZm9yKGxldCBqPTA7IGogPCBub3RWaXNpYmxlLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS5maWVsZCA9PSBub3RWaXNpYmxlW2pdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v0J3QkNCl0J7QlNCY0Jwg0J/QniBpZCAoaikg0JjQndCU0JXQmtChINCX0JDQlNCQ0KfQmCDQkiDQnNCQ0KHQodCY0JLQlSB2bS5yZXNqc29udGFza3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpcnN0SW5kZXggPSBmaW5kX2luZGV4X2J5X2lkKGdyaWRuYW1lSnNvbkxpc3RzLCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLmZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS5kaXNwbGF5TmFtZSA9IGdyaWRuYW1lSnNvbkxpc3RzW2ZpcnN0SW5kZXhdLmdyaWRuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2ldLndpZHRoID0gZ3JpZG5hbWVKc29uTGlzdHNbZmlyc3RJbmRleF0ud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgKiA3LiDQlNCe0JHQkNCS0JvQr9CV0Jwg0JrQndCe0J/QmtCYINCg0JXQlNCQ0JrQotCY0KDQntCS0JDQndCY0K8g0Jgg0KPQlNCQ0JvQldCd0JjQr1xyXG4gICAgICAgICAqIDguINCU0J7QkdCQ0JLQm9Cv0JXQnNCcINCk0JjQm9Cs0KLQoNCrICDQmCDQntCi0JzQldCd0K/QldCcINCk0JjQm9Cs0KLQoNCrINCU0JvQryDQmtCd0J7Qn9Ce0JpcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJpZF9saXN0XCIgfHwgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImV4ZWN1dGlvbl9zdGF0dXNcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImlkX2xpc3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBteUZpbHRlciA9IG15TGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBteUZpbHRlciA9IG15U3RhdHVzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdHIgPSAneycgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1widHlwZVwiIDogXCJzZWxlY3RcIiwnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArICdcInNlbGVjdE9wdGlvbnNcIiAgOiBbICdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBteUZpbHRlciBcclxuICAgICAgICAgICAgICAgICAgICArICddfSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWx0ZXIgPSBKU09OLnBhcnNlKHN0cik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJpZF9saXN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5jZWxsRmlsdGVyID0gJ2lkX2xpc3QnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmNlbGxGaWx0ZXIgPSAnZXhlY3V0aW9uX3N0YXR1cyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImVkaXRcIiB8fCB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiZGVsZXRlXCIpIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZW5hYmxlRmlsdGVyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiaWRfdXNlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5jZWxsRmlsdGVyID0gJ2lkX3VzZXInO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkcm9wRG93bjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodm0udXNlci5pZCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmFsbFVzZXJzLm1hcChpdGVtID0+IGRyb3BEb3duID0gZHJvcERvd24gKyAne1widmFsdWVcIjogXCInICsgaXRlbS5pZCArICdcIiwgXCJsYWJlbFwiOiBcIicgKyBpdGVtLnVzZXJuYW1lICsgJ1wiIH0sJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmFsbFVzZXJzLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0uaWQgPT0gdm0udXNlci5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BEb3duID0gZHJvcERvd24gKyAne1widmFsdWVcIjogXCInICsgaXRlbS5pZCArICdcIiwgXCJsYWJlbFwiOiBcIicgKyBpdGVtLnVzZXJuYW1lICsgJ1wiIH0sJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzdHIgPSAneycgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1widHlwZVwiIDogXCJzZWxlY3RcIiwnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArICdcInNlbGVjdE9wdGlvbnNcIiAgOiAgWydcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBkcm9wRG93bi5zbGljZSg5LC0xKSBcclxuICAgICAgICAgICAgICAgICAgICArICddfSc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmlsdGVyID0gSlNPTi5wYXJzZShzdHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgKiBAbWV0aG9kIGluaXRHcmlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQodCe0JfQlNCQ0J3QmNCvINCT0KDQmNCU0JBcclxuICAgICAgICBmdW5jdGlvbiBpbml0R3JpZCgpIHtcclxuICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVHcmlkTWVudTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZUNlbGxFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZUNvbHVtblJlc2l6aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlRmlsdGVyaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0dyaWRGb290ZXI6dHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9uUmVnaXN0ZXJBcGk6IGZ1bmN0aW9uKGdyaWRBcGkpe1xyXG4gICAgICAgICAgICAgICAgICB2bS5ncmlkQXBpID0gZ3JpZEFwaTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5EZWZzOiBbXVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0cjtcclxuXHJcbiAgICAgICAgICAgIC8qINCh0J7QoNCi0JjQoNCj0JXQnCBncmlkbmFtZUpzb25MaXN0cyDQlNCb0K8g0J7QotCe0JHQoNCQ0JbQldCd0JjQryDQodCi0J7Qm9CR0KbQntCSINCX0JDQlNCQ0Kcg0JIg0KHQntCe0KLQktCV0KLQodCi0JLQmNCVINChINCf0J7Qm9CV0Jwgc29ydCBncmlkbmFtZUpzb25MaXN0cyAqL1xyXG4gICAgICAgICAgICBsZXQgdHQgPSBncmlkbmFtZUpzb25MaXN0cy5zb3J0KChhLGIpID0+IGEuc29ydCAtIGIuc29ydCk7XHJcblxyXG4gICAgICAgICAgICAvKtCU0JvQryDQntCi0J7QkdCg0JDQltCV0J3QmNCvINCSINCi0JDQkdCb0JjQptCVINCh0J7Ql9CU0JDQldCcIFwi0KHQotCg0J7QmtCe0JLQq9CZINCe0JHQqtCV0JrQolwiLSBzdHJcclxuICAgICAgICAgICAg0Jgg0J/Qo9Co0JjQnCDQldCT0J4g0JIgY29sdW1uRGVmcyovXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgdHQubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodHRbal0uaWQgIT0gXCIkJGhhc2hLZXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSAne1wiZmllbGRcIiA6IFwiJyArIHR0W2pdLmlkICsgJ1wiJyArICcsJyArICdcImRpc3BsYXlOYW1lXCIgOiBcIicgKyBncmlkbmFtZUpzb25MaXN0c1tqXS5ncmlkbmFtZSArICdcIn0nIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLnB1c2goSlNPTi5wYXJzZShzdHIpKTsgXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IG5vdFZpc2libGUgPSBbJ2lkJ107Ly8naWRfbGlzdCdcclxuXHJcbiAgICAgICAgICAgIC8v0KHQmtCg0KvQktCQ0JXQnCDQn9Ce0JvQlSDQldCh0JvQmCDQntCd0J4g0J/QoNCY0KHQo9Ci0KHQotCS0KPQldCiINCSINCc0JDQodCh0JjQktCVIG5vdFZpc2libGUg0JTQm9CvINCe0KHQotCQ0JvQrNCd0KvQpSAtINCf0JXQoNCV0JjQnNCV0J3QntCS0KvQktCQ0JXQnCDQn9Ce0JvQryDQk9Cg0JjQlNCQXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqIDwgbm90VmlzaWJsZS5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0uZmllbGQgPT0gbm90VmlzaWJsZVtqXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL9Cd0JDQpdCe0JTQmNCcINCf0J4gaWQgKGopINCY0J3QlNCV0JrQoSDQl9CQ0JTQkNCn0Jgg0JIg0JzQkNCh0KHQmNCS0JUgdm0ucmVzanNvbnRhc2tzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdEluZGV4ID0gZmluZF9pbmRleF9ieV9pZChncmlkbmFtZUpzb25MaXN0cywgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS5maWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbaV0uZGlzcGxheU5hbWUgPSBncmlkbmFtZUpzb25MaXN0c1tmaXJzdEluZGV4XS5ncmlkbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tpXS53aWR0aCA9IGdyaWRuYW1lSnNvbkxpc3RzW2ZpcnN0SW5kZXhdLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8q0JTQntCR0JDQktCb0K/QldCcINCa0J3QntCf0JrQoyDQoNCV0JTQkNCa0KLQmNCg0J7QktCQ0J3QmNCvKi9cclxuICAgICAgICAgICAgbGV0IGNoZSA9ICc8aSBjbGFzcz1cXCdmYSBmYS1wZW5jaWwtc3F1YXJlLW8gYnRuIGJ0bi1zdWNjZXNzIGJ0bi1zbVxcJyBuZy1jbGljaz1cXCdncmlkLmFwcFNjb3BlLnZtLm15X2FsZXJ0KHJvdy5lbnRpdHkuaWQscm93LmVudGl0eS5pZF9saXN0LDEpXFwnPjwvaT5cIic7XHJcbiAgICAgICAgICAgIHN0ciA9J3tcImZpZWxkXCI6IFwiZWRpdFwiLCBcImVuYWJsZVNvcnRpbmdcIjogZmFsc2UsIFwiZGlzcGxheU5hbWVcIjogXCIuLi5cIiwgXCJ3aWR0aFwiOiAzOCwgXCJjZWxsVGVtcGxhdGVcIjogXCInICsgY2hlICsgJ30nXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0cik7IFxyXG4gICAgICAgICAgICB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzLnB1c2goSlNPTi5wYXJzZShzdHIpKTtcclxuXHJcbiAgICAgICAgICAgIC8q0JTQntCR0JDQktCb0K/QldCcINCa0J3QntCf0JrQoyDQo9CU0JDQm9CV0J3QmNCvKi9cclxuICAgICAgICAgICAgY2hlID0gJzxkaXY+PGkgY2xhc3M9XFwnZmEgZmEtdHJhc2gtbyBidG4gYnRuLWRhbmdlciBidG4tc21cXCcgbmctY2xpY2s9XFwnZ3JpZC5hcHBTY29wZS52bS5teV9hbGVydChyb3cuZW50aXR5LmlkLHJvdy5lbnRpdHkuaWRfbGlzdCwwKVxcJz48L2Rpdj5cIic7XHJcbiAgICAgICAgICAgIHN0ciA9J3tcImZpZWxkXCI6IFwiZGVsZXRlXCIsIFwiZW5hYmxlU29ydGluZ1wiOiBmYWxzZSwgXCJkaXNwbGF5TmFtZVwiOiBcIi4uLlwiLCBcIndpZHRoXCI6IDM4LCBcImNlbGxUZW1wbGF0ZVwiOiBcIicgKyBjaGUgKyAnfSdcclxuICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmcy5wdXNoKEpTT04ucGFyc2Uoc3RyKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IG15TGlzdCA9ICd7XCJ2YWx1ZVwiOiBcIjFcIiwgXCJsYWJlbFwiOiBcItCf0LvQsNC9XCIgfSwgeyBcInZhbHVlXCI6IFwiMlwiLCBcImxhYmVsXCI6IFwi0JIg0L/RgNC+0YbQtdGB0YHQtVwiIH0sIHsgXCJ2YWx1ZVwiOiBcIjNcIiwgXCJsYWJlbFwiOiBcItCT0L7RgtC+0LLQvlwifSdcclxuICAgICAgICAgICAgbGV0IG15U3RhdHVzID0gJ3tcInZhbHVlXCI6IFwiMVwiLCBcImxhYmVsXCI6IFwi0J7QttC40LTQsNC10YJcIiB9LCB7IFwidmFsdWVcIjogXCIyXCIsIFwibGFiZWxcIjogXCLQkiDRgNCw0LHQvtGC0LVcIiB9LCB7IFwidmFsdWVcIjogXCIzXCIsIFwibGFiZWxcIjogXCLQktGL0L/QvtC70L3QtdC90L5cIn0nXHJcbiAgICAgICAgICAgIGxldCBteUZpbHRlcjtcclxuXHJcbiAgICAgICAgICAgIC8v0JTQntCR0JDQktCb0K/QldCc0Jwg0KTQmNCb0KzQotCg0KsgINCYINCe0KLQnNCV0J3Qr9CV0Jwg0KTQmNCb0KzQotCg0Ksg0JTQm9CvINCa0J3QntCf0J7QmlxyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiaWRfbGlzdFwiIHx8IHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJleGVjdXRpb25fc3RhdHVzXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJpZF9saXN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlGaWx0ZXIgPSBteUxpc3RcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlGaWx0ZXIgPSBteVN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gJ3snIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArICdcInR5cGVcIiA6IFwic2VsZWN0XCIsJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnXCJzZWxlY3RPcHRpb25zXCIgIDogWyAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgbXlGaWx0ZXIgXHJcbiAgICAgICAgICAgICAgICAgICAgKyAnXX0nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmlsdGVyID0gSlNPTi5wYXJzZShzdHIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiaWRfbGlzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uY2VsbEZpbHRlciA9ICdpZF9saXN0JztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5jZWxsRmlsdGVyID0gJ2V4ZWN1dGlvbl9zdGF0dXMnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmllbGQgPT0gXCJlZGl0XCIgfHwgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5maWVsZCA9PSBcImRlbGV0ZVwiKSB2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmVuYWJsZUZpbHRlcmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBpZih2bS5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzW2pdLmZpZWxkID09IFwiaWRfdXNlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdm0uZ3JpZE9wdGlvbnMuY29sdW1uRGVmc1tqXS5jZWxsRmlsdGVyID0gJ2lkX3VzZXInO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBkcm9wRG93bjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYodm0udXNlci5pZCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHZtLmFsbFVzZXJzLm1hcChpdGVtID0+IGRyb3BEb3duID0gZHJvcERvd24gKyAne1widmFsdWVcIjogXCInICsgaXRlbS5pZCArICdcIiwgXCJsYWJlbFwiOiBcIicgKyBpdGVtLnVzZXJuYW1lICsgJ1wiIH0sJyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHZtLmFsbFVzZXJzLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGlmKGl0ZW0uaWQgPT0gdm0udXNlci5pZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGRyb3BEb3duID0gZHJvcERvd24gKyAne1widmFsdWVcIjogXCInICsgaXRlbS5pZCArICdcIiwgXCJsYWJlbFwiOiBcIicgKyBpdGVtLnVzZXJuYW1lICsgJ1wiIH0sJ1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICBzdHIgPSAneycgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICsgJ1widHlwZVwiIDogXCJzZWxlY3RcIiwnIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICArICdcInNlbGVjdE9wdGlvbnNcIiAgOiAgWydcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgKyBkcm9wRG93bi5zbGljZSg5LC0xKSBcclxuICAgICAgICAgICAgICAgIC8vICAgICArICddfSc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHZtLmdyaWRPcHRpb25zLmNvbHVtbkRlZnNbal0uZmlsdGVyID0gSlNPTi5wYXJzZShzdHIpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVmcmVzaF9ncmlkKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0uZ2V0UHJvZHVjdExpc3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuZGF0YSA9IHZtLnJlc3VsdFNpbXVsYXRlZERhdGE7XHJcbiAgICAgICAgICAgIHZtLm15U2VsZWN0ZWRSb3dzID0gdm0uZ3JpZEFwaS5zZWxlY3Rpb24uZ2V0U2VsZWN0ZWRSb3dzKCk7IC8vPC0tUHJvcGVydHkgdW5kZWZpbmVkIGVycm9yIGhlcmVcclxuXHJcbiAgICAgICAgICAgIGlmICh2bS5teVNlbGVjdGVkUm93c1swXSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFsO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB2bS5teVNlbGVjdGVkUm93cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWwgPSBhbCArJ9CS0YvQsdGA0LDQvdC+IDogJyArIChpICsgMSkgKyAnINCY0JQgPSAnICsgdm0ubXlTZWxlY3RlZFJvd3NbaV0uaWQgKyAnLCDQm9C40YHRgiA9ICcgKyB2bS5teVNlbGVjdGVkUm93c1tpXS5pZF9saXN0ICsgJy5cXG4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbGVydChhbC5zbGljZSg5KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn0J3QuNGH0LXQs9C+INC90LUg0LLRi9Cx0YDQsNC90L4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHZtLmdyaWRBcGkuc2VsZWN0aW9uLnNlbGVjdGVkUm93KSB7XHJcbiAgICAgICAgICAgICAgICAgIHZtLmdyaWRBcGkuc2VsZWN0aW9uLnNlbGVjdFJvdyh2bS5ncmlkT3B0aW9ucy5kYXRhWzBdKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG15X2FsZXJ0IChpZCwgbCwgdHlwZT0nZGVmJykge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2bS5hbGxVc2Vycyk7XHJcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGVsdGFzY2sgKGwsIGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8v0J3QkNCZ0KLQmCDQndCe0JzQldCgINC/LtC/LiDQrdCi0J4g0J3Qo9CW0J3QniDQotCe0JvQrNCa0J4g0JTQm9CvINCQ0J/QlNCV0JnQotCQINCU0J7QkdCQ0JLQm9CV0J3QndCr0KUg0JfQkNCU0JDQp1xyXG4gICAgICAgICAgICAgICAgbGV0IG4gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB2bVsnbGlzdF8nICsgbF0ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZtWydsaXN0XycgKyBsXVtpXS5pZCA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBlZGl0dGFzY2sgKGwsIGlkLCBuKTtcclxuICAgICAgICAgICAgfTsgICBcclxuICAgICAgICB9O1xyXG4gICAgICBcclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCS0KvQktCe0JTQkCDQodCe0JTQldCg0JbQmNCc0J7Qk9CeINCb0JjQodCi0J7QkiBcclxuICAgICAgICBmdW5jdGlvbiBsb2dNb2RlbHMgKCkge1xyXG4gICAgICAgICAgICB2bS5zb3J0aW5nTG9nID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdm0ucmF3U2NyZWVucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIHZhciBsb2dFbnRyeSA9IHZtLnJhd1NjcmVlbnNbaV0ubWFwKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geC50aXRsZSArICctJyArIHguaWRfbGlzdCArICd8JztcclxuICAgICAgICAgICAgICB9KS5qb2luKCcsICcpO1xyXG4gICAgICAgICAgICAgIGxvZ0VudHJ5ID0gJ2NvbnRhaW5lciAnICsgKGkrMSkgKyAnOiAnICsgbG9nRW50cnk7XHJcbiAgICAgICAgICAgICAgdm0uc29ydGluZ0xvZy5wdXNoKGxvZ0VudHJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0KPQlNCQ0JvQldCd0JjQryDQl9CQ0JTQkNCn0Jgg0JjQlyDQm9CY0KHQotCQKCHQlNCb0K8g0K3QotCe0Jkg0JfQkNCU0JDQp9CYINCd0KPQltCd0J4g0J/QntCU0JrQm9Cu0KfQmNCi0KwgTE9EQVNIICEhISlcclxuICAgICAgICBmdW5jdGlvbiBkZWx0YXNjayAoaSwgaikge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvLyB2bVsnbGlzdF8nICsgaV0uc3BsaWNlKGosIDEpO1xyXG4gICAgICAgICAgICB2bVsnbGlzdF8nICsgaV0uc3BsaWNlKF8uaW5kZXhPZih2bVsnbGlzdF8nICsgaV0sIF8uZmluZCh2bVsnbGlzdF8nICsgaV0sIGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmlkID09PSBqOyB9KSksIDEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodm0udXNlci5pZCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5yZXNqc29udGFza3Muc3BsaWNlKF8uaW5kZXhPZih2bS5yZXNqc29udGFza3MsIF8uZmluZCh2bS5yZXNqc29udGFza3MsIGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmlkID09PSBqOyB9KSksIDEpO1xyXG4gICAgICAgICAgICAgICAgdm0uZ3JpZE9wdGlvbnMuZGF0YSA9IHZtLnJlc2pzb250YXNrcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkX3VzZXIgPT0gdm0udXNlci5pZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzLnNwbGljZShfLmluZGV4T2Yodm0ucmVzanNvbnRhc2tzLCBfLmZpbmQodm0ucmVzanNvbnRhc2tzLCBmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS5pZCA9PT0gajsgfSkpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlZnJlc2hfcmF3U2NyZWVucygpe1xyXG4gICAgICAgICAgICB2bS5yYXdTY3JlZW5zID0gW107XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoZWV0cyh2bS5yZXNnZXRKc29uTGlzdHMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlZnJlc2hfZ3JpZCgpe1xyXG4gICAgICAgICAgICBpZih2bS51c2VyLmlkICE9IDEpIHtcclxuICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmRhdGEgPSB2bS5yZXNqc29udGFza3MuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZF91c2VyID09IHZtLnVzZXIuaWQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZtLmdyaWRPcHRpb25zLmRhdGEgPSB2bS5yZXNqc29udGFza3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciB0YXNja19jb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDQpNCj0J3QmtCm0JjQntCd0JDQmyBhZGR0YXNjayAoaSk6PGJyPlxyXG4gICAgICAgICAqIDEuINCk0J7QoNCc0JjQoNCj0JXQoiDQmNCXINCh0KLQoNCe0JrQmCDQntCR0KrQldCa0KIt0JfQkNCU0JDQp9CjPGJyPiBcclxuICAgICAgICAgKiAyLiDQlNCe0JHQkNCS0JvQr9CV0KIg0J7QkdCq0JXQmtCiINCSIHZtLnJlc2pzb250YXNrcyA8YnI+XHJcbiAgICAgICAgICogMy4g0J7QkdCd0J7QktCb0K/QldCiIHZtLnJhd1NjcmVlbnMg0Jgg0JPQoNCY0JRcclxuICAgICAgICAgKiBAbWV0aG9kIGFkZHRhc2NrXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpINCd0J7QnNCV0KAg0JvQmNCh0KLQkCBEUkFHJkRST1BcclxuICAgICAgICAgKi8gXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQlNCe0JHQkNCS0JvQldCd0JjQryDQl9CQ0JTQkNCn0JggXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkdGFzY2sgKGkpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHZtWydsaXN0XycgKyBpXS5sZW5ndGggPCB2bS50YXNja19saW1pdCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWRkVGFzY2sgPSB2bS5yZXNqc29udGFza3NbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy/QodCe0JfQlNCQ0JXQnCBcItCh0KLQoNCe0JrQntCS0KvQmSDQntCR0KrQldCa0KJcIi0gc3RyINCU0JvQryDQlNCQ0JvQrNCd0JXQmdCo0JXQk9CeIEpTT04ucGFyc2Uoc3RyKVxyXG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9J3snO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrIGluIGFkZFRhc2NrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoayAhPSBcImlkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoayA9PSBcInRpdGxlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICdcIicgKyBrICsgJ1wiJyAgKyAnOiBcIk5ld1Rhc2NrICcgKyBpICsgdGFzY2tfY291bnQgKyAnXCIsJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGsgPT0gXCJpZF9saXN0XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICdcIicgKyBrICsgJ1wiJyAgKyAnOiAnICsgIE51bWJlcihpKSArICcsJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoayA9PSBcImlkX3VzZXJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJ1wiJyArIGsgKyAnXCInICArICc6ICcgKyAgdm0udXNlci5pZCArICcsJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoayA9PSBcImRlc2NyaXB0aW9uXCIgfHwgayA9PSBcImRhdGVcIil7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGsgPT0gXCJkYXRlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnXCInICsgayArICdcIicgKyAnIDogXCIwOC4xMi4yMDE3XCInICsgJywnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7c3RyID0gc3RyICsgJ1wiJyArIGsgKyAnXCInICsgJyA6IFwiMVwiJyArICcsJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGsgIT0gXCIkJGhhc2hLZXlcIikgc3RyID0gc3RyICsgJ1wiJyArIGsgKyAnXCInICsgJyA6IDEnICsgJywnICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnXCJpZFwiIDogJyArIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApICsgJywnIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2UoMCwtMSlcclxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICd9JztcclxuXHJcbiAgICAgICAgICAgICAgICB2bS5yZXNqc29udGFza3MucHVzaChKU09OLnBhcnNlKHN0cikpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlZnJlc2hfcmF3U2NyZWVucygpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlZnJlc2hfZ3JpZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRhc2NrX2NvdW50KytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDQpNCj0J3QmtCm0JjQntCd0JDQmyBlZGl0dGFzY2sgKGksIGosIHRfaW5kZXgpOjxicj5cclxuICAgICAgICAgKiDQntCi0JrQoNCr0KLQmNCVINCX0JDQlNCQ0KfQmCDQlNCb0K8g0J/QntCU0KDQntCR0J3QntCT0J4g0J/QoNCe0KHQnNCe0KLQoNCQINCYINCS0J7Ql9Cc0J7QltCd0J7Qk9CeINCg0JXQlNCQ0JrQotCY0KDQntCS0JDQndCY0K9cclxuICAgICAgICAgKiBAbWV0aG9kIGVkaXR0YXNja1xyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaSDQndCe0JzQldCgINCb0JjQodCi0JAgRFJBRyZEUk9QXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBqIGlkINCX0JDQlNCQ0KfQmFxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gdF9pbmRleCDQn9Ce0KDQr9CU0JrQntCS0KvQmSDQndCe0JzQldCgINCX0JDQlNCQ0KfQmCDQkiBEUkFHJkRST1BcclxuICAgICAgICAgKi9cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCf0KDQntCh0JzQntCi0KDQkCDQl9CQ0JTQkNCn0JggXHJcbiAgICAgICAgZnVuY3Rpb24gZWRpdHRhc2NrIChpLCBqLCB0X2luZGV4KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIC8v0KTQmNCb0KzQotCg0KPQldCcINCf0J4g0JvQmNCh0KLQoyDQmCDQmNCUINCX0JDQlNCQ0KfQmFxyXG4gICAgICAgICAgICBsZXQgZiA9IF8uZmluZCh2bVsnbGlzdF8nICsgaV0sIGZ1bmN0aW9uIChpdGVtKXsgcmV0dXJuIGl0ZW0uaWQgPT09IGo7fSk7XHJcblxyXG4gICAgICAgICAgICAvL9CS0KHQlSBcItCa0JvQrtCn0JhcIiDQoSDQlNCQ0J3QndCr0JzQmCDQl9CQ0JPQntCd0K/QldCcINCSINCf0JXQoNCV0JzQldCd0J3Qq9CVINCk0J7QoNCc0KtcclxuICAgICAgICAgICAgZm9yKGxldCBrIGluIGYpIHtcclxuICAgICAgICAgICAgICAgIHZtWydodG1sXycgKyBrXSA9IGZba107XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZtWydodG1sX3RfaW5kZXgnXSA9IHRfaW5kZXggKyAxO1xyXG5cclxuICAgICAgICAgICAgLy/QntCi0JrQoNCr0JLQkNCV0JzQnCDQlNCY0JDQm9Ce0JPQntCS0J7QlSDQntCa0J3QnlxyXG4gICAgICAgICAgICAkKFwiI29wZW5Nb2RhbFwiKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlX2xpc3QoKXtcclxuICAgICAgICAgICAgdm0uY2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDQpNCj0J3QmtCm0JjQntCd0JDQmyBmaW5kX2luZGV4X2J5X2lkKHNvdXJjZSwgaWQpIDo8YnI+XHJcbiAgICAgICAgICog0J/QntCY0KHQmiDQmNCd0JTQldCa0KHQkCDQl9CQ0JTQkNCn0Jgg0JIg0JzQkNCh0KHQmNCS0JUg0J/QldCg0JXQlNCQ0J3QndCe0JPQniDQntCR0KrQldCa0KLQkCAtIHNvdXJjZSDQn9CeINCf0JXQoNCV0JTQkNCd0J3QntCc0KMgaWRcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZpbmRfaW5kZXhfYnlfaWQoc291cmNlLGlkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXhlcyA9ICQubWFwKHNvdXJjZSwgZnVuY3Rpb24ob2JqLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob2JqLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXhlc1swXTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICogQG1ldGhvZCBmaW5kX2luZGV4X2J5X2lkXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSDQnNCQ0KHQodCY0JIg0J7QkdCq0JXQmtCi0J7QklxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggaWQg0JfQkNCU0JDQp9CYXHJcbiAgICAgICAgICogQHJldHVybiB7SW50ZWdlcn0g0J3QkNCZ0JTQldCd0J3Qq9CZINCY0J3QlNCV0JrQoVxyXG4gICAgICAgICAqLyBcclxuICAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQn9Ce0JjQodCa0JAg0J/QniDQmNCUXHJcbiAgICAgICAgZnVuY3Rpb24gZmluZF9pbmRleF9ieV9pZChzb3VyY2UsaWQpe1xyXG4gICAgICAgICAgICBsZXQgaW5kZXhlcyA9ICQubWFwKHNvdXJjZSwgZnVuY3Rpb24ob2JqLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG9iai5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgIHJldHVybiBpbmRleGVzWzBdO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAbWV0aG9kIHNhdmV0YXNja1xyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDQpNCj0J3QmtCm0JjQntCd0JDQmyBzYXZldGFzY2soKSA6PGJyPlxyXG4gICAgICAgICAqIDEuINCf0J7QmNCh0Jog0JjQndCU0JXQmtCh0JAg0JfQkNCU0JDQp9CYINCSINCc0JDQodCh0JjQktCVIHZtLnJlc2pzb250YXNrczxicj4gXHJcbiAgICAgICAgICogMi4g0J7QkdCd0J7QktCb0JXQndCY0JUg0J/QntCb0JXQmSDQkiDQl9CQ0JTQkNCn0JUgKNCY0Jcg0JzQkNCh0KHQmNCS0JAgdm0ucmVzanNvbnRhc2tzKTxicj5cclxuICAgICAgICAgKiAzLiDQldCh0JvQmCDQkdCr0Jsg0JjQl9Cc0JXQndCV0J0g0KHQotCQ0KLQo9ChINCX0JDQlNCQ0KfQmCAtINCe0JHQndCe0JLQm9CV0J3QmNCVINCc0JDQodCh0JjQktCQIHZtLnJhd1NjcmVlbnM8YnI+XHJcbiAgICAgICAgICovIFxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0KHQntCl0KDQkNCd0JXQndCY0K8g0JfQkNCU0JDQp9CYXHJcbiAgICAgICAgZnVuY3Rpb24gc2F2ZXRhc2NrIChpLCBqLCB0X2luZGV4KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmKGNvbmZpcm0oXCLQodC+0YXRgNCw0L3QuNGC0Yw/XCIpID09IHRydWUpe1xyXG5cclxuICAgICAgICAgICAgICAgIC8v0J3QkNCl0J7QlNCY0Jwg0J/QniBpZCAoaikg0JjQndCU0JXQmtChINCX0JDQlNCQ0KfQmCDQkiDQnNCQ0KHQodCY0JLQlSB2bS5yZXNqc29udGFza3NcclxuICAgICAgICAgICAgICAgIGxldCBmaXJzdEluZGV4ID0gZmluZF9pbmRleF9ieV9pZCh2bS5yZXNqc29udGFza3MsIGopO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvcihsZXQgayBpbiB2bS5yZXNqc29udGFza3NbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihrICE9IFwiJCRoYXNoS2V5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoayA9PSBcImRhdGVcIiB8fCBrID09IFwidGl0bGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoayA9PSBcImRhdGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnJlc2pzb250YXNrc1tmaXJzdEluZGV4XVtcImRhdGVcIl0gPSAgJCgnI2R0cGNrcicpWzBdLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzW2ZpcnN0SW5kZXhdW1widGl0bGVcIl0gPSAkKCcjdHRsJylbMF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJCgnI3R0bCcpWzBdLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ucmVzanNvbnRhc2tzW2ZpcnN0SW5kZXhdW2tdID0gdm1bJ2h0bWxfJyArIGtdOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLyo/INCh0J/QldCm0JjQkNCb0KzQndCeINCU0JvQryDQntCR0J3QntCS0JvQldCd0JjQryAhISEg0KLQntCb0KzQmtCeINCU0J7QkdCQ0JLQm9CV0J3QndCr0KUg0JfQkNCU0JDQpyDQkiBkcmFnJmRyb3AgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdm1bJ2xpc3RfJyArIGldW3RfaW5kZXggLSAxXVtrXSA9IHZtWydodG1sXycgKyBrXTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2bS5jaGFuZ2UgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codm0uY2hhbmdlKTtcclxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Jhd1NjcmVlbnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaF9ncmlkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZtLmNoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZtLmNoYW5nZSk7ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2bS5yZXNqc29udGFza3MpO1xyXG4gICAgICAgICAgICAkKFwiLm1vZGFsRGlhbG9nXCIpLmZhZGVUb2dnbGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF0ZSgpe1xyXG4gICAgICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgZGQgPSB0b2RheS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBtbSA9IHRvZGF5LmdldE1vbnRoKCkrMTsgLy9KYW51YXJ5IGlzIDAhXHJcbiAgICAgICAgICAgIHZhciB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGRkPDEwKSB7IGRkPScwJytkZCB9O1xyXG5cclxuICAgICAgICAgICAgaWYobW08MTApIHsgbW09JzAnK21tIH07XHJcblxyXG4gICAgICAgICAgICB0b2RheSA9IG1tKydfJytkZCsnXycreXl5eTtcclxuICAgICAgICAgICAgcmV0dXJuIHRvZGF5XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQrdCa0KHQn9Ce0KDQotCQINCT0KDQmNCU0JAg0JIgUERGXHJcbiAgICAgICAgZnVuY3Rpb24gZXhwb3J0UERGICgpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdm0uZ3JpZEFwaS5leHBvcnRlci5wZGZFeHBvcnQodWlHcmlkRXhwb3J0ZXJDb25zdGFudHMuVklTSUJMRSwgdWlHcmlkRXhwb3J0ZXJDb25zdGFudHMuVklTSUJMRSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQrdCa0KHQn9Ce0KDQotCQINCT0KDQmNCU0JAg0JIgRVhFTFxyXG4gICAgICAgIGZ1bmN0aW9uIGV4cG9ydENTViAoKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBleHBvcnRTZXJ2aWNlID0gdWlHcmlkRXhwb3J0ZXJTZXJ2aWNlO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZCA9IHZtLmdyaWRBcGkuZ3JpZDtcclxuICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gZ2V0RGF0ZSgpICsgXCIuY3N2XCI7XHJcblxyXG4gICAgICAgICAgICBleHBvcnRTZXJ2aWNlLmxvYWRBbGxEYXRhSWZOZWVkZWQoZ3JpZCwgdWlHcmlkRXhwb3J0ZXJDb25zdGFudHMuVklTSUJMRSwgdWlHcmlkRXhwb3J0ZXJDb25zdGFudHMuVklTSUJMRSkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHBvcnRDb2x1bW5IZWFkZXJzID0gZXhwb3J0U2VydmljZS5nZXRDb2x1bW5IZWFkZXJzKGdyaWQsIHVpR3JpZEV4cG9ydGVyQ29uc3RhbnRzLlZJU0lCTEUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4cG9ydERhdGEgPSBleHBvcnRTZXJ2aWNlLmdldERhdGEoZ3JpZCwgdWlHcmlkRXhwb3J0ZXJDb25zdGFudHMuVklTSUJMRSwgdWlHcmlkRXhwb3J0ZXJDb25zdGFudHMuVklTSUJMRSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3N2Q29udGVudCA9IGV4cG9ydFNlcnZpY2UuZm9ybWF0QXNDc3YoZXhwb3J0Q29sdW1uSGVhZGVycywgZXhwb3J0RGF0YSwgZ3JpZC5vcHRpb25zLmV4cG9ydGVyQ3N2Q29sdW1uU2VwYXJhdG9yID0gJzsnKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBvcnRTZXJ2aWNlLmRvd25sb2FkRmlsZShmaWxlTmFtZSwgY3N2Q29udGVudCwgZ3JpZC5vcHRpb25zLmV4cG9ydGVyT2xkZXJFeGNlbENvbXBhdGliaWxpdHkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfQl9Cw0LPRgNGD0LfQuNGC0YHRjyDRhNCw0LnQuyAnICsgZmlsZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgLy8g0JXRgdC70Lgg0LHRg9C00YPRgiDQvtGC0YDQsNC20LDRgtGM0YHRjyDQutGA0LDQutC+0LfRj9Cx0YDRiyAtINC+0YLQutGA0YvRgtGMINGE0LDQudC7INCyIG5vdGVwYWQrKyDQuCDQstGL0LHQtdGA0LjRgtC1IFwi0L/RgNC10L7QsdGA0LDQt9C+0LLQsNGC0Ywg0LIgQU5TSVwiLiBcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coY3N2Q29udGVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLmFkZHJlc3NcclxuICAgICAgICBmdW5jdGlvbiBhZGRyZXNzKCl7XHJcbiAgICAgICAgICAgICQoJyNhZGRyZXNzJykuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bmNBKCl7IGFsZXJ0KCdzZW5kJyk7IH07XHJcblxyXG4gICAgICAgIC8v0J7QotCf0KDQkNCS0JrQkCDQn9CY0KHQldCcIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdtYWlsKCl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBleHBvcnRTZXJ2aWNlID0gdWlHcmlkRXhwb3J0ZXJTZXJ2aWNlO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZCA9IHZtLmdyaWRBcGkuZ3JpZDtcclxuXHJcbiAgICAgICAgICAgIGV4cG9ydFNlcnZpY2UubG9hZEFsbERhdGFJZk5lZWRlZChncmlkLCB1aUdyaWRFeHBvcnRlckNvbnN0YW50cy5WSVNJQkxFLCB1aUdyaWRFeHBvcnRlckNvbnN0YW50cy5WSVNJQkxFKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4cG9ydENvbHVtbkhlYWRlcnMgPSBleHBvcnRTZXJ2aWNlLmdldENvbHVtbkhlYWRlcnMoZ3JpZCwgdWlHcmlkRXhwb3J0ZXJDb25zdGFudHMuVklTSUJMRSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwb3J0RGF0YSA9IGV4cG9ydFNlcnZpY2UuZ2V0RGF0YShncmlkLCB1aUdyaWRFeHBvcnRlckNvbnN0YW50cy5WSVNJQkxFLCB1aUdyaWRFeHBvcnRlckNvbnN0YW50cy5WSVNJQkxFKTtcclxuICAgICAgICAgICAgICAgIHZtLmNzdkNvbnRlbnQgPSBleHBvcnRTZXJ2aWNlLmZvcm1hdEFzQ3N2KGV4cG9ydENvbHVtbkhlYWRlcnMsIGV4cG9ydERhdGEsIGdyaWQub3B0aW9ucy5leHBvcnRlckNzdkNvbHVtblNlcGFyYXRvciA9ICc7Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogXCIuLi9tYWlsLnBocFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiAoe3RvOiB2bS5tYWlsQWRkcmVzcywgc3ViOiBcIkV4cG9ydFwiLCBlbWFpbGJvZHk6IHZtLmdyaWRPcHRpb25zLmRhdGF9KSxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImh0bWxcIixcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmNBIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJyNhZGRyZXNzJykuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQktCr0KXQntCU0JAg0JjQlyBtb2RhbERpYWxvZyDQkdCV0Jcg0KHQntCl0KDQkNCd0JXQndCY0K8g0JTQkNCd0J3Qq9Cl0KVcclxuICAgICAgICBmdW5jdGlvbiBleGl0X21vZGFsKCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKFwiLm1vZGFsRGlhbG9nXCIpLmZhZGVUb2dnbGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBkZWZfY2xpY2soKXtldmVudC5wcmV2ZW50RGVmYXVsdCgpO307XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0KHQmtCg0KvQotCY0K8g0JjQndCU0JjQmtCQ0KLQntCg0JAg0J7QltCY0JTQkNCd0JjQr1xyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmlzaF9sb2FkZXIoKXtcclxuICAgICAgICAgICAgaWYgKCQoXCIjbG9hZGVyXCIpLmlzKFwiOnZpc2libGVcIikpe1xyXG4gICAgICAgICAgICAgICAgJChcIiNsb2FkZXJcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QpNCj0J3QmtCm0JjQryDQktCY0JfQo9CQ0JvQmNCX0JDQptCY0Jgg0JjQndCU0JjQmtCQ0KLQntCg0JAg0J7QltCY0JTQkNCd0JjQr1xyXG4gICAgICAgIGZ1bmN0aW9uIHN0YXJ0X2xvYWRlcigpe1xyXG4gICAgICAgICAgICBpZiAoISQoXCIjbG9hZGVyXCIpLmlzKFwiOnZpc2libGVcIikpe1xyXG4gICAgICAgICAgICAgICAgJChcIiNsb2FkZXJcIikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0JfQkNCT0KDQo9CX0JrQmCDQotCV0JrQo9Cp0JXQk9CeINCu0JfQldCg0JAgXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZEN1cnJlbnRVc2VyKCkge1xyXG4gICAgICAgICAgICBVc2VyU2VydmljZS5HZXRCeVVzZXJuYW1lKCRyb290U2NvcGUuZ2xvYmFscy5jdXJyZW50VXNlci51c2VybmFtZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9Ck0KPQndCa0KbQmNCvINCX0JDQk9Cg0KPQl9Ca0Jgg0JLQodCV0KUg0K7Ql9CV0KDQntCSIFxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRBbGxVc2VycygpIHtcclxuICAgICAgICAgICAgVXNlclNlcnZpY2UuR2V0QWxsKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmFsbFVzZXJzID0gdXNlcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgSG9tZVNlcnZpY2UuVXNlcnMgPSB2bS5hbGxVc2VycztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v0KTQo9Cd0JrQptCY0K8g0KPQlNCQ0JvQldCd0JjQryDQrtCX0JXQoNCQIFxyXG4gICAgICAgIGZ1bmN0aW9uIGRlbGV0ZVVzZXIoaWQpIHtcclxuICAgICAgICAgICAgVXNlclNlcnZpY2UuRGVsZXRlKGlkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRBbGxVc2VycygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qPT09PT09PT09PT09PT09PT09PdCk0JjQm9Cs0KLQoNCrINCU0JvQryDQl9CQ0JzQldCd0Ksg0JTQkNCd0J3Qq9ClINCSINCT0KDQmNCU0JU9PT09PT09PT09PT09PT09PT09Ki9cclxuXHJcbiAgICAvL9Ca0J7QndCS0JXQoNCi0JDQptCY0K8g0JzQkNCh0KHQmNCS0JAg0J7QkdCq0JXQmtCi0J7QkiDQkiDQntCR0KrQldCa0KIg0JTQm9CvINCk0JjQm9Cs0KLQoNCe0JJcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZV9vYmpfZm9yX2ZpbHRlcihvYmosIG9ial9pZCwgb2JqX2ZpZWxkKXtcclxuICAgICAgICBsZXQgb2JqRmlsdGVyID0gJ3snO1xyXG4gICAgICAgIGZvcihsZXQgaj0wOyBqIDwgb2JqLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgb2JqRmlsdGVyID0gb2JqRmlsdGVyICsgJ1wiJyArIG9ialtqXVtvYmpfaWRdICsgJ1wiJyArICc6ICcgKyAnXCInICsgb2JqW2pdW29ial9maWVsZF0gKyAnXCInICsgJywgJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iakZpbHRlciA9IG9iakZpbHRlci5zbGljZSgwLC0yKSArICd9JztcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShvYmpGaWx0ZXIpXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvL9CX0JDQnNCV0J3QkCDQlNCQ0J3QndCr0KUg0JIg0JPQoNCY0JTQlSAo0J/QntCb0JUgLSBpZF9saXN0KVxyXG4gICAgZnVuY3Rpb24gaWRfbGlzdCAoKXtcclxuXHJcbiAgICAgICAgdmFyIGlkX2xpc3RIYXNoID0ge1xyXG4gICAgICAgICAgICAxOiBcItCf0LvQsNC9XCIsIFxyXG4gICAgICAgICAgICAyOiBcItCSINC/0YDQvtGG0LXRgdGB0LVcIiwgXHJcbiAgICAgICAgICAgIDM6IFwi0JPQvtGC0L7QstC+XCIgXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmICghaW5wdXQpe1xyXG4gICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gaWRfbGlzdEhhc2hbaW5wdXRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8v0JfQkNCc0JXQndCQINCU0JDQndCd0KvQpSDQkiDQk9Cg0JjQlNCVICjQn9Ce0JvQlSAtIGV4ZWN1dGlvbl9zdGF0dXMpXHJcbiAgICBmdW5jdGlvbiBleGVjdXRpb25fc3RhdHVzKCl7XHJcbiAgICAgICAgdmFyIGV4ZWN1dGlvbl9zdGF0dXNIYXNoID0ge1xyXG4gICAgICAgICAgICAxOiBcItCe0LbQuNC00LDQtdGCXCIsIFxyXG4gICAgICAgICAgICAyOiBcItCSINGA0LDQsdC+0YLQtVwiLCBcclxuICAgICAgICAgICAgMzogXCLQktGL0L/QvtC70L3QtdC90L5cIiBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgICAgICAgICBpZiAoIWlucHV0KXtcclxuICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGV4ZWN1dGlvbl9zdGF0dXNIYXNoW2lucHV0XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIC8v0JfQkNCc0JXQndCQINCU0JDQndCd0KvQpSDQkiDQk9Cg0JjQlNCVICjQn9Ce0JvQlSAtIGlkX3VzZXIpXHJcbiAgICAvLyBmdW5jdGlvbiBpZF91c2VyKEhvbWVTZXJ2aWNlKXtcclxuICAgIC8vICAgICB2YXIgaWRfdXNlcnRIYXNoID0gY3JlYXRlX29ial9mb3JfZmlsdGVyKEhvbWVTZXJ2aWNlLlVzZXJzLCAnaWQnLCAndXNlcm5hbWUnKTtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhpZF91c2VydEhhc2gpO1xyXG4gICAgLy8gICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgLy8gICAgICAgICBpZiAoIWlucHV0KXtcclxuICAgIC8vICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgcmV0dXJuIGlkX3VzZXJ0SGFzaFtpbnB1dF07XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9O1xyXG4gICAgLy8gfVxyXG5cclxufSkoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvYXNzZXRzL2hvbWUvaG9tZS5jb250cm9sbGVyLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBOzs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBS0E7QUFDQTtBQXpCQTtBQUNBO0FBMkJBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==