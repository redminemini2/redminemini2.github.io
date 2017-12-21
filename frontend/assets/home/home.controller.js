(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)
        .filter('id_list', id_list)
        .filter('execution_status', execution_status)
        .filter('id_user', id_user)

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

    HomeController.$inject = ['UserService', 'JsonService', 'uiGridConstants','$rootScope', '$timeout'];

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
    /*=====================================================================*/
        
        $('#dtpckr').datepicker();

        var gridnameJsonLists = [];
        let curUser = false;
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
        function getJsonGridname(){
            gridnameJsonLists = JsonService.getResultFromJson('db/gridname.json')
        };

        //ФУНКЦИЯ ИМПОРТА СПИСКА ЛИСТОВ
        function getJsonLists(){
            vm.resgetJsonLists = JsonService.getResultFromJson('db/listsName.json')
            JsonService.list = vm.resgetJsonLists;
        };

        //ФУНКЦИЯ ИМПОРТА СПИСКА ЗАДАЧ
        function getJsonTasks(){
            vm.resjsontasks = JsonService.getResultFromJson('db/tasks.json')
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
        function makeList (id_list) {
            var filter_resjsontasks = [];
            if(vm.user.id != 1) {
                filter_resjsontasks = vm.resjsontasks.filter(item => item.id_list == id_list && item.id_user == vm.user.id);
            }else{
                filter_resjsontasks = vm.resjsontasks.filter(item => item.id_list == id_list);
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
                showGridFooter:true,
                onRegisterApi: function(gridApi){
                  vm.gridApi = gridApi;
                },
                columnDefs: []
            };

            let str;

            /* СОРТИРУЕМ gridnameJsonLists ДЛЯ ОТОБРАЖЕНИЯ СТОЛБЦОВ ЗАДАЧ В СООТВЕТСТВИЕ С ПОЛЕМ sort gridnameJsonLists */
            let tt = gridnameJsonLists.sort((a,b) => a.sort - b.sort);

            /*ДЛЯ ОТОБРАЖЕНИЯ В ТАБЛИЦЕ СОЗДАЕМ "СТРОКОВЫЙ ОБЪЕКТ"- str
            И ПУШИМ ЕГО В columnDefs*/
            for(let j=0; j < tt.length; j++){
                if(tt[j].id != "$$hashKey") {
                        str = '{"field" : "' + tt[j].id + '"' + ',' + '"displayName" : "' + gridnameJsonLists[j].gridname + '"}' 
                        vm.gridOptions.columnDefs.push(JSON.parse(str)); 
                };
            };

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

            /*ДОБАВЛЯЕМ КНОПКУ РЕДАКТИРОВАНИЯ*/
            let che = '<i class=\'fa fa-pencil-square-o btn btn-success btn-sm\' ng-click=\'grid.appScope.vm.my_alert(row.entity.id,row.entity.id_list,1)\'></i>"';
            str ='{"field": "edit", "enableSorting": false, "displayName": "...", "width": 38, "cellTemplate": "' + che + '}'
            // console.log(str); 
            vm.gridOptions.columnDefs.push(JSON.parse(str));

            /*ДОБАВЛЯЕМ КНОПКУ УДАЛЕНИЯ*/
            che = '<div><i class=\'fa fa-trash-o btn btn-danger btn-sm\' ng-click=\'grid.appScope.vm.my_alert(row.entity.id,row.entity.id_list,0)\'></div>"';
            str ='{"field": "delete", "enableSorting": false, "displayName": "...", "width": 38, "cellTemplate": "' + che + '}'
            vm.gridOptions.columnDefs.push(JSON.parse(str));


            let myList = '{"value": "1", "label": "План" }, { "value": "2", "label": "В процессе" }, { "value": "3", "label": "Готово"}'
            let myStatus = '{"value": "1", "label": "Ожидает" }, { "value": "2", "label": "В работе" }, { "value": "3", "label": "Выполнено"}'
            let myFilter;

            //ДОБАВЛЯЕММ ФИЛЬТРЫ  И ОТМЕНЯЕМ ФИЛЬТРЫ ДЛЯ КНОПОК
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

            refresh_grid();
        };

        vm.getProductList = function() {
            vm.gridOptions.data = vm.resultSimulatedData;
            vm.mySelectedRows = vm.gridApi.selection.getSelectedRows(); //<--Property undefined error here

            if (vm.mySelectedRows[0]) {
                let al;
                for(let i=0; i < vm.mySelectedRows.length; i++){
                    al = al +'Выбрано : ' + (i + 1) + ' ИД = ' + vm.mySelectedRows[i].id + ', Лист = ' + vm.mySelectedRows[i].id_list + '.\n'
                }
                alert(al.slice(9));
            } else {
                alert('Ничего не выбрано');
            }

            $timeout(function() {
              if (vm.gridApi.selection.selectedRow) {
                  vm.gridApi.selection.selectRow(vm.gridOptions.data[0]);
              }
            });
        };

        function my_alert (id, l, type='def') {
            // console.log(vm.allUsers);
            if(type == 0) {
                deltasck (l, id);
            }
            if(type == 1) {
                //НАЙТИ НОМЕР п.п. ЭТО НУЖНО ТОЛЬКО ДЛЯ АПДЕЙТА ДОБАВЛЕННЫХ ЗАДАЧ
                let n = null;
                for(let i=0; i < vm['list_' + l].length; i++){
                    if(vm['list_' + l][i].id == id){
                        n = i;
                    }
                };
                edittasck (l, id, n);
            };   
        };
      
        //ФУНКЦИЯ ВЫВОДА СОДЕРЖИМОГО ЛИСТОВ 
        function logModels () {
            vm.sortingLog = [];
            for (let i = 0; i < vm.rawScreens.length; i++) {
              var logEntry = vm.rawScreens[i].map(function (x) {
                return x.title + '-' + x.id_list + '|';
              }).join(', ');
              logEntry = 'container ' + (i+1) + ': ' + logEntry;
              vm.sortingLog.push(logEntry);
            }
        };

        //ФУНКЦИЯ УДАЛЕНИЯ ЗАДАЧИ ИЗ ЛИСТА(!ДЛЯ ЭТОЙ ЗАДАЧИ НУЖНО ПОДКЛЮЧИТЬ LODASH !!!)
        function deltasck (i, j) {
            event.preventDefault();
            // vm['list_' + i].splice(j, 1);
            vm['list_' + i].splice(_.indexOf(vm['list_' + i], _.find(vm['list_' + i], function (item) { return item.id === j; })), 1);
            
            if(vm.user.id != 1) {
                vm.resjsontasks.splice(_.indexOf(vm.resjsontasks, _.find(vm.resjsontasks, function (item) { return item.id === j; })), 1);
                vm.gridOptions.data = vm.resjsontasks.filter(item => item.id_user == vm.user.id);
            }else{
                vm.resjsontasks.splice(_.indexOf(vm.resjsontasks, _.find(vm.resjsontasks, function (item) { return item.id === j; })), 1);
            }
        };

        function refresh_rawScreens(){
            vm.rawScreens = [];
            createSheets(vm.resgetJsonLists);
        };

        function refresh_grid(){
            if(vm.user.id != 1) {
                vm.gridOptions.data = vm.resjsontasks.filter(item => item.id_user == vm.user.id);
            }else{
                vm.gridOptions.data = vm.resjsontasks
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
        function addtasck (i) {
            event.preventDefault();

            if(vm['list_' + i].length < vm.tasck_limit){
                var addTasck = vm.resjsontasks[0];

                //СОЗДАЕМ "СТРОКОВЫЙ ОБЪЕКТ"- str ДЛЯ ДАЛЬНЕЙШЕГО JSON.parse(str)
                let str ='{';
                for(let k in addTasck) {
                    if(k != "id") {
                        if(k == "title") {
                            str = str + '"' + k + '"'  + ': "NewTasck ' + i + tasck_count + '",'
                        }else{
                            if(k == "id_list"){
                                str = str + '"' + k + '"'  + ': ' +  Number(i) + ','
                            }else if(k == "id_user"){
                                str = str + '"' + k + '"'  + ': ' +  vm.user.id + ','
                            }else if(k == "description" || k == "date"){ 
                                if(k == "date"){
                                    str = str + '"' + k + '"' + ' : "08.12.2017"' + ','
                                }else{str = str + '"' + k + '"' + ' : "1"' + ','}
                            }else{
                                if(k != "$$hashKey") str = str + '"' + k + '"' + ' : 1' + ','   
                            }
                        }
                    }else{
                       str = str + '"id" : ' + Math.floor(Date.now() / 1000) + ',' 
                    }
                };
                str = str.slice(0,-1)
                str = str + '}';

                vm.resjsontasks.push(JSON.parse(str));

                refresh_rawScreens();

                refresh_grid();

                tasck_count++
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
        function edittasck (i, j, t_index) {
            event.preventDefault();
            //ФИЛЬТРУЕМ ПО ЛИСТУ И ИД ЗАДАЧИ
            let f = _.find(vm['list_' + i], function (item){ return item.id === j;});

            //ВСЕ "КЛЮЧИ" С ДАННЫМИ ЗАГОНЯЕМ В ПЕРЕМЕННЫЕ ФОРМЫ
            for(let k in f) {
                vm['html_' + k] = f[k];
            };
            vm['html_t_index'] = t_index + 1;

            //ОТКРЫВАЕММ ДИАЛОГОВОЕ ОКНО
            $("#openModal").fadeToggle();
        };

        function change_list(){
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
        function find_index_by_id(source,id){
            let indexes = $.map(source, function(obj, index) {
                    if(obj.id == id) {
                        return index;
                    }
                }) 
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
        function savetasck (i, j, t_index) {
            event.preventDefault();
            if(confirm("Сохранить?") == true){

                //НАХОДИМ ПО id (j) ИНДЕКС ЗАДАЧИ В МАССИВЕ vm.resjsontasks
                let firstIndex = find_index_by_id(vm.resjsontasks, j);

                for(let k in vm.resjsontasks[0]) {
                    if(k != "$$hashKey") {
                        if(k == "date" || k == "title") {
                            if(k == "date") {
                                vm.resjsontasks[firstIndex]["date"] =  $('#dtpckr')[0].value;
                            }else{
                                vm.resjsontasks[firstIndex]["title"] = $('#ttl')[0].value;
                                // console.log($('#ttl')[0].value);
                            }
                        }else{
                          vm.resjsontasks[firstIndex][k] = vm['html_' + k];  
                        }
                        /*? СПЕЦИАЛЬНО ДЛЯ ОБНОВЛЕНИЯ !!! ТОЛЬКО ДОБАВЛЕННЫХ ЗАДАЧ В drag&drop */
                        // vm['list_' + i][t_index - 1][k] = vm['html_' + k];
                    };
                };

                if(vm.change == true){
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

        function def_click(){event.preventDefault();};

        //ФУНКЦИЯ СКРЫТИЯ ИНДИКАТОРА ОЖИДАНИЯ
        function finish_loader(){
            if ($("#loader").is(":visible")){
                $("#loader").fadeToggle();
            }
        };

        //ФУНКЦИЯ ВИЗУАЛИЗАЦИИ ИНДИКАТОРА ОЖИДАНИЯ
        function start_loader(){
            if (!$("#loader").is(":visible")){
                $("#loader").fadeToggle();
            }
        };

         //ФУНКЦИЯ ЗАГРУЗКИ ТЕКУЩЕГО ЮЗЕРА 
        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        };

        //ФУНКЦИЯ ЗАГРУЗКИ ВСЕХ ЮЗЕРОВ 
        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                    JsonService.Users = vm.allUsers;
                });
        };

        //ФУНКЦИЯ УДАЛЕНИЯ ЮЗЕРА 
        function deleteUser(id) {
            UserService.Delete(id)
                .then(function () {
                    loadAllUsers();
                });
        };

    };

    /*===================ФИЛЬТРЫ ДЛЯ ЗАМЕНЫ ДАННЫХ В ГРИДЕ===================*/

    //КОНВЕРТАЦИЯ МАССИВА ОБЪЕКТОВ В ОБЪЕКТ ДЛЯ ФИЛЬТРОВ
    function create_obj_for_filter(obj, obj_id, obj_field){
        let objFilter = '{';
        for(let j=0; j < obj.length; j++){
            objFilter = objFilter + '"' + obj[j][obj_id] + '"' + ': ' + '"' + obj[j][obj_field] + '"' + ', '
        };

        objFilter = objFilter.slice(0,-2) + '}';
        return JSON.parse(objFilter)
    };


    //ЗАМЕНА ДАННЫХ В ГРИДЕ (ПОЛЕ - id_list)
    function id_list (JsonService){
        var id_listHash = create_obj_for_filter(JsonService.list, 'id', 'name') 

        return function(input) {
            if (!input){
              return '';
            } else {
              return id_listHash[input];
            }
        };
    };


    //ЗАМЕНА ДАННЫХ В ГРИДЕ (ПОЛЕ - execution_status)
    function execution_status(JsonService){
        var execution_statusHash = JsonService.status;

        return function(input) {
            if (!input){
              return '';
            } else {
              return execution_statusHash[input];
            }
        };
    };

    //ЗАМЕНА ДАННЫХ В ГРИДЕ (ПОЛЕ - id_user)
    function id_user(JsonService){
        var id_usertHash = create_obj_for_filter(JsonService.Users, 'id', 'username')

        return function(input) {
            if (!input){
              return '';
            } else {
              return id_usertHash[input];
            }
        };
    }

})();