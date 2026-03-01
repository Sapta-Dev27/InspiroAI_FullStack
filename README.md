# 🚀 InspiroAI – AI Powered SaaS Platform

> A Full-Stack AI SaaS application for generating blogs, articles, AI images, thumbnails, and resume analysis using MERN Stack & Gemini AI.

---

## 🌐 Live Demo

- 🔗 Frontend: https://inspiroai-nine.vercel.app  
- 🔗 Backend API: https://inspiroai-54xj.onrender.com  

---

## 🧠 Features

✨ AI Blog & Article Generator  
🎨 AI Image & Thumbnail Generator  
📄 Resume Analyzer (AI Powered)  
👤 Secure Authentication (JWT)  
📊 User Dashboard  
🌍 Community Content Sharing  
📱 Fully Responsive Design  

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt

### AI Integration
- Google Gemini API (Text Generation)
- Stability AI (Image Generation)

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

# 📂 Folder Structure

```
InspiroAI_FullStack
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Sapta-Dev27/InspiroAI_FullStack.git
cd InspiroAI_FullStack
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server runs on:
```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on:
```
http://localhost:5173
```

---

# 🔐 Environment Variables

Create a `.env` file inside `backend/`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
STABILITY_AI_KEY=your_stability_api_key
```

---

# 🔌 API Overview

## Auth Routes
- POST `/api/auth/register`
- POST `/api/auth/login`

## Content
- POST `/api/content/generate`
- GET `/api/content/history`

## Image
- POST `/api/image/generate`

## Resume
- POST `/api/resume/analyze`

---

# 🖼️ Application Screenshots

## 📝 Article / Blog Generation Pipeline

<img width="1380" height="611" src="https://github.com/user-attachments/assets/1871d15f-4338-4242-9aa0-ab9e1d5d99a6" />

---

## 🎨 Image / Thumbnail Generation Pipeline

<img width="1757" height="726" src="https://github.com/user-attachments/assets/17a96572-ba29-42ec-b4aa-a0b522dcae46" />

---

# 🛡️ Security

- JWT Based Authentication
- Protected Routes
- Password Hashing with Bcrypt
- Environment Variables Secured

---

# 🚀 Deployment

### Frontend (Vercel)
- Set Root Directory → `frontend`
- Add Environment Variables
- Deploy

### Backend (Render)
- Set Root Directory → `backend`
- Add Environment Variables
- Deploy

---

# 👨‍💻 Author

**Saptarshi Paul**  
Full Stack Developer | AI Enthusiast  
📍 Kolkata, India  

GitHub: https://github.com/Sapta-Dev27  

---

# 📜 License

MIT License
