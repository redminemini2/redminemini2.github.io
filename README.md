# ![#c5f015](https://placehold.it/15/c5f015/000000?text='') redminemini2
## nvm use 8.9.1 (работал на NODE 8.9.1)
## yarn install

## ПРИЛОЖЕНИЕ РАЗРАБАТЫВАЛ ИСПОЛЬЗУЯ (Windows!!!/Chrome!!!/Node v8.9.1):<br>
1. gulp;<br>
2. webpack;<br>
3. browser-sync;<br>
4. angularjs;<br>
5. yuidoc;

## ТОЧКА ВХОДА - ФАЙЛ frontend/js/app.js (самовызывающаяся функция).
## gulp. Запускает батники (Windows!!!):
1. set "NODE_ENV=development"
2. gulp dev_replace&gulp develop

### gulp dev
#### В режиме dev реализованы: logger || .styl =>.css || sourcemaps || browserSync - перезагрузка при изменениях || браузер откроется самостоятельно

### gulp prod
#### В режиме prod реализованы: .styl =>.css || минимизация || добавление хеша в название файлов || прописывание путей с хешом в html файле || браузер откроется самостоятельно

### [Сайт приложения](https://redminemini2.github.io/public)
### [YUIDOC-Описание основных моментов приложения](https://redminemini2.github.io/frontend/out/modules/app.html)
### [Репозиторий приложения - README](https://github.com/redminemini2/redminemini2.github.io)

#### 0. Для входа нужно зарегистрированться и затем залогиниться
#### 1. Первый пользоатель получит права админа - будет видеть все задачи и всех пользователей
#### 2. Задачи созданы для первых двух пользователей. Второй пользователь видит себя (в фильтре) и только свои задачи
#### 3. Задачи представлены в виде DRAG&DROP и UI-GRID
#### 4. Задачи можно добавлять, просматривать, редактировать, удалять, сортировать, фильтровать, перемещать (DRAG&DROP)