# 🏙️ Pomodoro Timer - Enfoque & Productividad

[![React](https://img.shields.io/badge/React-18%2B-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

> **Estado del Proyecto:** 🟢 Plataforma Operativa y Totalmente Dockerizada.

**Pomodoro Timer** es una aplicación Full-Stack de productividad diseñada para maximizar el enfoque mediante la técnica Pomodoro. La aplicación integra un sistema de gestión de tiempo personalizable, control de tareas (ToDo List) y una interfaz altamente personalizable mediante temas de color.

El ecosistema está construido con un enfoque moderno, utilizando Vite para un rendimiento óptimo y Docker para garantizar un despliegue consistente y profesional.

---

# 🌐 Características Principales

## ⏳ 1. Gestión de Sesiones y Timer

* **Temporizador configurable**: Ajusta tus intervalos de trabajo profundo y descansos según tu metodología.

* **Control de Sesiones**: Contador automático de ciclos completados para medir tu rendimiento diario.

* **Alertas Visuales**: Cambios de estado intuitivos entre los periodos de trabajo y descanso.

---

## 📝 2. Lista de Tareas (ToDo) Integrada

La plataforma incorpora un sistema de auditoría automática basado en inteligencia artificial:

* **Gestión de Prioridades**: Mantén tus tareas organizadas en un solo lugar mientras ejecutas tus sesiones.

* **Fluidez UX** : Interfaz integrada sin distracciones para aumentar la concentración.

---

## 🎨 3. Personalización Total

* **Temas Dinámicos**: Selector de paletas de colores para adaptar la aplicación a tu entorno de trabajo.

* **Diseño Responsivo**: Interfaz adaptable, construida con Tailwind CSS, para monitorización desde cualquier dispositivo.

---

# ⚙️ Arquitectura del Sistema

## 🖥️ Frontend (Client Dashboard)

* **Framework**: React + Vite.
* **Estilizado**: Tailwind CSS para un diseño modular y de alto rendimiento.
* **Gestión de Estado**: Manejo eficiente de flujos de datos para la sincronización del timer y la lista de tareas.

## 📦 Infraestructura y DevOps

### Containerización
* **Docker:** 100% dockerizado para garantizar paridad absoluta entre los entornos de desarrollo y producción.

### Despliegue Continuo
* **GitHub Actions:** Pipeline automatizado; cada *push* a la rama `main` dispara la reconstrucción y el despliegue del contenedor.

### Proxy Inverso y Gestión
* **Nginx:** Implementación para la gestión eficiente del tráfico y enrutamiento.

### Resiliencia
* **Políticas de Ejecución:** Configuración de reinicio automático y persistencia de datos mediante volúmenes Docker para asegurar alta disponibilidad.

---

### 🚀 Tecnologías Utilizadas

| Tecnología | Rol dentro del Proyecto |
| :--- | :--- |
| **React** | Frontend interactivo y reactivo |
| **Vite** | Build tool de alto rendimiento |
| **Tailwind CSS** | Diseño modular y responsivo |
| **Docker** | Containerización del entorno |
| **GitHub Actions** | Automatización CI/CD |
| **Nginx** | Servidor web y Proxy inverso |

---

## 🐳 Infraestructura Dockerizada

La arquitectura modular permite desplegar el ecosistema completo con un comando sencillo:

```bash
# Construir y levantar el contenedor
docker build -t pomodoro-timer .
docker run -d --name pomodoro-timer-container -p 8081:80 pomodoro-timer
```

---

# 🧠 Objetivo del Proyecto

El propósito de este proyecto es demostrar la integración de herramientas modernas de desarrollo con prácticas de DevOps. Combina una interfaz de usuario optimizada con una infraestructura profesional para asegurar alta disponibilidad y automatización total del despliegue.

---

# 📌 Futuras Mejoras
* Integración de sonidos de ambiente relajante.
* Histórico de productividad con gráficos detallados.
* Autenticación de usuario para persistencia de datos en la nube.
* Integración con notificaciones push del navegador.

---

# 👨‍💻 Autor
Desarrollado como proyecto funcional desplegado en VPS con CI/CD via Github por HwangVi.
