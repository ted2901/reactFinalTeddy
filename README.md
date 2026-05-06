# Gestión de Tareas — Proyecto Final React

**Estudiante:** Freddy Chumacero Cors  
**Diplomado:** Desarrollo Frontend con React

## Descripción

Aplicación web de gestión de tareas (To-Do List) desarrollada como proyecto final del diplomado. Permite administrar el ciclo de vida completo de una tarea: crear, visualizar, editar, cambiar estado y eliminar.

## Funcionalidades

- **Autenticación** — Registro e inicio de sesión con JWT
- **Listar tareas** — Separadas en Pendientes y Finalizadas
- **Crear tarea** — Formulario con validación
- **Editar tarea** — Modificar el nombre de una tarea existente
- **Eliminar tarea** — Con confirmación antes de borrar
- **Cambiar estado** — Alternar entre Pendiente y Finalizada mediante checkbox

## Tecnologías

- React 19 + TypeScript
- Vite
- Material UI (MUI) v9
- React Router v7
- Axios
- Zod

## Backend

API REST provista por el diplomado: `https://taskdone-node.onrender.com`

## Ejecutar localmente

```bash
npm install
npm run dev
```

Crear un archivo `.env` en la raíz:

```
VITE_API_URL=https://taskdone-node.onrender.com/api
```

## Demo

[Ver aplicación en vivo](https://freddychumacero.github.io/FCH-diplomado-react-proyecto/)
