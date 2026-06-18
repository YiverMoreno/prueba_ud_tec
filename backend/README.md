# README BACKEND

Descripción del API
- API REST para gestionar consumidores, productos y órdenes.
- Recursos principales: Consumers, Products, Orders. Creación de órdenes descuenta stock de forma transaccional.

Stack
- Node.js, Express, Prisma ORM, PostgreSQL
- Swagger (swagger-ui-express, swagger-jsdoc)

Estructura de carpetas
- `src/`
  - `app.js` — configuración de Express, middlewares y Swagger
  - `server.js` — arranque del servidor
  - `config/` — `prisma.js` (cliente Prisma)
  - `controllers/` — controladores HTTP (`consumer.controller.js`, `product.controller.js`, `order.controller.js`)
  - `services/` — lógica de negocio y transacciones (`consumer.service.js`, `product.service.js`, `order.service.js`)
  - `routes/` — definiciones de rutas (`consumer.routes.js`, `product.routes.js`, `order.routes.js`)
  - `utils/` — helpers y manejo de respuestas/errores (`httpResponse.js`)
  - `docs/` — configuración Swagger (`swagger.js`)

Instalación y ejecución
- Requisitos: Node.js, npm, PostgreSQL
- Desarrollo:
  ```bash
  cd backend
  npm install
  # configurar archivo .env con DATABASE_URL y PORT
  npx prisma generate
  npx prisma migrate dev --name init
  npm run dev
  ```
- Producción (ejemplo con pm2 o start script):
  ```bash
  npm run build
  npm start
  ```

Prisma — comandos importantes
- Generar cliente Prisma:
  ```bash
  npx prisma generate
  ```
- Crear/ejecutar migraciones (desarrollo):
  ```bash
  npx prisma migrate dev --name <descripcion>
  ```
- Aplicar migraciones en producción:
  ```bash
  npx prisma migrate deploy
  ```
- Abrir Prisma Studio:
  ```bash
  npx prisma studio
  ```

Endpoints CRUD (resumen)
- Consumers
  - `GET /api/consumers` — listar
  - `GET /api/consumers/:id` — obtener
  - `POST /api/consumers` — crear `{ name, email }`
  - `PUT /api/consumers/:id` — actualizar
  - `DELETE /api/consumers/:id` — eliminar
- Products
  - `GET /api/products`
  - `GET /api/products/:id`
  - `POST /api/products` — `{ name, price, stock }`
  - `PUT /api/products/:id`
  - `DELETE /api/products/:id`
- Orders
  - `GET /api/orders`
  - `GET /api/orders/:id`
  - `POST /api/orders` — crear orden (transaccional)
    - Body ejemplo:
      ```json
      {
        "consumerId": 1,
        "items": [
          { "productId": 10, "quantity": 2 },
          { "productId": 5, "quantity": 1 }
        ]
      }
      ```

Reglas de negocio
- Email de consumidor: único. Intentos de crear duplicados devuelven `409 Conflict`.
- Producto: `stock` entero >= 0; `price` >= 0.
- Orden:
  - Debe pertenecer a un consumidor existente.
  - Validar existencia de cada producto y stock suficiente.
  - Si alguna línea no tiene stock suficiente, la creación falla sin mutar stock (operación atómica).
  - Al aprobar, se descuenta `stock` por `quantity` y se guarda la orden con sus líneas.
  - No se permite stock negativo.

Manejo de errores y códigos HTTP
- 200 OK — operaciones GET exitosas.
- 201 Created — recursos creados.
- 400 Bad Request — validaciones de entrada.
- 404 Not Found — recursos no encontrados.
- 409 Conflict — conflictos de negocio (email duplicado, stock insuficiente).
- 422 Unprocessable Entity — validación semántica (opcional).
- 500 Internal Server Error — errores inesperados.

Swagger
- UI interactiva: `GET /api/docs` (o `/docs` según configuración)
- Swagger JSON: `GET /api/docs.json` (según implementación)

Variables de entorno (backend)
- `DATABASE_URL` — cadena de conexión PostgreSQL
- `PORT` — puerto de la API
- `NODE_ENV` — environment
- `SWAGGER_ENABLED` — true|false
- (Opcional) `LOG_LEVEL`, `APP_URL`, `JWT_SECRET`

Docker — ejecución
- Construir imagen:
  ```bash
  cd backend
  docker build -t mi-backend .
  ```
- Ejecutar contenedor con archivo de entorno:
  ```bash
  docker run --env-file .env -p 4000:4000 mi-backend
  ```
- Con Docker Compose (desde root del repo):
  ```bash
  docker-compose up -d
  ```
