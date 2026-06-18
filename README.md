# README GENERAL

Descripción
- Sistema web para gestión de consumidores, productos y órdenes con control estricto de stock.
- Permite CRUD de consumidores y productos, creación de órdenes que descuentan stock automáticamente y evita stock negativo.
- API documentada con Swagger; Frontend React consume la API vía Axios.

Arquitectura general
- Cliente (frontend) SPA en React + Vite desplegado en Vercel.
- API REST en Node.js + Express usando Prisma ORM sobre PostgreSQL, desplegada en Render.
- Persistencia: PostgreSQL (container/Docker o servicio gestionado).
- Orquestación local: `docker-compose` (frontend, backend, postgres).

Stack tecnológico
- Backend: Node.js, Express, Prisma ORM, PostgreSQL, Swagger (swagger-ui-express, swagger-jsdoc).
- Frontend: React, Vite, Axios, React Router.
- Infra: Docker, Docker Compose, Render (backend), Vercel (frontend).

Estructura del proyecto (resumen)
- Root: `docker-compose.yml`, `README.md`
- `backend/`
  - `package.json`, `prisma.config.ts`
  - `src/`
    - `app.js`, `server.js`
    - `config/` (`prisma.js`)
    - `controllers/`, `services/`, `routes/`, `utils/`
  - `docs/swagger.js`
  - `prisma/schema.prisma`
- `frontend/`
  - `package.json`, `vite.config.js`
  - `src/`
    - `main.jsx`, `App.jsx`
    - `pages/` (Consumers, Products, Orders)
    - `services/` (`api.js`, `consumers.js`, `products.js`, `orders.js`)
    - `components/`

Ejecución local (desarrollo)
- Backend:
  ```bash
  cd backend
  npm install
  npx prisma generate
  npx prisma migrate dev --name init
  npm run dev
  ```
- Frontend:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- Requisitos: Node.js >=16, npm, Docker (opcional), PostgreSQL (si no usa Docker).

Instrucciones Docker Compose (local)
- Levantar servicios (backend, frontend, postgres):
  ```bash
  docker-compose up --build
  ```
- Detener y remover:
  ```bash
  docker-compose down
  ```

Variables de entorno (principales)
- Backend (archivo .env en `backend/`):
  - `DATABASE_URL` — URL de conexión PostgreSQL (ej: postgres://user:pass@host:5432/db)
  - `PORT` — puerto del servidor (ej: 4000)
  - `NODE_ENV` — development|production
  - `SWAGGER_ENABLED` — true|false (opcional)
- Frontend (archivo .env o variables Vite):
  - `VITE_API_URL` — URL base de la API (ej: https://mi-backend.onrender.com/api)

URLs de deploy
- Frontend (Vercel): https://prueba-ud-tec.vercel.app/
- Backend (Render): https://prueba-ud-tec.onrender.com

Swagger endpoint
- Documentación interactiva: https://prueba-ud-tec.onrender.com//api/docs
- En el backend local: http://localhost:PORT/api/docs

Formato y objetivo
- Este README sirve como documentación de producto y guía técnica para evaluación, despliegue y puesta en marcha local o con contenedores. Contiene enlaces a READMEs específicos por capa para detalles de uso y despliegue.
# Consumer Orders Management

## Modelo de Datos

### Entidades

* Consumers
* Products
* Orders
* OrderItems

Relaciones:

* Un consumidor puede tener múltiples órdenes.
* Una orden puede contener múltiples productos.
* Un producto puede pertenecer a múltiples órdenes.
 ## Diagrama de la bd
 
 erDiagram

  CONSUMER ||--o{ ORDER : places
  ORDER ||--|{ ORDER_ITEM : contains
  PRODUCT ||--o{ ORDER_ITEM : referenced

  CONSUMER {
    int id
    string name
    string email
    string phone
    datetime createdAt
  }

  PRODUCT {
    int id
    string name
    string description
    float price
    int stock
  }

  ORDER {
    int id
    int consumerId
    float total
    datetime createdAt
  }

  ORDER_ITEM {
    int id
    int orderId
    int productId
    int quantity
    float unitPrice
  }

## Endpoints principales

### Consumers

```http
GET    /api/consumers
POST   /api/consumers
PUT    /api/consumers/:id
DELETE /api/consumers/:id
```

### Products

```http
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Orders

```http
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
```

---
## Evidencias

### Consumidores
![alt text](image.png)

![alt text](image-1.png)

### Productos

![alt text](image-2.png)

![alt text](image-3.png)
### Órdenes

![alt text](image-4.png)

---

## Repositorio

URL del repositorio:

```text
https://github.com/YiverMoreno/prueba_ud_tec
```
