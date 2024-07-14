## Description

Приложение для парсинга RSS-лент и сохранения постов в базу данных PostgreSQL. Предоставляет API для получения постов с пагинацией и использует Swagger для документирования API.

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:ugar2000/rss-nest-app.git
   cd your-repo
    ```
   
2. **Install the dependencies:**

   ```bash
   npm install
   ```
   
3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

    Отредактируйте файл .env, заполнив необходимые значения для подключения к PostgreSQL и Redis.

4. **Start Docker containers (PostgreSQL and Redis):**

   ```bash
   docker-compose up -d
   ```
   
5. **Run the migrations:**

    Для запуска миграций в производственном режиме выполните команду:

    ```bash
    npx prisma migrate deploy
    ```
   
    Для запуска миграций в режиме разработки выполните команду:

    ```bash
    npx prisma migrate dev
    ```
   
6. **Run the application:**

   Запуск приложения в режиме разработки:

   ```bash
    npm run start:dev
    ```
   
   Запуск приложения в производственном режиме:

   ```bash
    npm run build
    npm run start:prod
    ```