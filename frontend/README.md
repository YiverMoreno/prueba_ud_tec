# README FRONTEND

Descripción de la UI
- SPA React para gestión visual de Consumers, Products y Orders.
- Interfaces para listar, crear, editar y eliminar consumidores/productos y crear órdenes que afectan stock.

Stack
- React, Vite, Axios, React Router
- Estilos: CSS (global o modular según `src/App.css`)
- Deploy: Vercel

Estructura de carpetas (relevante)
- `src/`
  - `main.jsx` — bootstrap de la app
  - `App.jsx` — rutas y layout
  - `pages/`
    - `Consumers.jsx` — lista y formulario consumidor
    - `Products.jsx` — catálogo y control de stock
    - `Orders.jsx` — creación y listado de órdenes
  - `components/` — componentes reutilizables (Form, Modal, Table, Toast)
  - `services/`
    - `api.js` — instancia Axios con `baseURL` desde `VITE_API_URL`
    - `consumers.js`, `products.js`, `orders.js` — funciones que llaman endpoints
  - `assets/` — imágenes y iconos

Instalación y ejecución
- Requisitos: Node.js, npm
- Desarrollo:
  ```bash
  cd frontend
  npm install
  # configurar .env local con VITE_API_URL
  npm run dev
  ```
- Build para producción:
  ```bash
  npm run build
  ```

Variables de entorno (frontend)
- `VITE_API_URL` — URL base de la API (ej: https://mi-backend.onrender.com/api)
  - En desarrollo: `VITE_API_URL=http://localhost:4000/api`
  - En Vercel, configurar `VITE_API_URL` en Project Settings -> Environment Variables

Pantallas principales
- Consumers
  - Listado con búsqueda y paginación
  - Formulario creación/edición (validación de email por respuesta de API)
  - Eliminación con confirmación
- Products
  - Listado con stock y precio
  - Formulario creación/edición (validación de price y stock en frontend)
  - Indicador de stock bajo
- Orders
  - Formulario de creación: seleccionar consumidor, añadir líneas (producto + cantidad)
  - Resumen de total y validación UX de stock local (verificación definitiva en backend)
  - Listado de órdenes con detalles

Conexión con API mediante Axios
- Ejemplo `src/services/api.js`:
  ```js
  import axios from 'axios';
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
    timeout: 10000,
  });
  export default api;
  ```
- Ejemplo servicio `src/services/products.js`:
  ```js
  import api from './api';
  export const fetchProducts = () => api.get('/products');
  export const createProduct = (data) => api.post('/products', data);
  ```

Dependencia del backend desplegado
- El frontend depende de que el backend esté disponible en la URL indicada por `VITE_API_URL`.
- En Vercel, configurar `VITE_API_URL` apuntando a la URL del backend en Render.

Deploy en Vercel
- Pasos básicos:
  - Conectar repositorio a Vercel.
  - En Project Settings -> Environment Variables añadir `VITE_API_URL`.
  - Build command: `npm run build`
  - Output directory: `dist`

Buenas prácticas
- Manejar errores de red y mostrar mensajes claros.
- Validar inputs en frontend para UX, pero confiar en validaciones del backend.
- No exponer secretos en el frontend; usar solo variables `VITE_` públicas.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
