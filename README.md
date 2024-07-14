# Задание 1. Разбиение на микрофронтенды

Запуск фронтенда:
```
docker compose -f ./frontend-compose.yaml -p architecture-sprint-1 up -d  
```
Приложение поднимется на 5000 порту


Остановка фронтенда:
```
docker compose -p architecture-sprint-1 down
```
## Модули:

### auth-microfrontend

Содержит компоненты, относящиеся к регистрации и аутентификации.
* Auth - основной компонент, содержащий все остальные компоненты модуля
* InfoTooltip - всплывающее окно, возникающее при успешной регистрации, либо при ошибке
* Login - форма логина
* Register - форма регистрации

### profile-microfrontend

Содержит компоненты, относящиеся к профилю пользователя.
* Profile - основной компонент, содержащий все остальные компоненты модуля 
в тч кнопки редактировании аватара, добавления нового места, информации о пользователе и его аватар
* PopupWithForm - абстрактное всплывающее окно с формой, используется другими всплывающими окнами модуля
* AddPlacePopup - всплывающее окно, возникающее при добавлении нового места
* EditAvatarPopup - всплывающее окно, возникающее при редактировании аватара
* EditProfilePopup - всплывающее окно, возникающее при редактировании информации о пользователе

### profile-microfrontend

Содержит компоненты, относящиеся к отображению добавленных мест.
* Places - основной компонент, содержащий все остальные компоненты модуля
* PopupWithForm - абстрактное всплывающее окно с формой
* ImagePopup - всплывающее окно, с картинкой места
* Card - компонент, отображающий добавленные места

### app

Основной модуль приложения, содержит общие для приложения компоненты.
* App - основной компонент, собирающий вместе все компоненты приложения
* Footer - футер с информацией о приложении
* Header - хидер с информацией о пользователе
* Main - компонент объединяющий компоненты профиля и компоненты мест
* ProtectedRoute - компонент проверяющий залогинен ли пользователь

## Комментарии к реализации
В качестве реализации был выбран module federation тк такой подход показался легче в реализации 
без необходимости изучать новый фреймворк. 

В качестве сборщика был выбран vite из-за того, что используемый в проекте
для запуска react-scripts не обновлялся два года и при попытке добавить в него конфигурацию module federation возникали баги.


Проект был поделен на модули по бизнес функциям с расчетом на возможность максимально независимой разработки всех модулей.

# Задание 2. Декомпозиция веб-приложения

https://drive.google.com/file/d/1U9_QTSyt23FV_x_exWqrM5bg4P8GBe-9/view?usp=sharing

В ходе декомпозиции были выделены следующие сервисы:

* Сервис пользователей - отвечает за хранение информации о пользователях, их ролях, а также за аутентификацию и регистрацию новых пользователей
* Сервис нотификаций - отвечает за рассылку уведомлений пользователям
* Сервис платежей - отвечает за работу с оплатой, есть интеграции с внешними платежными системами 
* Сервис товаров и услуг - хранит информацию о текущих товарах и услугах, позволяет добавлять, удалять товары и услуги, а также производить по ним поиск
* Сервис заказов - работа с заказами. Позволяет создавать, редактировать, размещать и подтверждать заказы. Также позволяет отобразить детали заказы и список заказов. 
* Сервис торговых площадок - информация о текущих торговых площадках. Позволяет зарегистрировать новую торговую площадку и получить информацию о торговой площадке
* Сервис апелляций - сервис работы с апелляциями. Можно создать и обновить статус заявки на апелляцию
* Сервис аукционов - сервис работы с аукционами и ставками на аукционах. Позволяет создать, редактировать, обновить статус аукциона, а также обновить ставку на аукционе.
* Сервис тех поддержки - сервис для работы с заявками на тех поддержку. Позволяет создавать и обновлять статус заявок на тех. поддержку
* Сервис отчетов - собирает данные из брокера сообщений для создания различных отчетов, например: отчет по продажам, статистику заказов, отчет активности пользователей
* Api gateway - используется для авторизации пользователей

Каждый сервис имеет свою базу данных. Сервисы обмениваются между собой информацией асинхронно через брокер сообщений

### Потоки: 
Поток 1. Инициировать платеж

Поток 2. Предоставить статус платежа

Поток 3. Подтверждение платежа

Поток 4. Запросить статус платежа

Поток 5. Подтверждение отмены платежа

Поток 6. Зарегистрироваться на площадке

Поток 7. Разместить заказ

Поток 8. Разместить услугу

Поток 9. Создать аукцион

Поток 10. Подать заявку на аукцион

Поток 11. Редактировать профиль

Поток 12. Изменить статус заявки на поддержку

Поток 13. Редактировать аукцион

Поток 14. Валидировать заявку

