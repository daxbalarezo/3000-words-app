# 🎓 3000 Words App

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Railway](https://img.shields.io/badge/Deployed-Railway-black)

Aplicación full-stack para aprender 3000 palabras en inglés con sistema de flashcards interactivas y seguimiento de progreso en tiempo real.

## 🚀 Características Principales

- **📚 2979 palabras** con traducciones y ejemplos en contexto
- **🃏 Flashcards interactivas** con efecto de volteo
- **📊 Contador de progreso** en tiempo real
- **🎯 Navegación rápida** entre 149 páginas
- **📱 Diseño 100% responsive** (mobile-first)
- **⚡ Modo desarrollo** con hot-reload
- **🌐 Despliegue automático** en Railway

## 🛠 Stack Tecnológico

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Axios** - Cliente HTTP

### Backend  
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

### Infraestructura
- **Railway** - Plataforma de despliegue
- **MongoDB Atlas** - Base de datos en la nube
- **Git/GitHub** - Control de versiones

## ⚡ Inicio Rápido

### Prerrequisitos
- Node.js 18 o superior
- MongoDB (local o Atlas)

### Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/daxbalarezo/3000-words-app.git
cd 3000-words-app

# 2. Instalar dependencias
npm install
cd client && npm install && cd ..

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 4. Poblar la base de datos
npm run seed

# 5. Ejecutar en desarrollo
npm run dev

## 🤝 Contribución
Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia
Distribuido bajo Licencia MIT. Ver `LICENSE` para más información.

## 👨‍💻 Autor
**Daniel Balarezo**
- GitHub: [@daxbalarezo](https://github.com/daxbalarezo)
- Proyecto: [https://github.com/daxbalarezo/3000-words-app](https://github.com/daxbalarezo/3000-words-app)

## 🙏 Agradecimientos
- [Railway](https://railway.app) por el hosting
- [MongoDB Atlas](https://mongodb.com) por la base de datos
- [Tailwind CSS](https://tailwindcss.com) por los estilos

---
**⭐ Si este proyecto te gusta, dale una estrella en GitHub!**