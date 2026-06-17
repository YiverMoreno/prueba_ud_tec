# Consumer Orders Management

Aplicación web para la gestión de consumidores, productos y órdenes de compra.

## Tecnologías

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Base de Datos

* PostgreSQL
* Prisma ORM

### Infraestructura

* Docker
* Docker Compose

---

## Arquitectura

El proyecto sigue una arquitectura basada en MVC (Model-View-Controller), separando la lógica de negocio, acceso a datos y presentación.

```text
backend/
├── controllers
├── services
├── repositories
├── routes
├── prisma

frontend/
├── pages
├── components
├── services
```

---

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

---

## Instalación

### Requisitos

* Docker
* Docker Compose

### Ejecutar proyecto

```bash
docker compose up --build
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:4000/api
```

---

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

Agregar captura de pantalla.

### Productos

Agregar captura de pantalla.

### Órdenes

Agregar captura de pantalla.

---

## Despliegue

Frontend:

* Vercel

Backend:

* Render

Base de datos:

* PostgreSQL en Render

---

## Repositorio

URL del repositorio:

```text
https://github.com/usuario/nombre-repositorio
```
