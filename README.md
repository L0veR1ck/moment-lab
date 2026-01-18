# Moment Lab

Веб-платформа для ивент-агентства с административной панелью и публичным сайтом

## Структура проекта

```
moment-lab/
├── back/                         # Backend (ASP.NET Core API)
│   ├── MomentLab.API/            # Web API
│   │   ├── Controllers/          # API контроллеры
│   │   └── wwwroot/uploads/      # Загруженные файлы
│   ├── MomentLab.Core/           # Бизнес-логика, DTOs, интерфейсы
│   ├── MomentLab.Infrastructure/ # Репозитории, сервисы, миграции
│   └── MomentLab.Tests/          # Юнит-тесты
├── front/                        # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── pages/                # Страницы приложения
│   │   │   ├── admin/            # Административная панель
│   │   │   └── ...               # Публичные страницы
│   │   ├── components/           # React компоненты
│   │   ├── api/                  # API клиент
│   │   └── assets/               # Изображения и медиа
├── docker-compose.dev.yml        # Docker для разработки
├── docker-compose.prod.yml       # Docker для продакшена
└── .env.example                  # Пример переменных окружения
```

## Быстрый старт

### Backend

```bash
# 1. Запустить PostgreSQL
docker-compose -f docker-compose.dev.yml up -d

# 2. Настроить конфигурацию
# Скопировать back/MomentLab.API/appsettings.json.example
# в back/MomentLab.API/appsettings.json и настроить

# 3. Запустить API
cd back/MomentLab.API
dotnet run
```

API будет доступен по адресу: `https://localhost:5001`

### Frontend

```bash
# Установить зависимости и запустить
cd front
npm install
npm run dev
```

Frontend будет доступен по адресу: `http://localhost:5173`

## Функциональность

### Публичный сайт
- Главная страница с информацией о компании
- Портфолио выполненных мероприятий
- Каталог мероприятий:
  - Корпоративные мероприятия
  - Частные праздники
  - Активные тимбилдинги
  - Иммерсивные квесты
  - Тренинги
  - Школьные мероприятия
- Отзывы клиентов
- Форма подачи заявки
- Информация о команде

### Административная панель
- Управление заявками от клиентов
- Управление мероприятиями
- Управление отзывами
- Управление командой
- Настройка уведомлений
- Аутентификация администратора



### Настройка уведомлений

- **Telegram**: укажите `BotToken` и `ChatId` для отправки уведомлений в Telegram
- **Email**: настройте SMTP для email-уведомлений
- **Bitrix24**: добавьте `WebhookUrl` для интеграции с Bitrix24 CRM

## База данных

```bash
# Создать миграцию
dotnet ef migrations add MigrationName -p back/MomentLab.Infrastructure -s back/MomentLab.API

# Применить миграции  
dotnet ef database update -p back/MomentLab.Infrastructure -s back/MomentLab.API
```

## Docker

### Разработка

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Продакшн

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

API: `https://<DOMAIN>` с автоматическим SSL (Let's Encrypt).

## API

### Заявки (Applications)
- `POST /api/applications` - Создать новую заявку
- `GET /api/applications` - Получить список заявок
- `GET /api/applications/{id}` - Получить заявку по ID
- `PATCH /api/applications/{id}/status` - Обновить статус заявки
- `DELETE /api/applications/{id}` - Удалить заявку

### Мероприятия (Events)
- `GET /api/events` - Получить список мероприятий
- `GET /api/events/{id}` - Получить мероприятие по ID
- `POST /api/events` - Создать мероприятие
- `PUT /api/events/{id}` - Обновить мероприятие
- `DELETE /api/events/{id}` - Удалить мероприятие

### Отзывы (Reviews)
- `GET /api/reviews` - Получить список отзывов
- `POST /api/reviews` - Создать отзыв
- `PUT /api/reviews/{id}` - Обновить отзыв
- `DELETE /api/reviews/{id}` - Удалить отзыв

### Команда (Team Members)
- `GET /api/team-members` - Получить список членов команды
- `POST /api/team-members` - Добавить члена команды
- `PUT /api/team-members/{id}` - Обновить информацию о члене команды
- `DELETE /api/team-members/{id}` - Удалить члена команды

### Файлы (Files)
- `POST /api/files/upload` - Загрузить файл
- `GET /wwwroot/uploads/{filename}` - Получить загруженный файл

### Настройки уведомлений (Notification Settings)
- `GET /api/notification-settings` - Получить настройки уведомлений
- `PUT /api/notification-settings` - Обновить настройки уведомлений

### Аутентификация (Auth)
- `POST /api/auth/login` - Вход в административную панель
- `POST /api/auth/logout` - Выход из системы

### Health Check
- `GET /health` - Проверка состояния сервиса

**Swagger документация:** `https://localhost:5001/swagger`
