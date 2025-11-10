Области хранения данных:

- база данных на JESON-сервер
- BFF
- Redux-store

Сущности приложения:

- пользователи: БД (список пользователей), BFF(сесия текущого), стор (отображение в браузере)
- роль пользователя: БД (список роле), BFF (сесия пользователя с ролью), стор (использование на клиенте)
- статья: БД (список статей), стор(отображение)
- коментарий: БД (список коментариев), стор (отбрадение в браузере)

Таблици БД:

- пользователи - users: id / login / password / registed_at / rol_id
- роли - rols: id / name
- статьи - posts: id / image_url / constent / published_at
- коментарии: comments: id / author_id / post_id / constent / published-at

Схема состояния на BFF:

- сесия теккущего пользователя : login / pasword / role

Схема для редакс стор (на клиенте):

- user: login / id / roleId
- posts: массив post: id / title / imageUrl /publishedAt / commentsCount
- post: массив post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / comment / publishedAt
- users: массив user: id / login / registeredAt / role
