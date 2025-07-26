# Tienda Online

Aplicación de e-commerce. Instalar dependencias:
```bash
npm install
```


## Tecnologías Utilizadas

- **Framework**: React 19 con TypeScript
- **Estilos**: TailwindCSS
- **Routing**: React Router DOM
- **Estado**: Zustand
- **Data Fetching**: TanStack Query + Axios
- **API**: Fake Store API
- **Build Tool**: Vite

## Funcionalidades Implementadas

### 1. Pantalla de Inicio
- Lista de productos con imagen, nombre, precio y botón "Agregar al carrito"
- Productos obtenidos de Fake Store API
- Buscador por nombre de producto
- Filtro por categorías
- Diseño responsive

### 2. Pantalla de detalle de producto
- Información completa del producto seleccionado
- Selector de cantidad
- Botón para agregar al carrito
- Navegación responsive

### 3. Carrito de compras
- Productos agregados con nombre, cantidad y precio total
- Eliminar productos individualmente
- Cambiar cantidad de productos
- Precio total de todos los productos
- Persistencia en localStorage

### 4. Pantalla de confirmación de compra
- Resumen completo del carrito
- Formulario de checkout con validaciones
- Simulación de finalización de compra
- Confirmación de pedido con número de orden

## Instrucciones para ejecutar localmente

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm

### Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/PerezO12/MyStorePruebaT.git
cd my-storePT
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```
Edita el archivo `.env` si necesitas cambiar la URL de la API.

3. Instalar dependencias:
```bash
npm install
```

4. Ejecutar en modo desarrollo:
```bash
npm run dev
```

5. Abrir en el navegador: `http://localhost:5173`

## Variables de Entorno

El proyecto utiliza las siguientes variables de entorno:

- `VITE_API_BASE_URL`: URL base de la API (por defecto: https://fakestoreapi.com)

Para configurar:
1. Copia `.env.example` a `.env`
2. Modifica los valores según sea necesario

### Comandos adicionales

```bash
npm run build    # Construir para producción
npm run preview  # Vista previa de la build
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes básicos (Button, Input, Card)
│   └── layout/         # Header y componentes de layout
├── pages/              # Páginas principales
├── stores/             # Manejo de estado
├── services/           # Servicios API
├── types/              # Tipos TypeScript
└── utils/              # Funciones utilitarias
```

## Características Adicionales

- Tema oscuro/claro
- Notificaciones
- Validaciones de formulario completas
- Formateo automático de campos
- Estados de carga y error
- Diseño completamente responsive

## URL de la Aplicación Desplegada

https://mystorepruebat.onrender.com/

## Cumplimiento de Criterios

### Organización del código
- Estructura modular por funcionalidades
- Componentes reutilizables
- Nombres descriptivos y convenciones claras
- Separación de responsabilidades

### Diseño y usabilidad
- Interfaz intuitiva y moderna
- Diseño responsive para móvil, tablet y desktop
- Uso consistente de TailwindCSS
- Animaciones y transiciones suaves

### Funcionalidad
- Todos los requisitos implementados
- Estado global manejado correctamente
- Comunicación eficiente entre componentes
- Validaciones y manejo de errores

### Despliegue
- README con instrucciones claras
- Aplicación lista para despliegue
