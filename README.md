# ProjectoAngular - Prueba Técnica

Este proyecto es una aplicación Angular desarrollada como parte de una prueba técnica. La aplicación incluye funcionalidades como gestión de tareas, protección de rutas mediante guards, y el uso de servicios para manejar datos y estados.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [Angular CLI](https://angular.io/cli) (versión 19.1.5 o superior)

## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd ProjectoAngular
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté en ejecución, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques los archivos fuente.

## Funcionalidades principales

- **Gestión de tareas**: Agregar, editar y cambiar el estado de las tareas.
- **Protección de rutas**: Uso de guards para evitar la pérdida de datos no guardados.
- **Persistencia de datos**: Almacenamiento de tareas en el almacenamiento local del navegador.

## Pruebas

### Pruebas unitarias

Para ejecutar las pruebas unitarias con [Karma](https://karma-runner.github.io), utiliza el siguiente comando:

```bash
ng test
```

### Pruebas end-to-end

Para pruebas end-to-end (e2e), asegúrate de tener un framework configurado (como [Cypress](https://www.cypress.io/) o [Protractor](https://www.protractortest.org/)) y ejecuta:

```bash
ng e2e
```

## Construcción

Para compilar el proyecto para producción, ejecuta:

```bash
ng build --configuration production
```

Los artefactos de compilación se almacenarán en el directorio `dist/`. La compilación de producción optimiza la aplicación para rendimiento y velocidad.

## Estructura del proyecto

- **`src/app/components`**: Contiene los componentes de la aplicación, como `TodoComponent` y `TarkCardComponent`.
- **`src/app/services`**: Contiene los servicios, como `TaskService` y `StorageService`.
- **`src/app/guards`**: Contiene los guards, como `UnsavedChangesGuard`.
- **`src/environments`**: Configuración de entornos para desarrollo y producción.

## Notas adicionales

- Este proyecto utiliza `crypto-js` para cifrar y descifrar datos sensibles.
- Tailwind CSS está configurado para el diseño de la interfaz de usuario.

## Recursos adicionales

Para más información sobre Angular CLI y sus comandos, visita la [documentación oficial](https://angular.dev/tools/cli).

---
