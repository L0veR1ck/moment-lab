# Moment Lab

Приложение для эвент-агентства

## Структура проекта

```
moment-lab/
├── back/                         # Backend (ASP.NET Core API)
│   ├── MomentLab.API/            # Web API
│   ├── MomentLab.Core/           # Бизнес-логика, DTOs
│   ├── MomentLab.Infrastructure/ # Репозитории, сервисы
│   └── MomentLab.Tests/          # Юнит-тесты
├── front/                        # Frontend (планируется)
├── docker-compose.dev.yml        # Docker для разработки
├── docker-compose.prod.yml       # Docker для продакшена
└── .env.example                  # Пример переменных окружения
```

## Быстрый старт

```bash
# 1. Запустить PostgreSQL
docker-compose -f docker-compose.dev.yml up -d

# 2. Настроить appsettings.json
# Отредактировать back/MomentLab.API/appsettings.json
```

## Настройка

### Включение/отключение интеграций

В `back/MomentLab.API/appsettings.json`:

```json
"IntegrationSettings": {
  "EnableTelegram": true,
  "EnableEmail": false,
  "EnableBitrix": false
}
```

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

- `POST /api/applications` - Создать заявку
- `GET /api/applications` - Список заявок
- `GET /api/applications/{id}` - Получить заявку
- `PATCH /api/applications/{id}/status` - Обновить статус
- `GET /health` - Health check

Swagger: `https://localhost:5001/swagger`
