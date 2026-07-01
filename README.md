# Sistema de Gestión de Denuncias VIF

Esta es una aplicación web (Single Page Application - SPA) diseñada para el registro, gestión y control de denuncias de Violencia Intrafamiliar (VIF). El proyecto se enfoca en una arquitectura modular, usabilidad avanzada y persistencia de datos local.

## Tecnologías Utilizadas
- **HTML5**: Estructura semántica del contenido.
- **CSS3**: Diseño responsive con enfoque en usabilidad y feedback visual.
- **JavaScript (ES6+)**: Implementación de módulos (`import/export`), manipulación dinámica del DOM y gestión de eventos.
- **LocalStorage**: Persistencia de datos en el cliente.

##  Características Principales
- **Autenticación Simulada**: Gestión de sesión local para acceder al sistema.
- **Validación en Tiempo Real**: Feedback visual inmediato (`blur` event) y mensajes de error específicos por campo.
- **Operaciones CRUD**: Permite Crear, Leer y Eliminar denuncias.
- **Diseño Responsive**: Adaptabilidad total a diferentes tamaños de pantalla (móviles y escritorio).
- **Feedback de Usuario**: Notificaciones de éxito tras el registro de denuncias.

## Cómo ejecutar el proyecto
1. Asegúrate de tener instalado **Visual Studio Code**.
2. Instala la extensión **Live Server** (por Ritwick Dey).
3. Abre la carpeta del proyecto en VS Code.
4. Abre el archivo `index.html` y haz clic en el botón **"Go Live"** en la barra inferior.
5. El proyecto se abrirá en tu navegador predeterminado en `http://127.0.0.1:5500`.

## Compatibilidad
El proyecto ha sido validado en los siguientes entornos para asegurar una experiencia consistente:
- **Navegadores**: Google Chrome, Microsoft Edge y Mozilla Firefox.
- **Dispositivos**: Probado con dimensiones para escritorio (1920x1080) y dispositivos móviles (375x667).

##  Notas del Desarrollador
Este proyecto cumple con los criterios de:
- Implementación de al menos 3 tipos de eventos.
- Generación dinámica de elementos en el DOM.
- Persistencia de datos mediante LocalStorage.
- Prevención de envíos (`preventDefault`) y validación de formularios.
