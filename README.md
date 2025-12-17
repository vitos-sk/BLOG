BLOG — Full-Stack Blog App

Full-stack блог-приложение с разделением на frontend и backend. Проект показывает практические навыки работы с React, REST API, Node.js и архитектурой реального приложения.

Что умеет приложение
	•	Получение списка постов
	•	Просмотр одного поста
	•	Создание поста
	•	Редактирование поста
	•	Удаление поста
	•	Работа через REST API

Структура проекта

BLOG
frontend — React-приложение
backend — Node.js + Express API
Dockerfile
README.md

Frontend (React)

Примеры реализованных задач:
	•	компонентный подход
	•	загрузка данных с сервера
	•	работа с состоянием
	•	маршрутизация страниц
	•	асинхронные запросы к API

Технологии:
React, JavaScript (ES6+), React Router, Axios / Fetch, адаптивная верстка

Backend (Node.js)

Примеры реализованных задач:
	•	REST API
	•	CRUD-логика
	•	контроллеры и роуты
	•	middleware
	•	централизованная обработка ошибок

Технологии:
Node.js, Express, REST API, MVC / layered architecture

REST API — примеры

Получить все посты
GET /api/posts

Получить один пост
GET /api/posts/1

Создать пост
POST /api/posts
body: title, text

Обновить пост
PUT /api/posts/1

Удалить пост
DELETE /api/posts/1

Запуск проекта

Backend:
cd backend
npm install
npm run dev

Frontend:
cd frontend
npm install
npm run dev

Frontend: http://localhost:3000
Backend: http://localhost:5000

Docker

Проект готов к запуску в Docker.
Используется для одинакового окружения и упрощённого деплоя.

Что можно добавить дальше
	•	JWT-авторизация
	•	роли пользователей
	•	комментарии
	•	лайки
	•	тесты
	•	CI/CD

Для чего этот проект
	•	портфолио
	•	демонстрация full-stack навыков
	•	пример production-подхода
	•	база для реального продукта

Автор

Vitalii 
Frontend / Full-Stack Developer
GitHub: https://github.com/vitos-sk
